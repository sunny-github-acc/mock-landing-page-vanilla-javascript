let section;

async function handleFilterArticlesByCategory(e) {
  if (e.target.tagName != "A" || !e.target.closest("#nav-page")) return;
  e.preventDefault();

  section = document.querySelector(".articles");

  const articles = await getArticles(e);
  
  section.innerHTML = displayFilteredArticles(articles);
}

const getArticles = async (e) => {
  try {
    const results = await fetch("../data/articles.json");
    const data = await results.json();
    let articles = data[section.dataset.articles];
    const filteredArticles = e.target.innerHTML != "VISI" ? articles
      .filter(item => item.category === e.target.innerHTML.toLowerCase()) : articles;
    return filteredArticles;
  } catch (err) {
    console.log(err);
  }
}

const displayFilteredArticles = items => {
  let displayArticles = items.map(
    article => `
      <div id="id-${article.id}" class="item-select ${article.orientation}" data-id="${article.id}">
            <a href="#" data-articles="${section.dataset.articles}">
                <div class="image-container">
                  <img class="not-loaded" 
                    data-src="${article.image}" 
                    alt="${article.alt}">
                </div>
                <h4>${article.category}</h4>
                <h2>${article.title}</h2>
            </a>  
      </div>`); 

    return displayArticles.join("");
}

function isNavActive(e) {
  if (e.target.tagName != "A") return;
  if (document.body.querySelector(".nav-page-item.active") === e.target.parentElement) return;
  e.preventDefault();
  
  let navLI = document.body.querySelectorAll(".nav-page-item");
  [...navLI].map(item => item.innerHTML.includes(e.target.innerHTML) ? 
    item.classList.add("active") :
    item.classList.remove("active"));
  
  return true;  
}

export { handleFilterArticlesByCategory, isNavActive }