cd /d %~dp0
keytool -genkey -v -keystore selfie_card.keystore -alias selfie_card -keyalg RSA -keysize 2048 -validity 10000