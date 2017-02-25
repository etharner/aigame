CALL compile_i.bat
SET sp="spawner-bin\win32\sp.exe"
SET java="C:\Program Files\Java\jdk1.8.0_112\bin\java.exe"
SET engine="interactor\bin"
SET chrome="C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
SET visualizator="file:///C:/dev/aigame/tictactoe/index.html"

::%java% -cp %engine% com.theaigames.tictactoe.Tictactoe
%sp% --out=std --separator=// -hr=1 --out=nul -wl=30 -tl=1 -ml=256 -y=1^
 --// --in=*1.stdout --out=*1.stdin %java% -cp %engine% com.theaigames.tictactoe.Tictactoe ^
 --// %java% bot.BotStarter

move out.txt ..\tictactoe
%chrome% %visualizator% --allow-file-access-from-files
