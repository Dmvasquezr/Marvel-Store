import MarvelService from "./js/marvel.service.js";
import RandomStuff from "./js/utils/random.js";

let offset = 0;
const limit = 6;
const cart = [];

function renderCartList() {
  const tbody = document.getElementById("cart-table");

  tbody.innerHTML = "";

  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];

    tbody.innerHTML += `
        <tr>
            <td>${element.title}</td>
            <td>$ ${element.price}</td>
        </tr>
        `;
    }
}

function addToParams() {
  const params = new URLSearchParams(window.location.search);

  params.has("cart")
    ? params.set("cart", JSON.stringify(cart))
    : params.append("cart", JSON.stringify(cart));

  if (history.pushState) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      params.toString();
    window.history.pushState({ path: newurl }, "", newurl);
  }
}

addToCart = (title, price) => {
  const comic = {
    title,
    price,
  };

  cart.push(comic);
  addToParams();
  renderCartList();
};

async function renderComics(offset, limit) {
  // llamar servcio
  const marvelService = new MarvelService();
  const randomStuff = new RandomStuff();
  const comics = await marvelService.getComics(offset, limit);

  // renderizar
  const container = document.getElementById("comic-list");
  container.innerHTML += `
    <div class="row card-comic" id="row-${offset}">
        <!-- Renderiza 6 comics -->
    </div>
    `;
  for (let index = 0; index < comics.length; index++) {
    const element = comics[index];
    const img = element.thumbnail.path + "." + element.thumbnail.extension;
    const price = randomStuff.randomIntFromInterval(20, 100);

    const rowList = document.getElementById(`row-${offset}`);

    rowList.innerHTML += `                        
            <div class="card-comic col-lg-2 col-sm-6 mb-5 mt-5">
                <img class="character-img" src="${img}">
                <h3 class="card-title mt-2">${element.title}</h3>
                <div class"mt-4">
                    <span class="card-price">$ ${price}</span>
                    <button type="button" class="btn btn-danger" onclick="addToCart('${element.title.toString()}', ${price})">Agregar</button>
                </div>
            </div>        
        `;
  }
}

function loadMoreComics() {
  offset = offset + 1;
  renderComics(offset, limit);
}

function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const cartStored = params.get("cart");
  if (cartStored) {
    cart.push(...JSON.parse(cartStored));
    renderCartList();
  }
}

/**
 * Inicializa la aplicacion
 */
async function init() {
  await renderComics(offset, limit);
  getQueryParams();
  document.getElementById("loadMore").addEventListener("click", loadMoreComics);
}

init();
