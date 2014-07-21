cd /d %~dp0
cd ../camera-app

set folder="dist"
cd /d %folder%
for /F "delims=" %%i in ('dir /b') do (rmdir "%%i" /s/q || del "%%i" /s/q)

grunt run-prod-dist
pause