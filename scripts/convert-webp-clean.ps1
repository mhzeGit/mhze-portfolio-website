# Simple WebP Conversion Script
param(
    [int]$Quality = 85,
    [switch]$KeepOriginals
)

Write-Host "=== WebP Image Conversion Script ===" -ForegroundColor Cyan
Write-Host "Converting PNG, JPG, JPEG images to WebP (excluding GIFs)..." -ForegroundColor Green

# Get all image files (excluding GIFs)
$imageFiles = Get-ChildItem -Path "assets" -Include "*.png","*.jpg","*.jpeg" -Recurse
$totalFiles = $imageFiles.Count
$convertedCount = 0
$skippedCount = 0
$errorCount = 0

Write-Host "Found $totalFiles image(s) to process" -ForegroundColor Yellow

foreach ($file in $imageFiles) {
    $currentFile = $convertedCount + $skippedCount + $errorCount + 1
    Write-Host "[$currentFile/$totalFiles] Processing: $($file.Name)" -ForegroundColor White
    
    # Generate WebP filename
    $webpPath = $file.FullName -replace '\.(png|jpg|jpeg)$', '.webp'
    
    # Skip if WebP already exists
    if (Test-Path $webpPath) {
        Write-Host "  WebP already exists, skipping" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    try {
        # Build cwebp command
        $cwebpArgs = @("-q", $Quality, "-m", "6", "-mt")
        
        # Add alpha quality for PNG files
        if ($file.Extension.ToLower() -eq ".png") {
            $cwebpArgs += "-alpha_q", "95"
        }
        
        # Add input and output files
        $cwebpArgs += $file.FullName, "-o", $webpPath
        
        # Execute conversion
        Write-Host "  Converting with cwebp (Quality: $Quality)..." -ForegroundColor Cyan
        $result = & cwebp @cwebpArgs 2>&1
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $webpPath)) {
            # Calculate size savings
            $originalSize = (Get-Item $file.FullName).Length
            $newSize = (Get-Item $webpPath).Length
            $savings = [math]::Round((1 - $newSize/$originalSize) * 100, 1)
            
            Write-Host "  Successfully converted! Size reduction: $savings%" -ForegroundColor Green
            
            # Show file sizes
            $originalSizeKB = [math]::Round($originalSize / 1KB, 1)
            $newSizeKB = [math]::Round($newSize / 1KB, 1)
            Write-Host "    Original: $originalSizeKB KB -> WebP: $newSizeKB KB" -ForegroundColor Gray
            
            $convertedCount++
            
            # Remove original file if not keeping originals
            if (!$KeepOriginals) {
                Remove-Item $file.FullName -Force
                Write-Host "    Removed original file" -ForegroundColor Gray
            }
        } else {
            Write-Host "  Error converting file: $result" -ForegroundColor Red
            $errorCount++
        }
    }
    catch {
        Write-Host "  Exception: $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

# Summary
Write-Host ""
Write-Host "=== Conversion Summary ===" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Successfully converted: $convertedCount" -ForegroundColor Green
Write-Host "Skipped (already exist): $skippedCount" -ForegroundColor Yellow
Write-Host "Errors: $errorCount" -ForegroundColor Red

if ($convertedCount -gt 0) {
    Write-Host ""
    Write-Host "Conversion completed successfully!" -ForegroundColor Green
    Write-Host "Remember to update file references in your code if needed" -ForegroundColor Yellow
}