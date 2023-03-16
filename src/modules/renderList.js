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
  const commentsCache = {};
  array.forEach((pokemon) => {
    let itemLikes = 0;
    const itemId = likes.find(({ item_id }) => item_id === pokemon.id);
    if (itemId) {
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
      <div id="staticModal${pokemon.id}" data-modal-backdrop="static" tabindex="${pokemon.id}" aria-hidden="true" class="fixed popup-window inset-0 z-50 hidden">
        <div class="bg-yellow-200/90 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mx-4 w-full sm:w-5/6 md:w-1/2 lg:w-2/5 lg:mt-2.5 max-h-screen h-[93vh]">
          <div class="flex justify-end py-2 px-4">
            <button type="button" class="close-btn" data-modal-hide="staticModal${pokemon.id}">
              <img class="w-5 h-5 relative right-[-8px]" src="${xMark}" alt="closebutton">
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 overflow-y-auto">
            <div class="flex flex-col justify-center items-center">
              <p class="text-2xl font-bold text-yellow-800 fixed top-[40px] md:top-[55px]">${pokemon.name}</p>
              <img class="w-full max-w-[250px] mx-auto relative top-[-20px]" src="${pokemon.imageUrl}" alt="${pokemon.name}">
              <form id="comment-form" class="mt-4 relative top-[160px] md:top-[-55px] right-[-90px] md:right-[-15px]">
                <div class="mb-1">
                  <input type="text" id="comment-name" name="name" class="form-input" placeholder="Your Name" required>
                </div>
                <div class="mb-4">
                  <textarea id="comment-text" name="text" class="form-textarea" placeholder="Your insights" required></textarea>
                </div>
                <div class="flex justify-end relative right-[22px] md:right-[43px] top-[-16px]">
                  <button type="submit" class="btn btn-primary">Comment</button>
                </div>
              </form>
            </div>
            <div class="space-y-4 relative top-[-215px] md:top-[10px]">
              <div class="space-y-2">
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
              <div class="mt-6">
                <p class="text-lg font-bold text-yellow-800 mb-2">Evolution Chain:</p>
                <div class="flex flex-wrap">
                  ${pokemon.evolutionChain.map((evolutionName) => `
                    <span class="text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded ${pokemon.name === evolutionName ? 'bg-blue-500 text-blue-100' : 'bg-blue-200 text-blue-500'}">${evolutionName}</span>
                        `).join('')}
                </div>
              </div>
              <div class="space-y-2">
                <p class="font-bold text-yellow-800">Comments</p>
                <div class="flex flex-row">
                    <ul class="list-disc pl-4" id="comment-list"></ul>
                    <div class="pl-4 relative top-[-33px] right-[65px]" id="comments${pokemon.id}"></div>
                </div>
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
    const renderComments = (comments) => {
      commentList.innerHTML = '';
      if (!Array.isArray(comments) || comments.length === 0) {
        commentList.innerHTML = '<li>No comments yet.</li>';
      } else {
        comments.forEach((comment) => {
          const commentElement = document.createElement('li');
          commentElement.classList.add('comments-counter');
          commentElement.innerHTML = `
              <span class="font-bold text-yellow-800">${comment.creation_date} ${comment.username}:</span> ${comment.comment}
              `;
          commentList.appendChild(commentElement);
        });
      }
    };
    const updateCommentsCount = (pokemonId) => {
      countComments(pokemonId).then((count) => {
        commentsCountElement.innerHTML = `(${count})`;
      });
    };
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
        if (!commentsCache[pokemon.id]) {
          fetchComments(pokemon.id).then((data) => {
            renderComments(data);
            updateCommentsCount(pokemon.id);
            commentsCache[pokemon.id] = data;
          });
        }
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