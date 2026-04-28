param(
    [int]$Port = 8000
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir '..')
Set-Location $projectRoot

Write-Host "Serving site from: $projectRoot"
Write-Host "Listening on http://localhost:$Port"
Write-Host "Press Ctrl+C to stop."

# Prefer Python 3, then Python, then py launcher.
if (Get-Command python3 -ErrorAction SilentlyContinue) {
    python3 -m http.server $Port
} elseif (Get-Command python -ErrorAction SilentlyContinue) {
    python -m http.server $Port
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    py -3 -m http.server $Port
} else {
    Write-Error "Python is not installed or not available in PATH. Install Python 3 or use another server method."
}
