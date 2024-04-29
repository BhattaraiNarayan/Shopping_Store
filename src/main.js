let shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let search = basket.find((x) => x.id === id) || [];
      return `
        <div id=product-id-${id} class="item">
            <img class="image" width="200" height="200" src=${img} alt="">
            <div class="details">
                <h3 class="myName">${name}</h3>
                <p>${desc}</p>
        </div>    
    </div>`;
    })
    .join(""));
};

generateShop();

