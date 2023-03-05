import products from "../data/products.js";

let body = document.body;

window.onload = function getProducts() {
  let allProducts = products;

  // Crear contenedor de todos los productos
  let productsContainer = document.getElementById("grid-main-container");
  //productsContainer.classList.add("grid-container");

  // Por cada producto, crear un div y agregarlo al container
  allProducts.forEach((product) => {
    let img = document.createElement('img');
    img.src = `../images/${product.id}.jpg`

    console.log(`${product.id}:${product.title}: ${product.amount}: ${product.price}: ${product.img}`);
    let productCard = document.createElement("div");
    productCard.classList.add("grid-main-item");
    let imgEl = document.createElement("img");
    imgEl.src = `./src/images/${product.id}.jpg`
    productCard.appendChild(imgEl);
    let titleEl = document.createElement("p");
    titleEl.innerHTML = product.title;
    productCard.appendChild(titleEl);
    let amountEl = document.createElement("p");
    amountEl.innerHTML = product.amount;
    productCard.appendChild(amountEl);
    let priceEl = document.createElement("p");
    priceEl.innerHTML = product.price + '$';
    productCard.appendChild(priceEl);
    productsContainer.appendChild(productCard);
  });

  // body.appendChild(productsContainer);
};