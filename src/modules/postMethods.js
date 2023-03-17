import involvementApi from './apiKeys.json';

const postLike = async (id) => {
  await fetch(`${involvementApi.url + involvementApi.key}/likes`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
    }),
  });
};

export default postLike;