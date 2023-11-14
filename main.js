const pokemons = [];



    
       

               

      // Función para obtener los datos de los Pokémon      
        
            async function extractFinalPokemons() {
                for (let i = 1; i <= 151; i++) {
                    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    let arrayPokemon = await response.json();
                    pokemons.push(arrayPokemon);
                  }
            }      
    





const container$$ = document.querySelector('#container');



// Mapeo de colores para tipos de Pokémon

const typeColors = {
  grass :'#3ce13c' ,
  fire : '#e93a2b',
  water : '#1ac9df',
  bug : 'lightgreen',
  normal : 'lightgrey',
  electric : 'yellow',
  fighting : 'grey',
  rock : '#8f6b57',
  ground : '#95512b',
  flying : 'lightblue',
  ice : '#c1eef3',
  psychic : '#FFA07A',
  dragon : 'gold',
  poison : 'rgb(186 98 233)',
  fairy : '#e771c4',
}

  // Mapeo de imágenes de fondo para tipos de Pokémon
const typeBackgrounds = {
  grass: 'grass.gif',
  fire: 'fire.gif',
  water: 'water.gif',
  bug: 'bug.gif',
  normal: 'normal.gif',
  electric: 'electric.gif',
  fighting: 'fighting.gif',
  rock: 'rock.gif',
  ground: 'ground.gif',
  flying: 'flying.gif',
  ice: 'ice.gif',
  psychic: 'psychic.gif',
  dragon: 'dragon.gif',
  poison: 'poison.gif',
  fairy: 'fairy.gif',
  ghost: 'ghost.gif',
};


const links = document.querySelectorAll('#mainMenu a');
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
    const pageUrl = link.getAttribute('href');
    switchPage(pageUrl);
  });
});

function switchPage(pageUrl) {
  // Redirige a la página correspondiente
  window.location.href = pageUrl;
}

// Agrega un evento de entrada para el campo de búsqueda
const searchInput$$ = document.getElementById('searchInput');
searchInput$$.addEventListener('input', () => {
    const searchPokemon = searchInput$$.value.toLowerCase();
    filterPokemons(searchPokemon);
});

// Función para filtrar Pokémon mientras escribes
function filterPokemons(searchPokemon) {
  const pills$$ = document.querySelectorAll('.boxPoke');

  pills$$.forEach(pill => {
      const name = pill.querySelector('.namePokemon').textContent.toLowerCase();
      const id = pill.querySelector('.idPoke').textContent.toLowerCase();
      const typesDivs = pill.querySelector('.typesContainer').querySelectorAll('.typeDiv');
      let Match = false;

      typesDivs.forEach(typeDiv => {
          const typeName = typeDiv.querySelector('.type').textContent.toLowerCase();
          if (typeName === searchPokemon) {
               Match = true;
          }
      });

      if (name.includes(searchPokemon) || id.includes(searchPokemon) || Match) {
        pill.style.display = 'block';
    } else {
        pill.style.display = 'none';
    }
});
}





// Función para crear elementos HTML de Pokémon y aplicar colores según el tipo

