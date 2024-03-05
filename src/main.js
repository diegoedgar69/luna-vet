const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
require('./core/database');
const modelsUser = require("./models/entities")

const menus = [
  {
    label: "Archivo",
    submenu: [
      {
        label: "agregar producto",
        click() {
          crearventanaAgregarProducto()
        }
      }
    ]
  }
]

function crearventanaAgregarProducto(){
  console.log("sdfsddsdsfsd")
}

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, './images/icon.jpg'),
    width: 1200,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();
  let menu_principal = Menu.buildFromTemplate(menus)
  mainWindow.setMenu(menu_principal)
};

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


ipcMain.on("new-user", async (e, args) => {
  const newUser = new modelsUser(args);
  const usereSaved = await newUser.save();
  e.reply("new-user-created", JSON.stringify(usereSaved))
})

ipcMain.on("get-users", async (e, args) => {
  const searched = await modelsUser.find();
  e.reply("get-users", JSON.stringify(searched))
})