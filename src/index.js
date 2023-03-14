import './style.css';
import Logo from './assets/images/pokemon-logo.svg';

const displayLogo = () => {
  const element = document.getElementById('logo');
  const myLogo = new Image();
  myLogo.src = Logo;
  myLogo.alt = 'Pokemon';
  myLogo.classList.add('logo');
  element.appendChild(myLogo);
};

displayLogo();
