cd /d %~dp0
cd ../card-app

set folder="dist"
cd /d %folder%
for /F "delims=" %%i in ('dir /b') do (rmdir "%%i" /s/q || del "%%i" /s/q)

grunt run-preprod-dist
pause