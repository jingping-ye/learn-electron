const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld("videoAPI",{
    "videoPath": (path)=>ipcRenderer.invoke("video:path", path),
    "onVideoDuration":(callback) =>ipcRenderer.on("video:duration", (_, value) => callback(value))
});