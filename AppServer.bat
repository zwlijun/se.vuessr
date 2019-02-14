@ECHO OFF

@TITLE SE.VUESS - AppServer

if /i "%1" equ "prod" (
	@CALL AppServer.Prod.bat
) else (
	@CALL AppServer.Dev.bat
)

@EXIT