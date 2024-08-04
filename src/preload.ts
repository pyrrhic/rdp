const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('mainApi', {
    getSources: () => ipcRenderer.invoke("getSources"),
    setSource: (id : string) => ipcRenderer.invoke("setSource", id)
})