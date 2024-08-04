"use strict";
var _a = require("electron"), contextBridge = _a.contextBridge, ipcRenderer = _a.ipcRenderer;
contextBridge.exposeInMainWorld('mainApi', {
    getSources: function () { return ipcRenderer.invoke("getSources"); },
    setSource: function (id) { return ipcRenderer.invoke("setSource", id); }
});
//# sourceMappingURL=preload.js.map