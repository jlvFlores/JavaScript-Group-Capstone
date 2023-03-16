import involvementApi from './apiKeys.json';

const addComment = async (pokemonId, name, comment) => {
  const data = {
    item_id: pokemonId,
    username: name,
    comment,
  };
  return fetch(`${involvementApi.url + involvementApi.key}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export default addComment;