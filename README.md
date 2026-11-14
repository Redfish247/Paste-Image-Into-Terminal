# Paste Image Into Terminal

A Claude Code plugin. Press **Ctrl+V** with a screenshot on the clipboard and the image's file path is typed into your prompt, so you no longer have to drag a file in. Text pastes are left alone.

**Windows only.** Needs a recent Claude Code with plugin support (tested on 2.1.325).

## Install

In Claude Code, type:

```
/plugin install paste-image --marketplace Redfish247/Paste-Image-Into-Terminal
```

Answer `y` to add the marketplace, pick a scope (user scope makes it work in every project), then run `/reload-plugins`.

From a shell instead:

```
claude plugin install paste-image --marketplace Redfish247/Paste-Image-Into-Terminal
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `Redfish247/Paste-Image-Into-Terminal`, then **Add plugin**.

## Use

1. Take a screenshot with **Win+Shift+S**.
2. Click the Claude Code prompt box.
3. Press **Ctrl+V**. The path to the saved image is typed in at your cursor.

Images are saved to your `Pictures\TerminalPastes` folder (OneDrive's Pictures folder if you use OneDrive backup). PNGs older than 7 days are deleted automatically.

## Update and uninstall

```
claude plugin update paste-image
claude plugin uninstall paste-image
```

## Troubleshooting

- **Ctrl+V does nothing:** a Claude Code plugin only sees keys that reach Claude Code. Some terminals swallow Ctrl+V when the clipboard holds only an image, so the plugin never gets the key. Claude Code's built-in image paste, **Alt+V** on Windows, works around it.
- **Ctrl+V pastes text instead:** the clipboard holds text as well as the image (for example when copying from a web page). Take a fresh screenshot with Win+Shift+S.
- **Not loaded:** run `claude plugin list` to check it is installed and enabled, then `/reload-plugins`.

## How it works

The plugin hooks Claude Code's `prompt.edit` event. On Ctrl+V it runs a short PowerShell snippet that saves the clipboard image as a PNG and prints its path; if the clipboard has no image, the key is passed through untouched. The code is one file: `hooks/register.ts`.

## License

MIT
