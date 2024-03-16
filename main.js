const {app, BrowserWindow, ipcMain} = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const path = require("node:path")

let win;
function createWindow() {
    win = new BrowserWindow({
        webPreferences:{
            preload:path.join(__dirname, "preload.js")
        }
    })
    win.loadFile('index.html')
}

app.on('ready',()=>{
    console.log('The app is ready!');
    createWindow();
})

ipcMain.handle("video:path",(_, path)=>{
    console.log("path",path)
    ffmpeg.ffprobe(path, function(_, metadata) {
        win.webContents.send("video:duration", metadata.format.duration);
    });
})