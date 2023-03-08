import products from "../data/products.js";


// let body = document.body;

// --------------------------------------- grilla de productos ----------------------------------- //

let allProducts = products;
// Crear contenedor de todos los productos
let productsContainer = document.getElementById("grid-main-container");
//productsContainer.classList.add("grid-container");

// Por cada producto, crear un div y agregarlo al container
allProducts.forEach((product) => {

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


// --------------------------------------- paginador ----------------------------------- //

const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("grid-main-container");
const listItems = paginatedList.querySelectorAll("div");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 12;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
button.classList.add("disabled");
button.setAttribute("disabled", true);
};

const enableButton = (button) => {
button.classList.remove("disabled");
button.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});

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