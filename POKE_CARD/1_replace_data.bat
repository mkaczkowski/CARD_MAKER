cd /d %~dp0
RMDIR /S /Q ..\camera-app\app\data
mkdir ..\camera-app\app\data\
xcopy /y /S stuff\data ..\camera-app\app\data\
pause