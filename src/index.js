import './output.css';
import Logo from './assets/images/pokemon-logo.svg';
import Background from './assets/images/background-img.png';
import getList from './modules/getList.js';
import getInfo from './modules/getInfo.js';

const displayLogo = () => {
  const element = document.getElementById('logo');
  const myLogo = new Image();
  myLogo.src = Logo;
  myLogo.alt = 'Pokemon';
  myLogo.classList.add('logo');
  element.appendChild(myLogo);
  document.body.style.backgroundImage = `url('${Background}')`;
  document.body.style.backgroundSize = '100vw';
};

displayLogo();

const createList = async () => {
  let globalArray = [];
  globalArray = await getList();
  await getInfo(globalArray);
};

createList();