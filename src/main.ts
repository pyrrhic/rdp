import {app, BrowserWindow, desktopCapturer, ipcMain, session} from "electron";
import * as path from "node:path";
import {fileURLToPath} from "url";

app.whenReady().then(() => {
    ipcMain.handle("getSources", getSources);
    ipcMain.handle("setSource", setSource);

    createWindow();

    // mac behavior
    // app.on('activate', () => {
    //     if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

function createWindow() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const indexFile = path.join(__dirname, "./index.html");
    window.loadFile(indexFile);
    window.maximize();
}

async function getSources() {
     // "window",
    return await desktopCapturer.getSources({types: ["screen"]});
}

async function setSource(event: Electron.IpcMainInvokeEvent, id: string) {
    session.defaultSession.setDisplayMediaRequestHandler(async (request, callback) => {
        const sources = await desktopCapturer.getSources({ types: ['screen'] });
        const source = sources.find(s => s.id === id);

        callback({ video: source, audio: 'loopback' });
    })
}
