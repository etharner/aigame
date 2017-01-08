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

package com.theaigames.game;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.sun.javafx.geom.Vec2d;
import com.theaigames.engine.Engine;
import com.theaigames.engine.Logic;
import com.theaigames.engine.io.IOPlayer;
import com.theaigames.tictactoe.Processor;
import com.theaigames.tictactoe.field.Field;
import com.theaigames.tictactoe.moves.Move;

/**
 * abstract class AbstractGame
 *
 * DO NOT EDIT THIS FILE
 *
 * Extend this class with your main method. In the main method, create an
 * instance of your Logic and run setupEngine() and runEngine()
 *
 * @author Jim van Eeden <jim@starapple.nl>
 */

public abstract class AbstractGame implements Logic {

	public Engine engine;
	public Processor processor;

	public int maxRounds;

	public boolean DEV_MODE = false; // turn this on for local testing
	public String TEST_BOT; // command for the test bot in DEV_MODE
	public int NUM_TEST_BOTS; // number of bots for this game

	public AbstractGame() {
		maxRounds = -1; // set this later if there is a maximum amount of rounds for this game
	}

	/**
	 * Partially sets up the engine
	 * @param args : command line arguments passed on running of application
	 * @throws IOException
	 * @throws RuntimeException
	 */
	public void setupEngine(String args[]) throws IOException, RuntimeException {

        // create engine
    this.engine = new Engine();

    List<String> botIds = new ArrayList<>();

		if (args.length <= 0) {
			throw new RuntimeException("No arguments provided.");
		}

		int botsCount = Integer.parseInt(args[0]);

		for (int i=1; i <= botsCount; i++) {
	  	botIds.add(i + "");
	  }

    // check is the starting arguments are passed correctly
    if (botIds.isEmpty())
        throw new RuntimeException("Missing some arguments.");

		// add the players
		for(int i=0; i < botIds.size(); i++) {
			this.engine.addPlayer(botIds.get(i));
		}
		this.engine.runIO();
	}

	/**
	 * Implement this class. Set logic in the engine and start it to run the game
	 */
	protected abstract void runEngine() throws Exception;

	/**
	 * @return : True when the game is over
	 */
	@Override
	public boolean isGameOver()
	{
		return this.processor.isGameOver()
				|| (this.maxRounds >= 0 && this.processor.getRoundNumber() > this.maxRounds);
	}

	/**
	 * Play one round of the game
	 * @param roundNumber : round number
	 */
	@Override
    public void playRound(int roundNumber)
	{
		for(IOPlayer ioPlayer : this.engine.getPlayers())
			ioPlayer.addToDump(String.format("Round %d", roundNumber));

		this.processor.playRound(roundNumber);
	}

	/**
	 * close the bot processes, save, exit program
	 */
	@Override
	public void finish() throws Exception
	{
		// stop the bots
		this.engine.getPlayers().forEach(IOPlayer::finish);
		Thread.sleep(100);

		if (DEV_MODE) { // print the game file when in DEV_MODE
			String playedGame = this.processor.getPlayedGame();
			System.out.println(playedGame);
		} else { // save the game to database
			try {
				this.saveGame();
			} catch(Exception e) {
				e.printStackTrace();
			}
		}

		System.out.println("`");
		//System.out.println("Done.");

        System.exit(0);
	}

	/**
	 * Does everything that is needed to store the output of a game
	 */
	public void saveGame() {
		// save results to file here

        String playedGame = this.processor.getPlayedGame();

		System.out.println("winner: " + this.processor.getWinner().getName());
		System.out.println(playedGame);
	}
}
