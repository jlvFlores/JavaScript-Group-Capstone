const getList = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?';
  const response = await fetch(url + new URLSearchParams({
    limit: 9,
  }));
  const data = await response.json();
  return data.results;
};

export default getList;
