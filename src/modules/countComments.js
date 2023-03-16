import fetchComments from './comments.js';

const countComments = (pokemonId) => fetchComments(pokemonId).then((data) => data.length);

export default countComments;