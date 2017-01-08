./spawner-bin/linux-amd64/sp --separator=// \
--// /usr/bin/javac -d ultimatetictactoe-engine/bin $(find ultimatetictactoe-engine -name "*.java") \
--// -sr=report.txt /usr/bin/java -cp ultimatetictactoe-engine/bin com.theaigames.tictactoe.Tictactoe '/usr/bin/java bot/BotStarter' '/usr/bin/java bot/BotStarter' 2>err.txt 1>out.txt
