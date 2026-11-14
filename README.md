# Paste Image Into Terminal

A Claude Code plugin. Press **Ctrl+V** with a screenshot on the clipboard and the image's file path is typed into your prompt, so you no longer have to drag a file in. Text pastes are left alone.

**Windows 10/11 only.** Needs a recent Claude Code with plugin support (tested on 2.1.325) and [Git](https://git-scm.com/downloads).

## Install

Open PowerShell and run:

```
git clone https://github.com/Redfish247/Paste-Image-Into-Terminal "$env:USERPROFILE\.claude\skills\paste-image"
```

Then, in Claude Code, run `/reload-plugins` (or restart it). That's it. Claude Code loads and hot-reloads plugins from `~/.claude/skills`, so it also works in every other Claude Code window you open.

No Git? Download the repo as a zip from GitHub (Code, Download ZIP) and unzip it so that `%USERPROFILE%\.claude\skills\paste-image\.claude-plugin\plugin.json` exists. Then run `/reload-plugins`.

## Use

1. Take a screenshot with **Win+Shift+S**.
2. Click the Claude Code prompt box.
3. Press **Ctrl+V**. The path to the saved image is typed in at your cursor.

Images are saved to your `Pictures\TerminalPastes` folder (OneDrive's Pictures folder if you use OneDrive backup). PNGs older than 7 days are deleted automatically.

## Update

```
git -C "$env:USERPROFILE\.claude\skills\paste-image" pull
```

Then `/reload-plugins`.

## Uninstall

Delete the folder `%USERPROFILE%\.claude\skills\paste-image`, then run `/reload-plugins`.

## Troubleshooting

- **Ctrl+V does nothing:** a Claude Code plugin only sees keys that reach Claude Code. Some terminals swallow Ctrl+V when the clipboard holds only an image, so the plugin never gets the key. Claude Code's built-in image paste, **Alt+V** on Windows, works around it.
- **Ctrl+V pastes text instead:** the clipboard holds text as well as the image (for example when copying from a web page). Take a fresh screenshot with Win+Shift+S.
- **The plugin isn't loaded:** check that `%USERPROFILE%\.claude\skills\paste-image\.claude-plugin\plugin.json` exists, then run `/reload-plugins`.

## How it works

The plugin hooks Claude Code's `prompt.edit` event. On Ctrl+V it runs a short PowerShell snippet that saves the clipboard image as a PNG and prints its path; if the clipboard has no image, the key is passed through untouched. The code is one file: `hooks/register.ts`.

## License

MIT
