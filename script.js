const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";
let offset = 0; // Variable para controlar la paginación
const limite = 30; // Número máximo de Pokémon a mostrar
const botonAtras = document.getElementById("atras");
const botonDelante = document.getElementById("delante");

// Manejar el evento del botón "Atrás"
botonAtras.addEventListener("click", () => {
    if (offset >= limite) {
      offset -= limite;
      fetchAllPokemon();
    }
  });
  
  // Manejar el evento del botón "Delante"
  botonDelante.addEventListener("click", () => {
    offset += limite;
    fetchAllPokemon();
  });



// Función para cargar y mostrar Pokémon
function fetchAllPokemon() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => {
        listaPokemon.innerHTML = ''; // Limpia la lista actual
        data.results.forEach((pokemon) => {
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonData) => {
              mostrarPokemon(pokemonData);
            });
        });
      })
      .catch((error) => {
        console.error('Hubo un error al obtener los datos:', error);
      });
  }

// for (let i = 1; i <= 151; i++) {
//     fetch(URL + i)
//         .then((response) => response.json())
//         .then(data => mostrarPokemon(data))
// }


function mostrarPokemon(poke) {

   // console.log(poke.types);
    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('..');

    //Completar el id con 001
    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        pokeId = "0" + pokeId;
    }


    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-back">#${pokeId}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stat">${poke.height}m</p>
                <p class="stat">${poke.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);

}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    //console.log(botonId);
    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        //console.log(URL+i);
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo===botonId)) {
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))


fetchAllPokemon();