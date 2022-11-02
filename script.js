

const head = document.createElement("header");
head.id = "head"
head.innerHTML = "";
root.appendChild(head);
//se crea un header dentro del documento y dentro de un body
// con id head  

const img = document.createElement("img")
img.id = "img"
img.src = "./logo.png"
head.appendChild(img);
//se crea una imagen con id img que esta dentro de nuestro header 
//lo llamamos con su id heaad
// const div = document.createElement("div")
// div.id="root"
// document.body.appendChild(div)4



// const pokemonContainer = document.querySelector("#divp")


function fetchPokemon(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => createPokemon(data));
}
function fetchPokemons(number) {
  for (let i = 1; i <= number; i++)
    fetchPokemon(i)
}

function createPokemon(pokemon) {



  const div = document.createElement("div")
  div.id = "div1"
  root.appendChild(div)


  const div1 = document.createElement("div")
  div1.id = "divp"
  div.appendChild(div1)


  const btn = document.createElement("input")
  btn.type = "button"
  btn.value = "DETALLES"
  btn.id = "btn"




  const imgp = document.createElement("img")
  imgp.src = pokemon.sprites.front_default
  imgp.id = "imgp"

  div1.appendChild(imgp)

  const number = document.createElement("p")
  number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`
  number.id = "num"

  const name = document.createElement("p")
  name.id = "name"
  name.textContent = pokemon.name


  div1.appendChild(imgp)
  div1.appendChild(number)
  div1.appendChild(name)
  div1.appendChild(btn)
  // pokemonContainer.appendChild(div1)

  // const boton = document.querySelector('.btn')
  console.log(btn)
  btn.onclick = function () {

    console.log("click")
    const divt = document.createElement("div")
    divt.innerHTML = "descripcion"
    divt.id = "targeta"
    document.body.appendChild(divt)


  }



}
fetchPokemons(151);







