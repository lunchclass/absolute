import './style/style.scss';
import codeURL from './image/test.png';
import './service-worker-registration.js';

const root = document.querySelector('#root');
const img = document.createElement('img');

root.innerHTML = '<p>Absolute Client!</p>';
img.src = codeURL;
root.appendChild(img);
