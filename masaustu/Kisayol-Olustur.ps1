# TKGM Baslatici - Masaustu ve Baslat menusu kisayolu olusturur.
# Kisayol, Microsoft Edge'i adres cubugu olmayan "uygulama penceresi" modunda acar.
$ErrorActionPreference = 'Stop'

$klasor = Split-Path -Parent $MyInvocation.MyCommand.Path
$html   = Join-Path $klasor 'TKGM-Baslatici.html'
$ikon   = Join-Path $klasor 'simge.ico'

if (-not (Test-Path $html)) { Write-Host "TKGM-Baslatici.html bulunamadi: $html"; exit 1 }

# Edge'in yerini bul
$edge = $null
try { $edge = (Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe' -ErrorAction Stop).'(default)' } catch {}
if (-not $edge -or -not (Test-Path $edge)) {
    $edge = @(
        "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
        "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
        "$env:LOCALAPPDATA\Microsoft\Edge\Application\msedge.exe"
    ) | Where-Object { Test-Path $_ } | Select-Object -First 1
}
if (-not $edge) { Write-Host 'Microsoft Edge bulunamadi.'; exit 1 }

$url = ([System.Uri]$html).AbsoluteUri
$ws  = New-Object -ComObject WScript.Shell

foreach ($hedef in @([Environment]::GetFolderPath('Desktop'), [Environment]::GetFolderPath('Programs'))) {
    $lnk = Join-Path $hedef 'TKGM Baslatici.lnk'
    $k = $ws.CreateShortcut($lnk)
    $k.TargetPath       = $edge
    $k.Arguments        = "--app=`"$url`" --window-size=1000,680"
    $k.WorkingDirectory = $klasor
    $k.IconLocation     = "$ikon,0"
    $k.Description      = 'TKGM sistemlerine hizli erisim'
    $k.Save()
    Write-Host "Kisayol olusturuldu: $lnk"
}
