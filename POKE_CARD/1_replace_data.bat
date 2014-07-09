cd /d %~dp0
RMDIR /S /Q ..\card-app\app\data
mkdir ..\card-app\app\data\
xcopy /y /S stuff\data ..\card-app\app\data\
pause