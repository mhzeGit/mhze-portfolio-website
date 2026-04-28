@echo off
setlocal
pushd "%~dp0\.."

if exist ".venv\Scripts\python.exe" (
    set "PYTHON_EXE=.venv\Scripts\python.exe"
) else if exist "%SystemRoot%\py.exe" (
    set "PYTHON_EXE=%SystemRoot%\py.exe"
) else if exist "%ProgramFiles%\Python39\python.exe" (
    set "PYTHON_EXE=%ProgramFiles%\Python39\python.exe"
) else if exist "%ProgramFiles%\Python310\python.exe" (
    set "PYTHON_EXE=%ProgramFiles%\Python310\python.exe"
) else (
    set "PYTHON_EXE=python"
)

echo Serving site from: %CD%
echo Starting HTTP server on http://localhost:8000

"%PYTHON_EXE%" -m http.server 8000

popd
endlocal
