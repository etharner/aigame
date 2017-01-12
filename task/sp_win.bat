SET sp="spawner-bin\win32\sp.exe"
SET java="C:\Program Files\Java\jdk1.8.0_111\bin\java.exe"
SET engine="controller\bin"

%sp% --out=std --separator=//^
 --// --controller  %java% -cp %engine% com.theaigames.tictactoe.Tictactoe 2^
 --// --in=*0.stdout --out=*0.stdin %java% bot.BotStarter^
 --// --in=*0.stdout --out=*0.stdin %java% bot.BotStarter
