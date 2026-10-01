param(
  [int]$Port = 3150,
  [string]$Script = "final-audit.cjs"
)

$ErrorActionPreference = "Stop"
$root = "W:\EKTA"
$server = $null

try {
  $server = Start-Process -FilePath "cmd.exe" `
    -ArgumentList "/c", "npx next start -p $Port" `
    -WorkingDirectory $root `
    -WindowStyle Hidden -PassThru

  $up = $false
  for ($i = 0; $i -lt 60; $i++) {
    Start-Sleep -Milliseconds 500
    try {
      $r = Invoke-WebRequest -Uri "http://localhost:$Port/" -UseBasicParsing -TimeoutSec 3
      if ($r.StatusCode -eq 200) { $up = $true; break }
    } catch { }
  }
  if (-not $up) { throw "server did not come up on port $Port" }

  $env:URL = "http://localhost:$Port/"
  node "$root\$Script"
  Write-Output "NODE_EXIT=$LASTEXITCODE"
}
finally {
  if ($server) {
    try { Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue } catch { }
  }
  Get-CimInstance Win32_Process -Filter "Name='node.exe'" -ErrorAction SilentlyContinue |
    Where-Object { $_.CommandLine -match "next start -p $Port" } |
    ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
}
