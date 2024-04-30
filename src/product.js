import { shopItemsData } from "./productData.js";

let productsContainer = document.querySelector(".products");
let searchInput = document.querySelector(".search");
let categoriesContainer = document.querySelector(".cats");


let basket = JSON.parse(localStorage.getItem("data")) || [];


let displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map((x) =>{
        let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || [];
        return `
<div id=product-id-${id} class="product"> 
<img
width="200" height="200"
src=${img}
alt=""
/>
<span class="name">${name}</span>
<span class="desc">${desc}</span>
<div class="price-quantity">
<span>¥ ${price}</span>
<div class="buttons">
     <i id="myButton1" data-id="${id}" class="bi bi-dash-lg decrementButton"></i>
      <div id=${id} data-id="${id}" class="quantity">0</div>
       <i id="myButton" data-id="${id}" class="bi bi-plus-lg incrementButton"></i>
</div>
</div>
</div>
`;
})
.join("");
};

displayProducts(shopItemsData);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      shopItemsData.filter(
        (item) => item.name.toLowerCase().indexOf(value) !== -1
      )
    );
  } else {
    displayProducts(shopItemsData);
  }
});

const setCategories = () => {
  const allCats = shopItemsData.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map((cat) => `<span class="cat">${cat}</span>`)
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;

    selectedCat === "All"
      ? displayProducts(shopItemsData)
      : displayProducts(
          shopItemsData.filter((item) => item.cat === selectedCat)
        );
  });
};
setCategories();



let increment = (event) => {
  let id = event.target.getAttribute("data-id");
  let search = basket.find((x) => x.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      quantity: 1,
    });
  } else {
    search.quantity += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
    
  update(id);
};

// Get all elements with the class "incrementButton"
let incrementButtons = document.querySelectorAll(".incrementButton");
// Add the event listener to each button
incrementButtons.forEach((x) => {
  x.addEventListener("click", increment);
});


let decrement = (event) => {
  let id = event.target.getAttribute("data-id");
  let search = basket.find((x) => x.id === id);
  if (search.quantity === 0) return;
  else {
    search.quantity -= 1;
      if (search.quantity < 0) {
        search.quantity = 0; // Ensure quantity doesn't go below zero
      }
  }
localStorage.setItem("data", JSON.stringify(basket));     
  update(id);
};
// Get all elements with the class "incrementButton"
let decrementButtons = document.querySelectorAll(".decrementButton");
// Add the event listener to each button
decrementButtons.forEach((x) => {
  x.addEventListener("click", decrement);
});

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.quantity;
  calculation();
};

let calculation = () => {
  let cartIcon=document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x)=>x.quantity).reduce((x,y) => x+y, 0);
};
calculation();