async function createPokemonItems() {

  await extractFinalPokemons();

  const loading$$ = document.getElementById('loading');


   // Mostrar el contenido y ocultar el loader
   loading$$.style.display = 'none';
  

//pildora por pokemon

for (const pokemon of pokemons) {
  const pill$$ = document.createElement('div');
  pill$$.classList.add('boxPoke');
  container$$.appendChild(pill$$);

 //declaro esta variable para usarla luego más abajo y poder cambiar el fondo de la pildora solo con el primer tipo de cada pokemon
  let firstTypeName = null;

   // Agregar un div para las imágenes (imgContainer) y aplicar el fondo lightgrey

   const imgContainer$$ = document.createElement('div');
   imgContainer$$.classList.add('imgContainer');
   imgContainer$$.style.backgroundColor = 'lightgrey';
   pill$$.appendChild(imgContainer$$);

  // Agregar imagen del Pokémon

  const imgPkemon$$ = document.createElement('img');
  imgPkemon$$.classList.add('imgPokemon');
  imgPkemon$$.src = pokemon.sprites.other.dream_world.front_default;
  imgPkemon$$.alt = pokemon.name;
  imgContainer$$.appendChild(imgPkemon$$);


  // Agregar número(id) del Pokémon

  const p$$ = document.createElement('p');
  p$$.classList.add('idPoke');
  p$$.textContent = 'Nº ' + pokemon.id ;
  pill$$.appendChild(p$$);


  // Agregar nombre del Pokémon


  const h2$$ = document.createElement('h2');
  h2$$.classList.add('namePokemon');
  h2$$.textContent = pokemon.name;
  pill$$.appendChild(h2$$);


// Crear un contenedor para los tipos del Pokémon

  const typesContainer$$ = document.createElement('div');
    typesContainer$$.classList.add('typesContainer');
    pill$$.appendChild(typesContainer$$);


// Recorrer los tipos del Pokémon

    for (const type of pokemon.types) {

      const typeName = type.type.name;

      if (!firstTypeName) {
        // Si es el primer tipo, asigna el nombre
        firstTypeName = typeName;
            // Agregar la imagen de fondo según el tipo
            const background = typeBackgrounds[typeName] || 'default.jpg';
            pill$$.style.backgroundImage = `url(${background})`;
          }

// Crear un div para cada tipo

      const typeDiv$$ = document.createElement('div');
      typeDiv$$.classList.add('typeDiv');
      typesContainer$$.appendChild(typeDiv$$);

  // Agregar el nombre del tipo como un span

      const type$$ = document.createElement('span');
      type$$.classList.add('type');
      type$$.textContent = typeName;
      typeDiv$$.appendChild(type$$);

      //aplica un color a cada div que contiene un span con el tipo de pokemon segun el tipo//
      const backgroundColor = typeColors[type.type.name] || 'gray';
      typeDiv$$.style.backgroundColor = backgroundColor;
        }

}

}
createPokemonItems();

console.log(pokemons);


//-------------------------------*/



// Obtén el menú y todos los botones
const menu$$ = document.getElementById('menu');
const buttons$$ = menu$$.querySelectorAll('button');

// Agrega un evento clic a cada botón
buttons$$.forEach(button => {
    button.addEventListener('click', () => {
        const typeToFilter = button.getAttribute('data-type');
        
        // Remueve la clase 'active' de todos los botones
        buttons$$.forEach(b => b.classList.remove('active'));
        
        // Agrega la clase 'active' al botón seleccionado
        button.classList.add('active');

        // Filtra los Pokémon según el tipo seleccionado
        filterPokemonsByType(typeToFilter);
    });
});

// Función para filtrar Pokémon según el tipo
function filterPokemonsByType(type) {
    const pills$$ = document.querySelectorAll('.boxPoke');

    // Muestra todos los Pokémon si se selecciona 'Todos'
    if (type === 'all') {
        pills$$.forEach(pill => pill.style.display = 'block');
    } else {
        // Oculta los Pokémon que no coinciden con el tipo seleccionado
        pills$$.forEach(pill => {
            const typesDivs = pill.querySelector('.typesContainer').querySelectorAll('.typeDiv');
            let typeMatch = false;

            typesDivs.forEach(typeDiv => {
                const typeName = typeDiv.querySelector('.type').textContent;
                if (typeName === type) {
                    typeMatch = true;
                }
            });

            if (typeMatch) {
                pill.style.display = 'block';
            } else {
                pill.style.display = 'none';
            }
        });
    }
}

// Inicialmente, muestra todos los Pokémon
filterPokemonsByType();





































            /*async function extractPokemon (numero) {
                /*let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`);
                let pokemon = await response.json();
                return pokemon ;*/
                
            


/*for ( let i = 0 ; i <= 151 ; i++){
    [i].push(numero);


}*/


/*fetch('https://pokeapi.co/api/v2/pokemon/')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    pokemons.push(myJson.results);
  });

const pokemons = [];
console.log(pokemons);*/



/*const container$$ = document.querySelector('.container');
  
  for (pokemon of pokemons) {
    const pill$$ = document.createElement('div');
    pill$$.classList.add('.boxPoke');
    container$$.appendChild(pill$$);

    const h2$$ = document.createElement('h2');
    h2$$.textContent = pokemon.name;
    container$$.appendChild(h2$$);

  }*/