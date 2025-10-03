# Update File References to WebP
# This script updates all references to converted images in HTML, CSS, and JS files

param(
    [switch]$DryRun
)

Write-Host "=== Updating File References to WebP ===" -ForegroundColor Cyan

# Define file types to update
$fileTypes = @("*.html", "*.css", "*.js")
$updatedFiles = @()
$totalReplacements = 0

if ($DryRun) {
    Write-Host "DRY RUN MODE - No files will be modified" -ForegroundColor Magenta
}

# Get all WebP files that were created
$webpFiles = Get-ChildItem -Path "assets" -Include "*.webp" -Recurse
Write-Host "Found $($webpFiles.Count) WebP files to reference" -ForegroundColor Yellow

foreach ($fileType in $fileTypes) {
    $sourceFiles = Get-ChildItem -Path "." -Include $fileType -Recurse -Exclude "node_modules", ".git"
    
    foreach ($sourceFile in $sourceFiles) {
        Write-Host "Checking: $($sourceFile.Name)" -ForegroundColor White
        $content = Get-Content $sourceFile.FullName -Raw
        $originalContent = $content
        $fileReplacements = 0
        
        # Replace PNG, JPG, JPEG extensions with WebP for files that exist
        foreach ($webpFile in $webpFiles) {
            # Get the original filename (without .webp extension)
            $webpBaseName = $webpFile.BaseName
            $webpPath = $webpFile.FullName.Replace((Get-Location).Path + "\", "").Replace("\", "/")
            
            # Create patterns to match the original file references
            $patterns = @(
                # Direct file references
                "$webpBaseName\.png",
                "$webpBaseName\.jpg", 
                "$webpBaseName\.jpeg"
            )
            
            foreach ($pattern in $patterns) {
                $matches = [regex]::Matches($content, $pattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
                if ($matches.Count -gt 0) {
                    $newPath = $webpPath
                    if (!$DryRun) {
                        $content = $content -replace $pattern, "$webpBaseName.webp"
                    }
                    $fileReplacements += $matches.Count
                    Write-Host "  → Would replace $($matches.Count) occurrence(s) of $pattern with $webpBaseName.webp" -ForegroundColor Cyan
                }
            }
        }
        
        # Save the file if changes were made
        if ($fileReplacements -gt 0) {
            if (!$DryRun -and $content -ne $originalContent) {
                Set-Content $sourceFile.FullName -Value $content -NoNewline
                Write-Host "  ✓ Updated $fileReplacements reference(s) in $($sourceFile.Name)" -ForegroundColor Green
            } elseif ($DryRun) {
                Write-Host "  ✓ Would update $fileReplacements reference(s) in $($sourceFile.Name)" -ForegroundColor Green
            }
            $updatedFiles += $sourceFile.Name
            $totalReplacements += $fileReplacements
        }
    }
}

# Summary
Write-Host ""
Write-Host "=== Update Summary ===" -ForegroundColor Cyan
Write-Host "Files that need updates: $($updatedFiles.Count)" -ForegroundColor White
Write-Host "Total replacements: $totalReplacements" -ForegroundColor Yellow

if ($updatedFiles.Count -gt 0) {
    Write-Host ""
    Write-Host "Files updated:" -ForegroundColor Cyan
    $updatedFiles | Sort-Object -Unique | ForEach-Object {
        Write-Host "  - $_" -ForegroundColor Gray
    }
}

if ($DryRun) {
    Write-Host ""
    Write-Host "To perform actual updates, run without -DryRun parameter" -ForegroundColor Magenta
} elseif ($totalReplacements -gt 0) {
    Write-Host ""
    Write-Host "All file references updated successfully!" -ForegroundColor Green
    Write-Host "Remember to test your website to ensure all images load correctly" -ForegroundColor Yellow
}