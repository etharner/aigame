SET sp="spawner-bin\win32\sp.exe"
SET java="C:\Program Files\Java\jdk1.8.0_111\bin\java.exe"
SET engine="controller\bin"

%sp% --json -sr=report.json -hr=1 -wl=30 -y=1 --separator=//^
 --// --controller --out=std %java% -cp %engine% com.theaigames.tictactoe.Tictactoe 2^
 --// --in=*1.stdout --out=*1.stdin %java% bot.BotStarter^
 --// --in=*1.stdout --out=*1.stdin %java% bot.BotStarter
