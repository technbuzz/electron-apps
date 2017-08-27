const { shell, remote } = require('electron');
const systemPreferences = remote.systemPreferences;

console.log(remote);
console.log(systemPreferences);


const newLink = document.getElementById('new-url');
const submit  = document.getElementById('submit-btn');
const newLinkForm  = document.getElementById('form');
const linkTemplate = document.getElementById('link-template');
const linkSection = document.querySelector('.links');



linkSection.addEventListener('click', (event) => {
  if(event.target.href){
    event.preventDefault();
    shell.openExternal(event.target.href);
  }
})

newLink.addEventListener('keyup', () => {
  submit.disabled = !newLink.validity.valid;
});

const parser = new DOMParser();
const parseResponse = (text) => parser.parseFromString(text, 'text/html');
const findTitle = (nodes) => { 
  console.log(parseResponse);
  debugger;
  return nodes.querySelector('title').textContent;
}

const addToPage = ({ title, url }) => {
  const newLink = linkTemplate.content.cloneNode(true);
  const titleElement = newLink.querySelector('.link--title');
  const urlElement = newLink.querySelector('.link--url');

  debugger;
  titleElement.textContent = title;
  urlElement.href = url;
  urlElement.textContent = url;

  linkSection.appendChild(newLink);
  return { title, url };
}

newLinkForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const url = newLink.value;

  
  fetch(url)
    .then(resp => resp.text())
    .then(parseResponse)
    .then(findTitle)
    .then(title => ({title: title, url: url}))
    .then(addToPage)
    .then(title => console.log(title))
    .catch(err => console.log(err))
  
  
})

window.addEventListener('load', () => {
  if(systemPreferences.getAccentColor() === '7609098f'){
    document.querySelector('link').href = 'style-dark.css';
  }
})


