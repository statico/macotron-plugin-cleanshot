macotron.plugin({
  title: "CleanShot X",
  description: "Run CleanShot X capture, recording, and history commands from the launcher.",
});

const APP = "pl.maketheweb.cleanshotx";
const PATH = "/Applications/CleanShot X.app";

// CleanShot's own URL scheme, one row per command. Commands that need a
// filepath (pin, open-annotate, add-quick-access-overlay) are left out: the
// launcher has nowhere to pick one. A trailing number delays the command by
// that many seconds; CleanShot's own self-timer only times an area.
const COMMANDS = [
  ["capture-area", "Capture Area", "select a region", "crop"],
  ["capture-area?action=copy", "Copy Area to Clipboard", "select a region, copy it", "doc.on.clipboard"],
  ["capture-fullscreen", "Capture Fullscreen", "whole screen", "macwindow"],
  ["capture-fullscreen", "Capture Fullscreen After Delay", "whole screen in 5 seconds", "timer", 5],
  ["capture-window", "Capture Window", "pick a window", "macwindow.on.rectangle"],
  ["capture-previous-area", "Capture Previous Area", "same region as last time", "arrow.counterclockwise"],
  ["scrolling-capture", "Scrolling Capture", "capture a long page", "arrow.down.doc"],
  ["capture-text", "Capture Text", "OCR a region", "text.viewfinder"],
  ["self-timer", "Self Timer", "delayed capture", "timer"],
  ["record-screen", "Record Screen", "video or GIF", "record.circle"],
  ["all-in-one", "All In One", "capture, record, or scroll", "square.on.square"],
  ["open-from-clipboard", "Open From Clipboard", "annotate the clipboard image", "pencil.tip.crop.circle"],
  ["open-history", "Open History", "recent captures", "clock.arrow.circlepath"],
  ["restore-recently-closed", "Restore Recently Closed", "bring back the last capture", "arrow.uturn.backward"],
  ["toggle-desktop-icons", "Toggle Desktop Icons", "hide or show them", "eye.slash"],
  ["open-settings", "CleanShot Settings", "CleanShot X preferences", "gearshape"],
];

// url.open reports whether Launch Services took the URL, which is the only
// signal that CleanShot is there and its API is switched on.
function run(command, title) {
  if (!macotron.url.open("cleanshot://" + command)) {
    macotron.notify.toast("CleanShot X", "Could not run " + title, { color: "error" });
  }
}

macotron.launcher.set(
  "cleanshot",
  COMMANDS.map(([command, title, subtitle, sfSymbol, delay]) => ({
    id: delay ? command + "@" + delay : command,
    title,
    subtitle,
    app: APP,
    sfSymbol,
    kind: "CleanShot",
    onClick: delay
      ? () => {
          macotron.notify.toast("CleanShot X", title.replace(" After Delay", "") + " in " + delay + " seconds");
          setTimeout(() => run(command, title), delay * 1000);
        }
      : () => run(command, title),
  }))
);

macotron.checks([{
  title: "CleanShot X",
  ok: macotron.fs.exists(PATH),
  message: macotron.fs.exists(PATH)
    ? COMMANDS.length + " commands"
    : "CleanShot X.app not found at " + PATH,
}]);
