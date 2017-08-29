var { app, BrowserWindow, dialog } = require("electron");
const fs = require('fs');

let mainWindow = null

app.on('ready',() => {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    minWidth: 500,
    show: false
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  })

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  // require('devtron').install();
});

const getFileFromUserSelection = exports.getFileFromUserSelection = () => {
  const files = dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      {name: 'Text Files', extensions: ['txt', 'text']},
      {name: 'Markdown Files', extensions: ['md', 'markdown']}
    ]
  });

  if(!files) return;
  const file = files[0];
  const content = fs.readFileSync(file).toString();

  mainWindow.webContents.send('file-opened', file, content);

  console.log(content);
}