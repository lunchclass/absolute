@ECHO OFF

:: TODO: Should implement this file.

reg Query "HKLM\Hardware\Description\System\CentralProcessor\0" | find /i "x86" > NUL && set OS=32BIT || set OS=64BIT

if %OS%==32BIT set PLATFORM_BASE=.\platform\node-v7.3.0-win-x86\
if %OS%==64BIT set PLATFORM_BASE=.\platform\node-v7.3.0-win-x64\

:: Package install
call %PLATFORM_BASE%npm install .\server\ --prefix .\server\
:: Run node server
call %PLATFORM_BASE%npm start --prefix .\server\
