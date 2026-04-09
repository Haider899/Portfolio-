$filePath = "d:\My USB\Portfolio-\src\App.jsx"
$content = Get-Content -Path $filePath -Raw -Encoding UTF8
$content = $content -replace 'text-text-main', 'text-white'
$content = $content -replace 'text-text-muted', 'text-slate-300'
$content | Set-Content -Path $filePath -Encoding UTF8 -NoNewline
Write-Host "✓ Replaced legacy tokens"
