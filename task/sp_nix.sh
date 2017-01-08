./spawner-bin/linux-amd64/sp --separator=// -hr=1 --out=nul \
--// --controller /usr/bin/java -cp controller/bin com.theaigames.tictactoe.Tictactoe 2 \
--// --in=*1.stdout --out=*1.stdin /usr/bin/java bot.BotStarter \
--// --in=*1.stdout --out=*1.stdin /usr/bin/java bot.BotStarter
