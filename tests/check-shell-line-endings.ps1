$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$badFiles = foreach ($file in Get-ChildItem -LiteralPath $root -Recurse -Filter '*.sh' -File) {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    if ($bytes -contains 13) {
        $file.FullName.Substring($root.Length + 1)
    }
}

if ($badFiles) {
    throw "Shell scripts must use LF line endings. CR bytes found in: $($badFiles -join ', ')"
}

Write-Output 'PASS: all shell scripts use LF line endings.'
