const getList = async (perPage) => {
  const url = 'https://pokeapi.co/api/v2/pokemon?';
  const response = await fetch(url + new URLSearchParams({
    limit: perPage,
  }));
  const data = await response.json();
  return data.results;
};

export default getList;
