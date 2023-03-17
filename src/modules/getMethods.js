import involvementApi from './apiKeys.json';

const getLikes = async () => {
  const response = await fetch(`${involvementApi.url + involvementApi.key}/likes`);
  const data = await response.json();
  return data;
};

export default getLikes;