const proyect = (node) => document.querySelector(node);
const creatEl = (node) => document.createElement(node);


//header y logo de la api 
const main = creatEl("main")
const root = proyect("#root");
const rectangulo = creatEl("rectangulo");
root.append(rectangulo, main);
main.appendChild(rectangulo);
rectangulo.classList.add("rectangulo");
const logo = creatEl("img");
root.append(logo);
logo.classList.add("logo");
logo.src = "assets/logopoke.png";
rectangulo.appendChild(logo)

//boton de buscar 
const buscador = creatEl("div");
main.appendChild(buscador);
buscador.classList.add("buscador");
const formulario = creatEl("form");
const input = creatEl("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Pokemon");
formulario.classList.add("form");
input.classList.add("input");
formulario.appendChild(input);
buscador.appendChild(formulario);





const closeModal = (e, parent) => {
  if (e.target !== e.currentTarget) return;
  parent.removeChild(e.target);
};

const close = (e) => {
  if (e.key === "Escape" && document.querySelector(".overlay")) main.removeChild(document.querySelector(".overlay"));
};

//ventana de pokemon



const openModal = (poke) => {
  const overlay =creatEl("div");
  overlay.addEventListener("click", () => close({key:"Escape"}, main))
  main.append(overlay);
  overlay.classList.add("overlay")
  const modal =creatEl("div")
  overlay.append(modal)
  modal.classList.add("modal")
  const h1 = creatEl("h1")
  h1.classList.add("h1");
  modal.appendChild(h1)
  h1.innerText = `${poke.name} #${poke.id}`
  
  const caractContainer = creatEl("div");
  modal.append(caractContainer);
  const caract = creatEl("p");
  caract.classList.add("caract");
  caract.innerText = "Caracteristicas";
  caractContainer.appendChild(caract);
  const caract1 = creatEl("span");
  caractContainer.appendChild(caract1);
  const fillCaract = (datalist, parent) => {
    Object.entries(datalist).forEach(([key, value]) => {
      const element = creatEl("span");
      element.innerText = `${key}${key ? ":" : ""} ${value}`;
      parent.appendChild(element);
    });
  };
  fillCaract({ hight: poke.height, weight: poke.weight }, caractContainer);
  
  const movesContainer = creatEl("div");
  modal.append(movesContainer);
  const moves = creatEl("p");
  moves.classList.add("moves");
  moves.innerText = "Movimientos";
  movesContainer.appendChild(moves);
  const typesContainer = creatEl("div");
  modal.append(typesContainer);
  const types = creatEl("p");
  types.classList.add("types");
  types.innerText = "Tipos";
  typesContainer.appendChild(types);
  const fillData = (datalist, parent) => {
    datalist.forEach((el, index) => {
      if (index > 3) return;
      const element = creatEl("span");
      element.innerText = el.name;
      parent.appendChild(element);
    });
  };
  
  fillData( poke.moves.map ((el) => el.move), movesContainer);
  fillData( poke.types.map ((el) => el.type), typesContainer);
  const imgContainer = creatEl("div");
  modal.append(imgContainer);
  imgContainer.classList.add("img-Container")
  const front = creatEl("img")
  front.src = poke.sprites.front_default;
  const back = creatEl("img");
  back.src = poke.sprites.back_default;
  imgContainer.append(front, back);
  
  const cerrar = creatEl("button");
  modal.append(cerrar);
  cerrar.classList.add("cerrar")
  cerrar.innerText = "X"
  cerrar.onclick = () => close({ key:"Escape" }, main)

};
window.addEventListener("keyup", (e) => close(e));

//lista de pokemones 
const listapoke = creatEl("ul");

function renderpokemon(pokelista){

pokelista.forEach((poke)=>{

  fetch(poke.url)
  .then(response => response.json())
  .then(data => {
    main.append(listapoke);
    listapoke.classList.add("listapoke");
    
    let lista = creatEl("li");
    main.appendChild(listapoke);
    lista.classList.add("lista")
    
    const imagen = creatEl("img")
    imagen.src = data.sprites.front_default
    const texto = creatEl("span")
    texto.innerText = data.name
    const button = creatEl("button")
    button.innerText = "Details"
    button.onclick = () => openModal(data);
    button.classList.add("button")
    
    lista.append(imagen, texto,button);
    listapoke.append(lista)
  });


})
}

//favicon con javascript
function setFavicons(){
  let headTitle = document.querySelector("head");
  let setFavicon = document.createElement("link");
  setFavicon.setAttribute("rel","shortcut icon");
  setFavicon.setAttribute("href", "assets/pokeball2.png");
  headTitle.appendChild(setFavicon);
  
}

setFavicons('assets/pokeball2.png');

//llamar api 
fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
  .then(response => response.json())
  .then(data => {
    renderpokemon(data.results)
  });



  
  
  
  
  //footer
  const footer = creatEl("nav");
  footer.classList.add("footer");
  footer.innerHTML =
  'PokeAPI practice project RAMA PabloG, FlattWorld&copy;, All Rights Reserved'
  root.appendChild(footer)
