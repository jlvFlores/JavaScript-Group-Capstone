import involvementApi from './apiKeys.json';

const fetchComments = async (pokemonId) => {
  const response = await fetch(`${involvementApi.url + involvementApi.key}/comments?item_id=${pokemonId}`);
  const data = await response.json();
  return data;
};

export default fetchComments;
