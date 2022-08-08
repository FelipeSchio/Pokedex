const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const buttonShiny = document.querySelector('.btn-shiny');

let searchPokemon = 1;
let shiny = 0;
let frente = '';

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    } else {

    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (shiny == 1) {
        frente = 'front_shiny';
        buttonShiny.innerHTML = 'Versão Normal'
    } else {
        frente = 'front_default';
        buttonShiny.innerHTML = 'Versão Shiny'
    }

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated'][`${frente}`];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'MissingNo.';
        pokemonNumber.innerHTML = '???';
        pokemonImage.src = 'images/Missingno.webp';
    }
}

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    if (searchPokemon < 905) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});

buttonShiny.addEventListener('click', () =>{
    if (shiny == 0) {
        shiny = 1;
    } else {
        shiny = 0
    }
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);