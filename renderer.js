const marked = require('marked');

const markdownView       = document.getElementById('#view');
const htmlView           = document.getElementById('#html');
const newFileButton      = document.getElementById('#new-file');
const openFileButton     = document.getElementById('#open-file');
const saveMarkdownButton = document.getElementById('#save-file');
const revertButton = document.getElementById('#revert');
const saveHtmlButton = document.getElementById('#save-html');