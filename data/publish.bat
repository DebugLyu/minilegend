@SET EXCEL_FOLDER=.
@SET JSON_FOLDER=.\output\
@SET EXE=.\tools\excel2json.exe

@ECHO Converting excel files in folder %EXCEL_FOLDER% ...
for /f "delims=" %%i in ('dir /b /a-d /s %EXCEL_FOLDER%\*.xlsx') do (
    @echo   processing %%~nxi 
    @CALL %EXE% --excel %EXCEL_FOLDER%\%%~nxi --json %JSON_FOLDER%\%%~ni.json --header 3
)