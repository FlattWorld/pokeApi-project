

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
    
    .then((data) => createPokemon(data)
  
    );
  
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
  number.textContent = `${ pokemon.name.toString()+" " + "#"+pokemon.id.toString().padStart(3, 0) }`
  number.id = "num"




  div1.appendChild(imgp)
  div1.appendChild(number)
  div1.appendChild(btn)
  
  btn.onclick = function ()
 {

    const overlay =document.createElement("div")
    overlay.classList.add("overlay")


    const divt = document.createElement("div")
    overlay.appendChild(divt)
    divt.id = "targeta"
    root.appendChild(overlay)

    const header = document.createElement("header")
    header.id="heads"




    const number = document.createElement("h1")
    number.textContent = `${pokemon.name +" "+"#"+ pokemon.id.toString    ().padStart(3, 0) }`
    number.id = "numTarget"

    targeta.appendChild(header)
    header.appendChild(number)

    const  divT =document.createElement("div")
    divT.id="Total"
    divt.appendChild(divT)

    const divI =document.createElement("div")
    divI.id="izquierda"
    divT.appendChild(divI)
    

    const caracter = document.createElement("p")
    caracter.textContent= "caracteristicas"
    caracter.id="caracter"
  
    const peso = document.createElement("p")
    peso.textContent= `${"Peso:  "+pokemon.weight+"      "+"Altura:"+pokemon.height}`
    peso.id="peso"


    const movi =document.createElement("h1")
    movi.textContent= "Movimientos"
    movi.id="movi"

    const tipo =document.createElement("p")
    tipo.textContent = "Tipos"
    tipo.id= "tipo"
   

    divI.appendChild(caracter)
    divI.appendChild(peso)
    divI.appendChild(movi)
    divI.appendChild(tipo)

    const divD =document.createElement("div")
    divD.id="Derecha"
    divT.appendChild(divD)

    const imgp = document.createElement("img")
    imgp.src = pokemon.sprites.front_default
    imgp.id = "imgPoke"

    const imgpb = document.createElement("img")
    imgpb.src = pokemon.sprites.back_default
    imgpb.id = "imgPokeb"

    divD.appendChild(imgp)
    divD.appendChild(imgpb)
    



    

   


   //const movimie = document.createElement("p")
    //const map1 = pokemon.moves.map[1,3]((el)=>el.move)
    //movimie.textContent =  `${map1}`
    //movimie.id="movis" 

    

    
   
    //targeta.appendChild(movimie)
    
    
    
    const cbtn = document.createElement('button')
    cbtn.innerText = 'x'
    cbtn.id = "cbtn"
   
    cbtn.onclick = function () 
    {
      document.querySelector("#root").removeChild(overlay)

    }
         header.appendChild(cbtn)



  }
  



}
fetchPokemons(1);







