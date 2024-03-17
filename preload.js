const {contextBridge, ipcRenderer} = require("electron")

contextBridge.exposeInMainWorld("itemAPI", {
    "addItem": (item) => ipcRenderer.invoke("item:add",item),
    "onNewItem": (callback) => ipcRenderer.on("item:add", (_,value)=>callback(value))
})