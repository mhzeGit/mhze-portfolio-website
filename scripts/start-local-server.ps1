# Check if Python is installed
if (-not (Get-Command python -ErrorAction SilentlyContinue)) {
    Write-Host "Python is not installed. Please install Python to use this script." -ForegroundColor Red
    exit
}

# Set the default port
$port = 8000

# Use the custom Python HTTP server script with detailed output
$webRoot = "$PSScriptRoot\.."

Write-Host "Starting custom local server in directory: $webRoot" -ForegroundColor Green
Write-Host "Running custom HTTP server script..." -ForegroundColor Yellow
python "$PSScriptRoot\custom_http_server.py"

# Open the server in the default browser
Start-Process "http://localhost:$port"