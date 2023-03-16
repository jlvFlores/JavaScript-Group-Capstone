/* eslint-disable camelcase */

import * as flowbite from 'flowbite';
import heartReg from '../assets/icons/heart-regular.svg';
import xMark from '../assets/icons/xmark-solid.svg';
import postLike from './postMethods.js';
import getLikes from './getMethods.js';
import cardCounter from './cardCounter.js';

const renderList = async (array) => {
  const listContainer = document.getElementById('list');
  const likes = await getLikes();

  array.forEach((pokemon) => {
    let itemId = 0;
    let itemLikes = 0;
    if (likes.find(({ item_id }) => item_id === pokemon.id)) {
      itemId = likes.find(({ item_id }) => item_id === pokemon.id);
      itemLikes = itemId.likes;
    }
    listContainer.insertAdjacentHTML('beforeend', `
        <div class="card">
          <div class="details">
            <img class="sprite" src="${pokemon.imageUrl}" alt="${pokemon.name}">
            <div class="name">
              <p>${pokemon.name}</p>
              <div class="like-con">
                <img class="like-btn" src="${heartReg}" alt="heart" data-id="${pokemon.id}">
                <p class="likes">${itemLikes}</p>
              </div>
            </div>
            <button data-modal-target="staticModal${pokemon.id}" data-modal-show="staticModal${pokemon.id}" class="comment-btn block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Comments
            </button>
          </div>
        </div>
        <div id="staticModal${pokemon.id}" data-modal-backdrop="static" tabindex="${pokemon.id}" aria-hidden="true" class="dark container popup-window fixed z-50 hidden p-4 overflow-x-hidden overflow-y-auto mt-[-100px]">
          <div class="grid grid-cols-5 grid-rows-6 w-[75vw] h-[160vw] bg-yellow-200/90 rounded-lg">
            <div class="col-start-5 row-start-1 place-self-center self-center">
            <button type="button" class="close-btn" data-modal-hide="staticModal${pokemon.id}">
              <img class="w-5 h-5" src="${xMark}" alt="closebutton">
              <span class=""></span>
            </button>
            </div>
            <div class="col-start-1 row-start-1 col-span-5 row-span-2 justify-self-center self-center">
                <img class="min-w-[40vw]" src="${pokemon.imageUrl}" alt="${pokemon.name}">
            </div>
            <div class="col-start-1 row-start-3 col-span-5 justify-self-center self-start">
              <p class="font-black text-2xl leading-4">${pokemon.name}</p>
            </div> 
            <div class="col-start-1 row-start-3 col-span-2 self-end justify-self-start ml-6">
              <p class="font-black text-base">Pokedex ID</p>
              <p class="font-bold text-sm text-center">#00${pokemon.id}</p>
            </div>
            <div class="col-start-3 row-start-3 self-end justify-self-center">
              <p class="font-black text-base">Weight</p>
              <p class="font-bold text-sm text-center">${pokemon.weight}</p>
            </div>
            <div class="col-start-4 row-start-3 col-span-2 self-end justify-self-center">
              <p class="font-black text-base">Height</p>
              <p class="font-bold text-sm text-center">${pokemon.height}</p>
            </div>
            <div class="col-start-1 row-start-4 col-span-2 self-center justify-self-start ml-6">
              <p class="font-black text-base">Type(s):</p>
              <p class="font-bold text-sm text-center">${pokemon.types}</p>
            </div>
            <div class="col-start-3 row-start-4 col-span-3 self-center justify-self-start">
              <p class="font-black text-base">Abilities:</p>
              <p class="font-bold text-sm text-center">${pokemon.abilities}</p>
            </div>
            <div class="col-start-1 row-start-5 col-span-4 self-start justify-self-start ml-6">
              <p class="font-black text-base">Evolution Chain:</p>
              <p class="font-bold text-sm text-center">${pokemon.evolutionChain}</p>
            </div>
          </div>
        </div>
      `);
  });
  const options = {
    placement: 'center',
    backdrop: 'static',
  };
  const popupWindow = document.querySelectorAll('.popup-window');
  const commentBtn = document.querySelectorAll('.comment-btn');
  const closeBtn = document.querySelectorAll('.close-btn');
  const likeBtn = document.querySelectorAll('.like-btn');
  for (let i = 0; i < commentBtn.length; i += 1) {
    const modal = new flowbite.Modal(popupWindow[i], options);
    commentBtn[i].addEventListener('click', () => {
      modal.show();
      for (let i = 0; i < commentBtn.length; i += 1) {
        closeBtn[i].addEventListener('click', () => {
          modal.hide();
        });
      }
    });
  }

  likeBtn.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = +btn.dataset.id;
      const likeCounter = btn.nextElementSibling;

      await postLike(id);
      const updatedLikes = await getLikes();

      const item = updatedLikes.find(({ item_id }) => item_id === id);
      likeCounter.innerHTML = await item.likes;
    });
  });

  document.querySelector('.pokemon-nav').innerHTML = `Pokemon(${cardCounter()})`;
};

export default renderList;