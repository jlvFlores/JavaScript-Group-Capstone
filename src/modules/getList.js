const getList = async (offset, limit) => {
  const url = 'https://pokeapi.co/api/v2/pokemon?';
  const response = await fetch(url + new URLSearchParams({
    offset,
    limit,
  }));
  const data = await response.json();
  return data.results;
};

export default getList;
