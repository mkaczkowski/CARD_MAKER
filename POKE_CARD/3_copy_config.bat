cd /d %~dp0
xcopy /y stuff\config.xml android
xcopy /y stuff\config.xml ..\card-app\dist
xcopy /y stuff\config.js ..\card-app\config\
pause
 