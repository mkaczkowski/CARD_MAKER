cd /d %~dp0
keytool -genkey -v -keystore poke_car.keystore -alias poke_car -keyalg RSA -keysize 2048 -validity 10000