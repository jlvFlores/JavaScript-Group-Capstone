import renderList from './renderList.js';

const getInfo = async (array) => {
  let counter = 0;
  array.forEach(async (pokemon) => {
    const infoUrl = await fetch(pokemon.url);
    const info = await infoUrl.json();
    const speciesUrl = await fetch(info.species.url);
    const species = await speciesUrl.json();
    const evoChainUrl = await fetch(species.evolution_chain.url);
    const evoChain = await evoChainUrl.json();
    const abilities = [];
    const types = [];
    for (let i = 0; i < info.abilities.length; i += 1) {
      abilities.push(info.abilities[i].ability.name);
    }
    for (let i = 0; i < info.types.length; i += 1) {
      types.push(info.types[i].type.name);
    }
    pokemon.abilities = abilities;
    pokemon.types = types;
    pokemon.id = info.id;
    pokemon.height = info.height;
    pokemon.weight = info.weight;
    pokemon.imageUrl = info.sprites.front_default;
    pokemon.evolutionChain = [
      evoChain.chain.species.name,
      evoChain.chain.evolves_to[0].species.name,
      evoChain.chain.evolves_to[0].evolves_to[0].species.name,
    ];
    counter += 1;
    if (counter === array.length) {
      renderList(array);
    }
  });
};

export default getInfo;