const main = document.body.querySelector("main");
const section = document.body.querySelector("section");
let sectionType = section.dataset.data_type;
let itemType = section.dataset[sectionType];
let itemID;
let dataPath = "data/" + sectionType + ".json";

async function handleSelectItem(e) {
    let event = e.target;
    
    if (!event.closest("a")) throw "Promise rejected";
    if (event.closest(".icon")) throw "Promise rejected";
    if (!event.closest("section")) throw "Promise rejected";
    if (!event.closest("section").hasAttribute("data-data_type")) throw "Promise rejected";
    e.preventDefault();
    
    itemID = event.closest(".item-select").dataset.id;
    
    dataPath = await searchPath();

    let item = await getItem();
    
    if (sectionType === "products") displayProduct(item);
    if (sectionType === "articles") displayArticle(item);

    scrollTo(0, 0);    
}

async function searchPath() {
    for (let i = 0; i < 5; i++) {
        if (await isPathFound(dataPath)) return dataPath;
        dataPath = "../" + dataPath;
    }
    return false;
}

async function isPathFound(path) {
    try {
      const response = await fetch(path);
  
      return response.status === 200;
  
    } catch(error) {
      //console.log(error);
      return false;
    }
}

const getItem = async () => {
try {
    const results = await fetch(dataPath);
    const data = await results.json();
    let item = data[itemType].filter(i => i.id === Number(itemID))[0];
    return item;
} catch (err) {
    console.log(err);
    }
}

const displayProduct = (item) => {
    let elements = {};
    let imageDiv;
    let selected;
    let cart;
    let recommended;
    
    imageDiv = `<div class="product-image-container-dummy not-visible">
                    <div class="active">
                        <img class="not-loaded image"
                        data-src="${item.image}"
                        alt="${item.alt}">
                    </div>
                    <div class="passive">
                        <img class="not-loaded image"
                        data-src="../../images/accessories/2.jpg"
                        alt="${item.alt}">
                    </div>
                </div>
                <div class="product-image-container not-visible transition">
                <div class="image-container passive transition previous">
                    <img class="not-loaded image transition"
                    data-src="${item.image}"
                    alt="${item.alt}">
                </div>
                    <div class="image-container passive transition">
                        <img class="not-loaded image transition"
                        data-src="https://images.pexels.com/photos/6461399/pexels-photo-6461399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=720&w=940"
                        alt="${item.alt}">
                    </div>
                    <div class="image-container passive transition">
                        <img class="not-loaded image transition"
                        data-src="${item.image}"
                        alt="${item.alt}">
                    </div>
                    <div class="image-container passive transition">
                        <img class="not-loaded image transition"
                        data-src="${item.image}"
                        alt="${item.alt}">
                    </div>
                    <div class="image-container passive transition">
                        <img class="not-loaded image transition"
                        data-src="${item.image}"
                        alt="${item.alt}">
                    </div>
                    <div class="image-container passive transition">
                        <img class="not-loaded image transition"
                        data-src="${item.image}"
                        alt="${item.alt}">
                    </div>
                    <div class="flex icon"><i class="fas fa-heart"></i></div>
                </div>
                <div class="select-container">
                    <label for="size"><h3>Dydis:</h3></label>
                    <select name="size" class="size">
                        <option value="small">Mažas</option>
                        <option value="medium" selected>Vidutinis</option>
                        <option value="large">Didelis</option>
                        <option value="extra large" disabled>Itin didelis</option>
                    </select>
                </div>
                <div class="price">
                    <h3 class="price">€${Math.round(item.price * Math.random())}.00</h3>
                </div>
                <div class="border-title offer-container">
                    <div class=" cart-button">
                        <a href="#"><span class="btn"><strong>Į KREPŠELĮ</strong></span></a>
                    </div>
                </div>`;

    recommended = `<section class="recommended-products flex" data-data_type="articles" data-articles="${itemType}"></section>`;
    
    cart = `<div class="cart"><a href="naujienlaiskis.html"><i class="fas fa-shopping-cart"></i></a></div>`;
    
    elements = {
        item,
        imageDiv,
        recommended,
        cart
    };

    selected = setSelected(elements);

    displaySelected(selected);
}

const displayArticle = (item) => {
    let elements;
    let imageDiv;
    let recommended;
    let selected;
    
    imageDiv = `<div>
                    <div class="image-container ${item.orientation}">
                        <img class="not-loaded"
                        data-src="${item.image}"
                        alt="${item.alt}">
                    </div>
                        <h4>Photos provided by Pexels</h4>
                        <h4>February 6th, 2021</h4>
                    <div class="${item.type} content"><h3>${item.content}<h3></div>
                </div>
                <div class="border-title offer-container">
                    <p>Gaukite <strong>10%</strong> nuolaidą mūsų rankų darbo gaminiams </p>
                    <div class="offer-btn">
                        <a href="naujienlaiskis.html"><span class="btn"><strong>UŽSISAKYTI</strong></span></a>
                    </div>
                </div>`;

    recommended = `<section class="recommended-articles flex" data-data_type="articles" data-articles="${itemType}"></section>`;
    
    elements = {
        item,
        imageDiv,
        recommended
    };

    selected = setSelected(elements);

    displaySelected(selected);
}

function setSelected(elements) {
    return `<div id="selected">
                <div id="id-${elements.item.id}" class="container-item">
                    <h4>${elements.item.category}</h4>
                    <h1>${elements.item.title}</h1>
                    <div class="contacts not-visible">
                        <ul>
                            <li><a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a></li>
                            <li><a href="https://www.gmail.com" target="_blank"><i class="fab fa-google"></i></a></li>
                        </ul>
                    </div>
                    ${elements.imageDiv}
                    <div class="${elements.item.type} content"><h3>${elements.item.content}<h3></div>
                    <h4 class="author"><i>${elements.item.author}</i></h4>
                </div>
                <div class="back-button fixed not-animated"><i class="fas fa-arrow-circle-left"></i></div>
                ${elements.recommended}
                ${elements.cart ? elements.cart : ""}
            </div>`;
}

function displaySelected(selected) {
    let selectedElement = main.querySelector("#selected");
    if (selectedElement) {
        selectedElement.remove();
        main.innerHTML = selected + main.innerHTML;
    } else {
        main.innerHTML = selected + "<div class='container-item no-display'>" + main.innerHTML + "</div>";
    }
}

export { handleSelectItem }