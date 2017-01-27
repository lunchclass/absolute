:; # Bootstrap code for Mac/Linux
:; cd $(dirname $0) && ./scripts/run $@; exit $?

:; # Bootstrap code for Windows
@ECHO OFF
cd %~dp0 && third_party\win-bash\bash scripts\run %*
