# Remove Original Image Files After WebP Conversion
# This script safely removes original PNG, JPG, JPEG files after verifying WebP versions exist

param(
    [switch]$DryRun,
    [switch]$Force
)

Write-Host "=== Cleaning Up Original Image Files ===" -ForegroundColor Cyan
Write-Host "Removing original PNG, JPG, JPEG files (WebP versions available)..." -ForegroundColor Green

# Get all original image files
$originalFiles = Get-ChildItem -Path "assets" -Include "*.png","*.jpg","*.jpeg" -Recurse
$totalFiles = $originalFiles.Count
$removedCount = 0
$skippedCount = 0
$missingWebP = 0

Write-Host "Found $totalFiles original image file(s) to process" -ForegroundColor Yellow

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be deleted" -ForegroundColor Magenta
}

foreach ($file in $originalFiles) {
    $currentFile = $removedCount + $skippedCount + $missingWebP + 1
    Write-Host "[$currentFile/$totalFiles] Checking: $($file.Name)" -ForegroundColor White
    
    # Generate WebP equivalent path
    $webpPath = $file.FullName -replace '\.(png|jpg|jpeg)$', '.webp'
    
    # Check if WebP version exists
    if (Test-Path $webpPath) {
        $originalSize = (Get-Item $file.FullName).Length
        $webpSize = (Get-Item $webpPath).Length
        $savings = [math]::Round((1 - $webpSize/$originalSize) * 100, 1)
        
        Write-Host "  WebP exists ($savings% smaller) - " -ForegroundColor Green -NoNewline
        
        if ($DryRun) {
            Write-Host "Would remove original" -ForegroundColor Cyan
            $removedCount++
        } else {
            try {
                Remove-Item $file.FullName -Force
                Write-Host "Removed original" -ForegroundColor Green
                $removedCount++
            } catch {
                Write-Host "Failed to remove: $($_.Exception.Message)" -ForegroundColor Red
                $skippedCount++
            }
        }
    } else {
        Write-Host "  WebP version missing: $(Split-Path $webpPath -Leaf)" -ForegroundColor Yellow
        if ($Force) {
            Write-Host "    Force mode: Removing anyway" -ForegroundColor Red
            if (!$DryRun) {
                Remove-Item $file.FullName -Force
                $removedCount++
            }
        } else {
            Write-Host "    Keeping original file (use -Force to remove anyway)" -ForegroundColor Yellow
            $skippedCount++
        }
        $missingWebP++
    }
}

# Summary
Write-Host ""
Write-Host "=== Cleanup Summary ===" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Successfully removed: $removedCount" -ForegroundColor Green
Write-Host "Skipped (no WebP): $skippedCount" -ForegroundColor Yellow
Write-Host "Missing WebP files: $missingWebP" -ForegroundColor Red

if (!$DryRun -and $removedCount -gt 0) {
    Write-Host ""
    Write-Host "Cleanup completed successfully!" -ForegroundColor Green
    Write-Host "Your website now uses only optimized WebP images" -ForegroundColor Yellow
}

if ($DryRun) {
    Write-Host ""
    Write-Host "To perform actual cleanup, run without -DryRun parameter" -ForegroundColor Magenta
}

if ($missingWebP -gt 0 -and !$Force) {
    Write-Host ""
    Write-Host "Some files don't have WebP equivalents" -ForegroundColor Yellow
    Write-Host "Use -Force flag to remove them anyway (not recommended)" -ForegroundColor Yellow
}