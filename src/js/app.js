import products from "../data/products.js";

function createObjectList(arr) {
  const objectList = [];

  // Añadir objetos al arreglo hasta que la longitud sea divisible por 12
  while (arr.length % 12 !== 0) {
    arr.push(null);
  }

  // Dividir el arreglo en sublistas de 12 elementos cada una
  const sublists = [];
  while (arr.length > 0) {
    sublists.push(arr.splice(0, 12));
  }

  // Convertir cada sublista de objetos en una lista de valores
  const objectLists = sublists.map(sublist => {
    const list = [];
    for (let i = 0; i < 12; i++) {
      const obj = sublist[i];
      if (obj) {
        list.push([obj.id, obj.title, obj.amount, obj.price]);
      } else {
        list.push(null);
      }
    }
    return list;
  });

  objectList.push(...objectLists);

  return objectList;
}


// let body = document.body;

window.onload = function getProducts() {
  let allProducts = products();
  var Paginador = createObjectList(allProducts)
  console.log(Paginador)
  // Crear contenedor de todos los productos
  let productsContainer = document.getElementById("grid-main-container");
  //productsContainer.classList.add("grid-container");

  // Por cada producto, crear un div y agregarlo al container
  Paginador[0].forEach((product) => {
    let img = document.createElement('img');
    img.src = `../images/products/${product.id}.jpg`

    console.log(`${product.id}:${product.title}: ${product.amount}: ${product.price}: ${product.img}`);
    let productCard = document.createElement("div");
    productCard.classList.add("grid-main-item");
    let imgEl = document.createElement("img");
    imgEl.src = `./src/images/products/${product.id}.jpg`
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

// --------------------------------------- filtro ----------------------------------- //


let rangeMin = 100;
const range = document.querySelector(".filter-range-selected");
const rangeInput = document.querySelectorAll(".filter-range-input input");
const rangePrice = document.querySelectorAll(".filter-range-price input");

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(rangeInput[0].value);
    let maxRange = parseInt(rangeInput[1].value);
    if (maxRange - minRange < rangeMin) {     
      if (e.target.className === "min") {
        rangeInput[0].value = maxRange - rangeMin;        
      } else {
        rangeInput[1].value = minRange + rangeMin;        
      }
    } else {
      rangePrice[0].value = minRange;
      rangePrice[1].value = maxRange;
      range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
    }
  });
});

rangePrice.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = rangePrice[0].value;
    let maxPrice = rangePrice[1].value;
    if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});