@ECHO off

SET past=%1
SET future=%2
SET dp0=%~dp0

IF "%future%" == "" (
    node %dp0% %past%
) ELSE (
    node %dp0% %past% %future%
)