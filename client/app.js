import './service-worker-manager';
import './style/style.scss';
import codeURL from './image/test.png';

const root = document.querySelector('#root');
const img = document.createElement('img');

root.innerHTML = '<p>Absolute Client!</p>';
img.src = codeURL;
root.appendChild(img);
