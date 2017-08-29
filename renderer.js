const marked = require('marked');
const { remote, ipcRenderer } = require('electron');
const mainProcess = remote.require('./main');

const markdownView       = document.getElementById('html');
const htmlView           = document.getElementById('view');
const newFileButton      = document.getElementById('new-file');
const openFileButton     = document.getElementById('open-file');
const saveMarkdownButton = document.getElementById('save-file');
const revertButton = document.getElementById('revert');
const saveHtmlButton = document.getElementById('save-html');


const renderMarkdowToHtml = (markdown) => {
  htmlView.innerHTML = marked(markdown, {sanitize: true});
}

markdownView.addEventListener('keyup', (event) => {
  renderMarkdowToHtml(event.target.value);
});

openFileButton.addEventListener('click', ()=> {
  mainProcess.getFileFromUserSelection();
})

ipcRenderer.on('file-opened', (event, file, content) => {
  markdownView.value = content;
  renderMarkdowToHtml(content);
})