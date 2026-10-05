# CleanShot X for Macotron

Run [CleanShot X](https://cleanshot.com) capture, recording, and history
commands from the [Macotron](https://github.com/statico/macotron) launcher.

Fourteen commands, all through CleanShot's own URL scheme:

| Command | What it does |
|---|---|
| Capture Area | Select a region |
| Copy Area to Clipboard | Select a region and copy it |
| Capture Fullscreen | The whole screen |
| Capture Fullscreen After Delay | The whole screen, in 5 seconds |
| Capture Window | Pick a window |
| Capture Previous Area | The same region as last time |
| Scrolling Capture | Capture a long page |
| Capture Text | Read the text in a region |
| Self Timer | Delayed capture |
| Record Screen | Video or GIF |
| All In One | Capture, record, or scroll |
| Open From Clipboard | Annotate the image in the clipboard |
| Open History | Recent captures |
| Restore Recently Closed | Bring back the last capture |
| Toggle Desktop Icons | Hide or show them |
| CleanShot Settings | CleanShot X preferences |

Commands that need a file path are left out. The launcher has nowhere to pick
one.

## Install

1. Open Macotron. Go to Settings → Plugins → Catalog → Community.
2. Find **Cleanshot**. Press **Add**.
3. Read the source in the review sheet. Press **Add** again.

Macotron scans the plugin before it runs.

## Requirements

- CleanShot X at `/Applications/CleanShot X.app`
- The CleanShot URL scheme, under CleanShot X → Settings → Advanced

The plugin adds a Macotron health check. The check fails when CleanShot X is
not in `/Applications`.

## No permissions

This plugin opens `cleanshot://` URLs. It reads no files, it sends nothing to
the network, and it asks for no permissions.

## License

MIT
