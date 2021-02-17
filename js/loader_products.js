const div = document.body.querySelector(".products");
let section;

async function handleLoadProducts() {
    if (!div) return;
    
    let products = await getProducts();

    displayProducts(products);
}

async function handleLoadRecommendedProducts() {
  section = document.body.querySelector(".recommended-products");
  if (!section) return;

  const products = await getProducts();
  
  let recommendedProducts = filteredRecommendedProducts(products);

  displayRecommendedProducts(recommendedProducts);
}

const getProducts = async () => {
try {
    const results = await fetch("../../data/products.json");
    const data = await results.json();
    let products = data[div.dataset.products];
    return products;
} catch (err) {
    console.log(err);
    }
}

const displayProducts = (items) => {
    let temp = "";
    items.map(item => {
        temp += `
        <div id="id-${item.id}" class="product item-select" data-id="${item.id}">
            <div class="img-container">
                <a href="#">
                    <img src="https://svgshare.com/i/SeQ.svg"
                        class="not-loaded"
                        data-src="${item.image}"
                        alt="${item.alt}">
                <div class="flex icon"><i class="fas fa-heart"></i></div>
                <div class="misc-container flex">
                    <span class="${item.onSale}">IŠPARDAVIMAS!</span>
                    <span class="${item.oneLeft}" >LIKO VOS VIENAS!</span>
                </div>
                </a>
            </div>
            <div class="info-container">
                <a href="#"><h3><strong>${item.title}</strong></h3></a>
                <h3 class="price">€${Math.round(item.price * Math.random())}.00</h3>
            </div>
        </div>`
    })
    div.innerHTML = temp;
}

const displayRecommendedProducts = products => {
    let productItems = products.map(product =>
            `<div id="recommended-id-${product.id}" class="item-select" data-id="${product.id}">
                <a href="#" data-products="${section.dataset.products}" data-id="${product.id}">
                    <div class="image-container">
                    <img class="not-loaded"
                        data-src="${product.image}" 
                        alt="${product.alt}">
                    </div>
                    <div class="product-title">
                        <p class="product-p">${product.category}</p>
                        <h1>${product.title}</h1>
                        <h3 class="price">€${Math.round(product.price * Math.random())}.00</h3>
                    </div>
                </a>
            </div>`)
                    .slice(0, 4)
                    .join("");
    
    let displayProducts = `<div class="border-title">REKOMENDUOJAME</div>` + productItems;
      
    section.innerHTML = displayProducts;
}
  
function filteredRecommendedProducts(products) {
    const selectedProductId = document.body.querySelector(".container-item").id[3];
    return products.filter(i => i.id != selectedProductId);
}

export { handleLoadProducts, handleLoadRecommendedProducts }