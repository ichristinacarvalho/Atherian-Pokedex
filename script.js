"use strict";

let urlApi = "https://pokeapi.co/api/v2/pokemon?limit=20";

//Cores
const coresDosTipos = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC'
};

//consumindo a API
function carregarPokemons() {
    
    fetch(urlApi)
        .then(resposta => resposta.json())
        .then(dados => {
            // Atualizamos a variável com o link da próxima página
            urlApi = dados.next;

            // Fazemos o laço de repetição para os 20 Pokémon daquela página
            dados.results.forEach(pokemon => {
                fetch(pokemon.url)
                    .then(resposta => resposta.json())
                    .then(dadosPokemon => {
                        let pokedex = document.getElementById("pokedex");
                        let pokedexHTML = `
                        <div class="col-12 col-sm-6 col-md-3 mb-4">
                            <div class="card h-100">
                                <img src="${dadosPokemon.sprites.other['official-artwork'].front_default}" alt="${dadosPokemon.name}" class="card-img-top p-3">
                                <div class="card-body text-center">
                                    <h5 class="card-title text-capitalize">${dadosPokemon.name}</h5>
<span class="badge text-capitalize" style="background-color: ${coresDosTipos[dadosPokemon.types[0].type.name]};">${dadosPokemon.types[0].type.name}</span>                                </div>
                            </div>
                        </div>
                        `;
                        pokedex.innerHTML += pokedexHTML;
                    });
            });
        })
        .catch(erro => console.error("Erro ao buscar os dados!", erro)); 

}

// 3. Chamamos a função uma vez para a página não carregar vazia
carregarPokemons();

// 4. Conectamos o botão para carregar as próximas páginas ao ser clicado
document.getElementById("btn-carregar").addEventListener("click", carregarPokemons);