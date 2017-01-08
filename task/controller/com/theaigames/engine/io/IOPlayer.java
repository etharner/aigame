/*
 * Copyright 2016 riddles.io (developers@riddles.io)
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 *
 *     For the full copyright and license information, please view the LICENSE
 *     file that was distributed with this source code.
 */

package com.theaigames.engine.io;

import com.theaigames.engine.Engine;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * IOPlayer class
 *
 * Handles the communication between the bot process and the engine
 *
 * @author Jackie Xu <jackie@starapple.nl>, Jim van Eeden <jim@starapple.nl>
 */
public class IOPlayer implements Runnable {

    private String normalId;
    private StringBuilder dump;
    private int errorCounter;
    private boolean finished;
    private String idString;
    private Engine engine;

    private final int MAX_ERRORS = 2;
    private final String NULL_MOVE = "no_moves";

    public String response;

    public IOPlayer(String normalId, Engine engine) {
      this.normalId = normalId;
      this.idString = normalId;
      this.dump = new StringBuilder();
      this.errorCounter = 0;
      this.finished = false;
      this.engine = engine;
    }

    /**
   	 * Write a string to the bot
     * @param line : input string
     * @throws IOException
     */
    public void writeToBot(String line) throws IOException {
        if (!this.finished) {
            try {
        		this.engine.inputStream.write(line + "\n");
        		this.engine.inputStream.flush();
            } catch(IOException e) {
                System.err.println("Writing to bot failed");
            }
            addToDump(line);
        }
    }

    /**
     * Wait's until the this.response has a value and then returns that value
     * @param timeOut : time before timeout
     * @return : bot's response, returns and empty string when there is no response
     */
    public String getResponse(long timeOut) {
    	long timeStart = System.currentTimeMillis();
    	String enginesays = "Output from your bot: ";
    	String response;

    	if (this.errorCounter > this.MAX_ERRORS) {
    		addToDump(String.format("Maximum number (%d) of time-outs reached: skipping all moves.", this.MAX_ERRORS));
    		return "";
    	}

    	while(this.response == null) {
    		long timeNow = System.currentTimeMillis();
			long timeElapsed = timeNow - timeStart;

			if(timeElapsed >= timeOut) {
				addToDump(String.format("Response timed out (%dms), let your bot return '%s' instead of nothing or make it faster.", timeOut, this.NULL_MOVE));
				this.errorCounter++;
                if (this.errorCounter > this.MAX_ERRORS) {
                    finish();
                }
                addToDump(String.format("%snull", enginesays));
				return "";
			}

			try { Thread.sleep(2); } catch (InterruptedException e) {}
    	}
		if(this.response.equalsIgnoreCase("no_moves")) {
			this.response = null;
            addToDump(String.format("%s\"%s\"", enginesays, this.NULL_MOVE));
			return "";
		}

		response = this.response;
		this.response = null;

		addToDump(String.format("%s\"%s\"", enginesays, response));
		return response;
    }

    /**
     * Ends the bot process and it's communication
     */
    public void finish() {
        if(this.finished)
            return;

        // stop the bot's IO
    	//try { this.engine.inputStream.close(); } catch (IOException e) {}
    	this.engine.outputGobbler.finish();
    	this.engine.errorGobbler.finish();

      this.finished = true;
    }

    /**
     * @return : the bot process
     */
    public Process getProcess() {
        return this.process;
    }

    /**
     * @return : String representation of the bot ID as used in the database
     */
    public String getIdString() {
    	return this.idString;
    }

    /**
     * Adds a string to the bot dump
     * @param dumpy : string to add to the dump
     */
    public void addToDump(String dumpy){
		dump.append(dumpy + "\n");
	}

    /**
     * Add a warning to the bot's dump that the engine outputs
     * @param warning : the warning message
     */
    public void outputEngineWarning(String warning) {
    	dump.append(String.format("Engine warning: \"%s\"\n", warning));
    }

    /**
     * @return : the complete stdOut from the bot process
     */
    public String getStdout() {
    	return this.engine.outputGobbler.getData();
    }

    /**
     * @return : the complete stdErr from the bot process
     */
    public String getStderr() {
    	return this.engine.errorGobbler.getData();
    }

    /**
     * @return : the dump of all the IO
     */
    public String getDump() {
    	return dump.toString();
    }

    @Override
    /**
     * Start the communication with the bot
     */
    public void run() {}
}
