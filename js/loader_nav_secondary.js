const nav = document.querySelector("#nav-page");
let navUL;

async function handleLoadSecondaryNav() {
    if (!nav) return;

    navUL = nav.firstChild.nextSibling;

    if (navUL.querySelector("li")) return;
    
    const ul = await getUL();
    displayUL(ul);
  }

const getUL = async () => {
  try {
    const results = await fetch("../data/articles.json");
    const data = await results.json();
    const ul = data[nav.dataset.articles];
    return ul;
  } catch (err) {
    console.log(err);
  }
}

const displayUL = items => {
    let listSet = new Set(),
        displayList = [];

    items.map(item => listSet.add(item.category.toUpperCase())); 

    for (let item of listSet.values()) {
        displayList.push(item);
    }

    displayList.sort().unshift("VISI");
    displayList = displayList.map(item => {
        return `<li id="${item}" class="nav-page-item"><a href="#">${item}</a></li>`
    })     
    
    if (nav) {
        navUL.insertAdjacentHTML("afterBegin", displayList.join(""));
    }
}

export { handleLoadSecondaryNav }