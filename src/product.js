import { shopItemsData } from "./productData.js";

let productsContainer = document.querySelector(".products");
let searchInput = document.querySelector(".search");
let categoriesContainer = document.querySelector(".cats");

let basket=[];

let displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map((item) =>{
        let { id, name, price, desc, img } = item;
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
      <i onclick="decrement(${id})"  class="bi bi-dash-lg"></i>
      <div id=${id} class="quantity">0</div>
       <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
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


