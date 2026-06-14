const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });

  win.loadFile("index.html");
  win.setTitle("Toy Story YTP Player");
}

ipcMain.handle("get-videos", async () => {
  const videoDir = app.isPackaged
    ? path.join(process.resourcesPath, "videos")
    : path.join(__dirname, "videos");

  const allowed = [
    ".mp4",
    ".mkv",
    ".webm",
    ".mov",
    ".avi"
  ];

  if (!fs.existsSync(videoDir)) {
    return [];
  }

  return fs.readdirSync(videoDir)
    .filter(file =>
      allowed.includes(path.extname(file).toLowerCase())
    );
});

ipcMain.handle("video-path", async (event, file) => {
  const videoDir = app.isPackaged
    ? path.join(process.resourcesPath, "videos")
    : path.join(__dirname, "videos");

  return `file://${path.join(videoDir, file)}`;
});

app.whenReady().then(createWindow);