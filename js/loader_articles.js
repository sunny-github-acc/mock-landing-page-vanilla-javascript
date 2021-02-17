let section;

async function handleLoadArticles() {
  section = document.body.querySelector(".articles");

  if (!section) return;

  const articles = await getArticles();

  displayArticle(articles);
}

async function handleLoadRecommendedArticles() {
  section = document.body.querySelector(".recommended-articles");
  if (!section) return;

  const articles = await getArticles();
  
  let recommendedArticles = filteredRecommendedArticles(articles);
  displayRecommendedArticles(recommendedArticles);
}

const getArticles = async () => {
  try {
    const results = await fetch("../data/articles.json");
    const data = await results.json();
    const articles = data[section.dataset.articles];
    return articles;
  } catch (err) {
    console.log(err);
  }
}

const displayArticle = articles => {
  let displayArticle = articles.map(
    article => ` 
    <div id="id-${article.id}" class="grid-item item-select" data-id="${article.id}">
        <a href="#" data-articles="${section.dataset.articles}" data-id="${article.id}">
            <div class="grid-img-container">
                <img class="grid-img not-loaded ${article.id != 2 ? "grid-side-img" : ""}"
                data-src="${article.image}" 
                alt="${article.alt}">
            </div>
            <p class="article-p">${article.category}</p>
            <div class="article-title"><h2>${article.title}</h2></div>
        </a>
    </div>`); 

    section.innerHTML = displayArticle.join("");
}

const displayRecommendedArticles = articles => {
  let displayArticles = articles[0] ? `<div class="border-title">DAUGIAU STRAIPSNIŲ</div>` : ""; 
 
  displayArticles +=  articles.map(article =>
    `<div id="recommended-id-${article.id}" class="item-select" data-id="${article.id}">
      <a href="#" data-articles="${section.dataset.articles}" data-id="${article.id}">
        <div class="image-container">
          <img class="not-loaded ${article.orientation}"
                data-src="${article.image}" 
                alt="${article.alt}">
        </div>
        <div class="article-title">
          <p class="article-p">${article.category}</p>
          <h1>${article.title}</h1>
        </div>
      </a>
    </div>`).join("");
    
    section.innerHTML = displayArticles;
}

function filteredRecommendedArticles(articles) {
  const selectedArticleId = document.body.querySelector(".container-item").id[3];
  return articles.filter(i => i.id != selectedArticleId);
}

export { handleLoadArticles, handleLoadRecommendedArticles }