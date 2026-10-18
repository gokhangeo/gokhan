// TKGM Uygulamalar — masaüstü programı.
// Arayüz, ../TKGM-Uygulamalar.html dosyasının aynısıdır; kartlar siteyi varsayılan tarayıcıda açar.
const { app, BrowserWindow, Menu, shell, nativeTheme } = require('electron');
const path = require('path');

if (!app.requestSingleInstanceLock()) {
    app.quit();
}

app.setAppUserModelId('com.gokhangeo.tkgmuygulamalar');

let pencere;

const disaridaAc = (url) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
};

function pencereOlustur() {
    pencere = new BrowserWindow({
        width: 1000,
        height: 680,
        minWidth: 560,
        minHeight: 420,
        title: 'TKGM Uygulamalar',
        icon: path.join(__dirname, 'simge.png'),
        backgroundColor: nativeTheme.shouldUseDarkColors ? '#0b1020' : '#eef2ff',
        show: false,
        webPreferences: { contextIsolation: true, sandbox: true },
    });

    // Karta tıklanınca (target=_blank veya window.open) site varsayılan tarayıcıda açılır
    pencere.webContents.setWindowOpenHandler(({ url }) => {
        disaridaAc(url);
        return { action: 'deny' };
    });
    pencere.webContents.on('will-navigate', (e, url) => {
        e.preventDefault();
        disaridaAc(url);
    });

    pencere.once('ready-to-show', () => pencere.show());
    pencere.loadFile(path.join(__dirname, 'TKGM-Uygulamalar.html'));
}

app.on('second-instance', () => {
    if (!pencere) return;
    if (pencere.isMinimized()) pencere.restore();
    pencere.focus();
});

Menu.setApplicationMenu(null);
app.whenReady().then(pencereOlustur);
app.on('window-all-closed', () => app.quit());
