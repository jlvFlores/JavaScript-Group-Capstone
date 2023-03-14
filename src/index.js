/* eslint-disable no-await-in-loop */

import './style.css';
import Logo from './assets/images/pokemon-logo.svg';
import heartReg from './assets/icons/heart-regular.svg';

let globalArray = [];
const listContainer = document.getElementById('list');

const displayLogo = () => {
  const element = document.getElementById('logo');
  const myLogo = new Image();
  myLogo.src = Logo;
  myLogo.alt = 'Pokemon';
  myLogo.classList.add('logo');
  element.appendChild(myLogo);
};

displayLogo();

const displayList = () => {
  globalArray.forEach((pokemon) => {
    listContainer.insertAdjacentHTML('beforeend', `
      <div class="card">
        <div class="details">
          <img class="sprite" src="${pokemon.imageUrl}" alt="${pokemon.name}">
          <div class="name">
            <p>${pokemon.name}</p>
            <img class="like-btn" src="${heartReg}" alt="heart">
          </div>
          <button class="comment-btn">Comments</button>
        </div>
      </div>
    `);
  });
};

const getInfo = async () => {
  for (let i = 0; i < globalArray.length; i += 1) {
    const infoUrl = await fetch(globalArray[i].url);
    const info = await infoUrl.json();

    const abilities = [];
    const types = [];

    for (let i = 0; i < info.abilities.length; i += 1) {
      abilities.push(
        { ability: info.abilities[i].ability.name, is_hidden: info.abilities[i].is_hidden },
      );
    }
    for (let i = 0; i < info.types.length; i += 1) {
      types.push(info.types[i].type.name);
    }

    globalArray[i].abilities = abilities;
    globalArray[i].types = types;
    globalArray[i].id = info.id;
    globalArray[i].height = info.height;
    globalArray[i].weight = info.weight;
    globalArray[i].imageUrl = info.sprites.front_default;

    const speciesUrl = await fetch(info.species.url);
    const species = await speciesUrl.json();

    const evoChainUrl = await fetch(species.evolution_chain.url);
    const evoChain = await evoChainUrl.json();

    globalArray[i].evolutionChain = [
      evoChain.chain.species.name,
      evoChain.chain.evolves_to[0].species.name,
      evoChain.chain.evolves_to[0].evolves_to[0].species.name,
    ];
  }

  displayList();
};

const getList = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?';
  const response = await fetch(url + new URLSearchParams({
    limit: 9,
  }));

  const data = await response.json();

  globalArray = data.results;

  getInfo();
};

getList();
