import type { Register } from 'claude-code'

// Saves the clipboard image (if any) to Pictures\TerminalPastes and prints its path.
// Prints nothing when the clipboard holds no image. Files older than 7 days are removed.
const SAVE_IMAGE = [
  'Add-Type -AssemblyName System.Windows.Forms,System.Drawing;',
  '$i=[Windows.Forms.Clipboard]::GetImage();',
  'if($i){',
  "$d=Join-Path ([Environment]::GetFolderPath('MyPictures')) 'TerminalPastes';",
  'New-Item -ItemType Directory -Force $d | Out-Null;',
  "$f=Join-Path $d ('paste-'+(Get-Date -Format 'yyMMdd-HHmmss-fff')+'.png');",
  '$i.Save($f,[Drawing.Imaging.ImageFormat]::Png);',
  "Get-ChildItem $d -Filter 'paste-*.png' | Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-7) } | Remove-Item -Force -ErrorAction SilentlyContinue;",
  '$f',
  '}',
].join(' ')

export const register: Register = on => {
  on('prompt.edit', async ($, e, next) => {
    const k = e.key
    const isCtrlV = k !== undefined && k.ctrl === true && k.key.toLowerCase() === 'v'
    if (!isCtrlV) return next(e)

    let path = ''
    try {
      const r = await $.process.run(
        ['powershell', '-NoProfile', '-STA', '-ExecutionPolicy', 'Bypass', '-Command', SAVE_IMAGE],
        { timeoutMs: 8000 },
      )
      path = r.stdout.trim()
    } catch {
      return next(e)
    }
    if (path === '') return next(e) // no image on the clipboard: leave Ctrl+V alone

    const typed = path.includes(' ') ? `"${path}"` : path
    const text = e.text.slice(0, e.cursor) + typed + e.text.slice(e.cursor)
    return { text, cursor: e.cursor + typed.length }
  })
}
