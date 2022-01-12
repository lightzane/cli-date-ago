@ECHO off

@REM SET past=%1
@REM SET future=%2
SET dp0=%~dp0

@REM IF "%future%" == "" (
@REM     node %dp0% %past%
@REM ) ELSE (
@REM     node %dp0% %past% %future%
@REM )
node %dp0% %*