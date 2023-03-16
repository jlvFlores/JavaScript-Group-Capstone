/* eslint-disable camelcase */

import * as flowbite from 'flowbite';
import heartReg from '../assets/icons/heart-regular.svg';
import xMark from '../assets/icons/xmark-solid.svg';
import postLike from './postMethods.js';
import getLikes from './getMethods.js';
import cardCounter from './cardCounter.js';
import fetchComments from './comments.js';
import countComments from './countComments.js';
import addComment from './addcoments.js';

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
      <div class="card bg-green-100 shadow-md rounded-lg overflow-hidden w-full md:max-w-sm">
        <div class="relative">
          <img class="w-full h-full object-cover" src="${pokemon.imageUrl}" alt="${pokemon.name}">
          <div class="absolute top-[325px] right-[115px] md:top-[400px] md:right-[170px] flex justify-end items-center">
            <div class="relative">
              <img class="like-btn cursor-pointer w-6 h-6" src="${heartReg}" alt="heart" data-id="${pokemon.id}">
              <div class="likes absolute top-0 right-0 rounded-full px-2 py-1 bg-yellow-200 text-yellow-800">${itemLikes}</div>
            </div>
          </div>
        </div>
        <div class="p-4">
          <div class="name text-blue-900">
            <p class="text-lg font-semibold">${pokemon.name}</p>
          </div>
          <div class="grid grid-cols-2 gap-2 mt-4">
            <div class="col-span-1">
              <p class="font-bold text-sm text-gray-600">Weight</p>
              <p class="font-bold text-base text-yellow-800">${pokemon.weight}</p>
            </div>
            <div class="col-span-1">
              <p class="font-bold text-sm text-gray-600">Height</p>
              <p class="font-bold text-base text-yellow-800">${pokemon.height}</p>
            </div>
            <div class="col-span-2">
              <p class="font-bold text-sm text-gray-600">Type(s)</p>
              <div class="flex flex-wrap">
                ${pokemon.types.map((type) => `
                  <div class="bg-yellow-200 text-yellow-800 font-bold rounded-full px-2 py-1 text-sm mr-2 mb-2">${type}</div>
                `).join('')}
              </div>
            </div>
            <div class="col-span-2">
              <button data-modal-target="staticModal${pokemon.id}" data-modal-show="staticModal${pokemon.id}" class="comment-btn block text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center">
                Comments
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="staticModal${pokemon.id}" data-modal-backdrop="static" tabindex="${pokemon.id}" aria-hidden="true" class="fixed popup-window inset-0 z-50 items-center justify-center hidden">
        <div class="bg-yellow-200/90 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mx-4 w-full sm:w-5/6 md:w-1/2 lg:w-2/5 xl:w-1/3 max-h-screen h-[93vh]">
          <div class="flex justify-end py-2 px-4">
            <button type="button" class="close-btn" data-modal-hide="staticModal${pokemon.id}">
              <img class="w-5 h-5 relative right-[-8px]" src="${xMark}" alt="closebutton">
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 overflow-y-auto">
            <div class="flex justify-center items-center">
              <img class="w-full max-w-[250px] mx-auto top-[-30px] relative" src="${pokemon.imageUrl}" alt="${pokemon.name}">
            </div>
            <div class="space-y-4 relative bottom-[80px]">
              <div class="space-y-2">
                <p class="text-2xl font-bold text-yellow-800 fixed left-[130px] top-[55px]">${pokemon.name}</p>
                <div class="flex items-center">
                  <p class="font-bold text-yellow-800 mr-2">Pokedex ID:</p>
                  <p class="font-medium">${pokemon.id}</p>
                </div>
              </div>
              <div class="space-y-2">
                <p class="font-bold text-yellow-800">Abilities:</p>
                <div class="flex flex-wrap">
                  ${pokemon.abilities.map((ability) => `
                    <span class="text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded bg-blue-500 text-blue-200">${ability}</span>
                  `).join('')}
                </div>
              </div>
              <div class="space-y-2">
                <p class="font-bold text-yellow-800">Evolution Chain:</p>
                <div class="flex flex-wrap">
                  ${pokemon.evolutionChain.map((evolutionName) => `
                    <span class="text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded bg-blue-500 text-blue-200">${evolutionName}</span>
                  `).join('')}
                </div>
              </div>
              <div class="space-y-2">
                <p class="font-bold text-yellow-800">Comments</p>
                <div id="comments${pokemon.id}"></div>
                <ul class="list-disc pl-4" id="comment-list">
                </ul>
                <form id="comment-form" class="mt-4">
                  <label for="comment-name" class="font-bold text-yellow-800">Name:</label>
                  <input type="text" id="comment-name" name="name" class="block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" required>
                  <label for="comment-text" class="font-bold text-yellow-800 mt-2">Comment:</label>
                  <textarea id="comment-text" name="text" class="block w-full border-gray-300 rounded-md shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50" required></textarea>
                  <button type="submit" class="mt-2 px-4 py-2 bg-yellow-500 border border-transparent rounded-md font-semibold text-white hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-200 focus:ring-opacity-50">Post Comment</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      `);
    const modalCard = document.getElementById(`staticModal${pokemon.id}`);
    const commentList = modalCard.querySelector('#comment-list');
    const commentForm = modalCard.querySelector('#comment-form');
    const commentsCountElement = document.getElementById(`comments${pokemon.id}`);
    function renderComments(comments) {
      commentList.innerHTML = '';
      if (comments.length === 0) {
        commentList.innerHTML = '<li>No comments yet.</li>';
      } else {
        comments.forEach((comment) => {
          const commentElement = document.createElement('li');
          commentElement.innerHTML = `
              <span class="font-bold text-yellow-800">${comment.username}:</span> ${comment.comment}
              `;
          commentList.appendChild(commentElement);
        });
      }
    }
    function updateCommentsCount(pokemonId) {
      countComments(pokemonId).then((count) => {
        commentsCountElement.innerHTML = `(${count})`;
      });
    }
    commentForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = commentForm.querySelector('#comment-name').value;
      const text = commentForm.querySelector('#comment-text').value;
      addComment(pokemon.id, name, text).then(() => {
        commentForm.reset();
        fetchComments(pokemon.id).then((data) => {
          renderComments(data);
          updateCommentsCount(pokemon.id);
        });
      });
    });
    const commentBtn = document.querySelectorAll('.comment-btn');
    for (let i = 0; i < commentBtn.length; i += 1) {
      commentBtn[i].addEventListener('click', () => {
        fetchComments(pokemon.id).then((data) => {
          renderComments(data);
          updateCommentsCount(pokemon.id);
        });
      });
    }
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