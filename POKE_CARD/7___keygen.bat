cd /d %~dp0
keytool -genkey -v -keystore stuff\poke_card.keystore -alias poke_card -keyalg RSA -keysize 2048 -validity 10000