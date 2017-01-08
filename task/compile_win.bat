cd controller
dir /s /B *.java > sources.txt
javac -d bin @sources.txt

cd ../bot
dir /s /B *.java > sources.txt
javac @sources.txt

cd ..