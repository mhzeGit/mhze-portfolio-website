# WebP Image Conversion Script
# Converts PNG, JPG, and JPEG files in the assets folder to optimized WebP format
# Note: GIF files are excluded from conversion

param(
    [int]$Quality = 85,
    [string]$Method = 6,
    [switch]$Lossless,
    [switch]$DryRun,
    [switch]$KeepOriginals
)

Write-Host "=== WebP Image Conversion Script ===" -ForegroundColor Cyan
Write-Host "Converting images in assets folder to WebP format..." -ForegroundColor Green

# Get all image files (excluding GIFs)
$imageFiles = Get-ChildItem -Path "assets" -Include "*.png","*.jpg","*.jpeg" -Recurse
$totalFiles = $imageFiles.Count
$convertedCount = 0
$skippedCount = 0
$errorCount = 0

Write-Host "Found $totalFiles image(s) to process" -ForegroundColor Yellow

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be converted" -ForegroundColor Magenta
}

foreach ($file in $imageFiles) {
    $currentFile = $convertedCount + $skippedCount + $errorCount + 1
    Write-Host "[$currentFile/$totalFiles] Processing: $($file.Name)" -ForegroundColor White
    
    # Generate WebP filename (only for PNG, JPG, JPEG)
    $webpPath = $file.FullName -replace '\.(png|jpg|jpeg)$', '.webp'
    
    # Skip if WebP already exists (unless we're in dry run mode)
    if ((Test-Path $webpPath) -and !$DryRun) {
        Write-Host "  → Already exists, skipping" -ForegroundColor Yellow
        $skippedCount++
        continue
    }
    
    if ($DryRun) {
        Write-Host "  → Would convert to: $(Split-Path $webpPath -Leaf)" -ForegroundColor Cyan
        $convertedCount++
        continue
    }
    
    try {
        # Build cwebp command based on file type and settings
        $cwebpArgs = @()
        
        # Quality and method settings
        if ($Lossless) {
            $cwebpArgs += "-lossless"
        } else {
            $cwebpArgs += "-q", $Quality
            $cwebpArgs += "-m", $Method
        }
        
        # Optimization settings
        $cwebpArgs += "-alpha_cleanup"  # Clean up alpha channel
        $cwebpArgs += "-mt"             # Use multi-threading
        
        # File type specific optimizations
        $extension = $file.Extension.ToLower()
        if ($extension -eq ".png") {
            if (!$Lossless) {
                $cwebpArgs += "-alpha_q", "95"  # High quality alpha for PNG
            }
        }
        
        # Add input and output files
        $cwebpArgs += $file.FullName
        $cwebpArgs += "-o", $webpPath
        
        # Execute conversion
        Write-Host "  → Converting with cwebp (Quality: $Quality, Method: $Method)..." -ForegroundColor Cyan
        $result = & cwebp @cwebpArgs 2>&1
        
        if ($LASTEXITCODE -eq 0 -and (Test-Path $webpPath)) {
            # Calculate size savings
            $originalSize = (Get-Item $file.FullName).Length
            $newSize = (Get-Item $webpPath).Length
            $savings = [math]::Round((1 - $newSize/$originalSize) * 100, 1)
            
            Write-Host "  ✓ Converted successfully! Size reduction: $savings%" -ForegroundColor Green
            
            # Show file sizes
            $originalSizeKB = [math]::Round($originalSize / 1KB, 1)
            $newSizeKB = [math]::Round($newSize / 1KB, 1)
            Write-Host "    Original: $originalSizeKB KB → WebP: $newSizeKB KB" -ForegroundColor Gray
            
            $convertedCount++
            
            # Remove original file if not keeping originals
            if (!$KeepOriginals) {
                Remove-Item $file.FullName -Force
                Write-Host "    Removed original file" -ForegroundColor Gray
            }
        } else {
            Write-Host "  ✗ Error converting file: $result" -ForegroundColor Red
            $errorCount++
        }
    }
    catch {
        Write-Host "  ✗ Exception: $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

# Summary
Write-Host "=== Conversion Summary ===" -ForegroundColor Cyan
Write-Host "Total files processed: $totalFiles" -ForegroundColor White
Write-Host "Successfully converted: $convertedCount" -ForegroundColor Green
Write-Host "Skipped (already exist): $skippedCount" -ForegroundColor Yellow
Write-Host "Errors: $errorCount" -ForegroundColor Red

if (!$DryRun -and $convertedCount -gt 0) {
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Update your HTML/CSS/JS files to reference .webp files instead of original formats" -ForegroundColor Yellow
    Write-Host "2. Test the website to ensure all images load correctly" -ForegroundColor Yellow
    Write-Host "3. Consider adding fallback support for browsers that don't support WebP" -ForegroundColor Yellow
}

if ($DryRun) {
    Write-Host "To perform actual conversion, run the script without -DryRun parameter" -ForegroundColor Magenta
}