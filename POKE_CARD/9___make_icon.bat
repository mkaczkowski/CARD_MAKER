cd /d %~dp0
cd android

RMDIR /S /Q platforms\android\res\drawable-land-hdpi
RMDIR /S /Q platforms\android\res\drawable-land-ldpi
RMDIR /S /Q platforms\android\res\drawable-land-mdpi
RMDIR /S /Q platforms\android\res\drawable-land-xdpi
RMDIR /S /Q platforms\android\res\drawable-land-xhdpi

RMDIR /S /Q platforms\android\res\drawable-port-hdpi
RMDIR /S /Q platforms\android\res\drawable-port-ldpi
RMDIR /S /Q platforms\android\res\drawable-port-mdpi
RMDIR /S /Q platforms\android\res\drawable-port-xdpi
RMDIR /S /Q platforms\android\res\drawable-port-xhdpi

cordova-gen-icon --icon "..\stuff\assets\icon.png"
cd ..
pause