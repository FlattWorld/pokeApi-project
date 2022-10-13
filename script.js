// HELPER FUNCTIONS TO WRITE LESS CODE
const $ = (node) => document.querySelector(node);
const creatEl = (node) => document.createElement(node);

//CONSTANT DECLARATION
const root = $("#root");
const header = creatEl("header");
const main = creatEl("main");
const searchBar = creatEl("div");
const logo = creatEl("img");
const pokeList = creatEl("ul");

//BASE LAYOUT
root.append(header, main);
main.append(searchBar, pokeList);

//HEADER
header.appendChild(logo);
header.classList.add("header");
logo.src = "./assets/logo.png";

//Search Bar
searchBar.classList.add("searchBar");
const form = creatEl("form");
const input = creatEl("input");
input.setAttribute("type", "text");
input.setAttribute("placeholder", "Search by name or id");
form.classList.add("form");
input.classList.add("input");
form.appendChild(input);
searchBar.appendChild(form);

//MAIN
pokeList.classList.add("pokemon-list");
main.appendChild(pokeList);

//MODAL WINDOW
const fillChars = (datalist, parent) => {
  Object.entries(datalist).forEach(([key, value]) => {
    const element = creatEl("span");
    element.innerText = `${key}${key ? ":" : ""} ${value}`;
    parent.appendChild(element);
  });
};

const fillData = (datalist, parent) => {
  datalist.forEach((el, index) => {
    if (index > 3) return;
    const element = creatEl("span");
    element.innerText = el.name;
    parent.appendChild(element);
  });
};

const closeModal = (e, parent) => {
  if (e.target !== e.currentTarget) return;
  parent.removeChild(e.target);
};

const close = (e) => {
  if (e.key === "Escape" && $(".overlay")) main.removeChild($(".overlay"));
};

const openModal = (poke) => {
  const overlay = creatEl("div");
  overlay.addEventListener("click", (e) => closeModal(e, main));
  const modal = creatEl("div");
  const title = creatEl("h1");
  title.innerText = `${poke.name} #${poke.id}`;

  const imgContainer = creatEl("div");
  imgContainer.classList.add("img-container");
  const front = creatEl("img");
  front.src = poke.sprites.front_default;
  const back = creatEl("img");
  back.src = poke.sprites.back_default;
  imgContainer.append(front, back);

  const charsContainer = creatEl("div");
  const movesContainer = creatEl("div");
  const typesContainer = creatEl("div");
  const chars = creatEl("p");
  chars.innerText = "Characteristics";
  const moves = creatEl("p");
  moves.innerText = "Moves";
  const types = creatEl("p");
  types.innerText = "Types";
  charsContainer.appendChild(chars);
  movesContainer.appendChild(moves);
  typesContainer.appendChild(types);

  fillChars({ hight: poke.height, weight: poke.weight }, charsContainer);
  fillData(
    poke.moves.map((el) => el.move),
    movesContainer
  );
  fillData(
    poke.types.map((el) => el.type),
    typesContainer
  );

  modal.classList.add("modal");
  overlay.classList.add("overlay");

  const closeBtn = creatEl("button");
  closeBtn.classList.add("close-btn");
  closeBtn.innerText = "x";
  closeBtn.onclick = () => close({ key: "Escape" });

  modal.append(
    title,
    charsContainer,
    movesContainer,
    typesContainer,
    imgContainer,
    closeBtn
  );
  overlay.appendChild(modal);

  main.appendChild(overlay);
};

window.addEventListener("keyup", (e) => close(e));

//POKE LIST
const renderSinglePokemon = (pokeElement) => {
  const pokeLi = creatEl("li");
  pokeLi.classList.add("pokemon-list_item");
  const pokeImage = creatEl("img");
  pokeImage.src = pokeElement.sprites.front_default;
  const pokeName = creatEl("span");
  pokeName.innerText = `${pokeElement.name} #${pokeElement.id}`;
  const pokeButton = creatEl("button");
  pokeButton.setAttribute("type", "button");
  pokeButton.innerText = "Details";
  pokeButton.onclick = () => openModal(pokeElement);
  pokeLi.append(pokeImage, pokeName, pokeButton);
  pokeList.appendChild(pokeLi);
};

const renderPokemon = (pokemonList) => {
  pokeList.innerHTML = "";
  pokemonList.forEach((poke) => {
    const pokElement = creatEl("li");
    pokElement.classList.add("pokemon-list_item");
    fetch(poke.url)
      .then((response) => response.json())
      .then((pokeElement) => {
        const pokeImage = creatEl("img");
        pokeImage.src = pokeElement.sprites.front_default;
        pokElement.appendChild(pokeImage);
        const pokeName = creatEl("span");
        pokeName.innerText = `${pokeElement.name} #${pokeElement.id}`;
        pokElement.appendChild(pokeName);
        const pokeButton = creatEl("button");
        pokeButton.setAttribute("type", "button");
        pokeButton.innerText = "Details";
        pokeButton.onclick = () => openModal(pokeElement);
        pokElement.appendChild(pokeButton);
      });

    pokeList.appendChild(pokElement);
  });
};

const cacheResult = (cache) =>
  window.localStorage.setItem("pokes", JSON.stringify(cache));

// INITIAL RENDER
fetch("https://pokeapi.co/api/v2/pokemon?limit=9&offset=256")
  .then((response) => response.json())
  .then((data) => {
    cacheResult(data.results);
    renderPokemon(data.results);
  });

const filterData = (value) => {
  renderPokemon(
    JSON.parse(window.localStorage.getItem("pokes")).filter(
      (el) =>
        el.name.toUpperCase().match(value.toUpperCase()) ||
        el.url.split("/").at(-2).match(value)
    )
  );
};

// SEARCH EVENTS
input.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") {
    if (!!e.target.value) filterData(e.target.value);
    if (!e.target.value)
      renderPokemon(JSON.parse(window.localStorage.getItem("pokes")));
  }
});

form.onsubmit = (e) => {
  e.preventDefault();

  if (input.value) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${input.value.trim()}`)
      .then((response) => response.json())
      .then((data) => {
        renderSinglePokemon(data);
      })
      .catch((er) => {
        const h1 = creatEl("h1");
        h1.innerText = `Pokemon ${input.value} not found :(`;
        pokeList.appendChild(h1);
      });
  }
};
