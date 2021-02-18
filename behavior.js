'use strict';

import { handleLoadArticles as handleLoadPageArticles,
         handleLoadRecommendedArticles } from "./js/loader_articles.js";
import { handleLoadSecondaryNav as handleLoadPageSecondaryNav } from "./js/loader_nav_secondary.js";
import { handleFilterArticlesByCategory as handleFilterPageArticlesByCategory,
         isNavActive } from "./js/filter_articles_by_category.js";
import { handleLoadProducts as handleLoadPageProducts,
         handleLoadRecommendedProducts } from "./js/loader_products.js";
import { handleBackButtonAnimation } from "./js/animation_back_button.js";
import { handleSelectMain as handleSelectPageMain } from "./js/select_main.js";
import { handleSelectItem as handleSelectPageItem } from "./js/select_item.js";
import { handleChangeProductImage, 
         handleChangeProductImagesStyles } from "./js/change_product_image.js";
import { handleScrollContacts } from "./js/scroll_contacts.js";
import { handleResizeNav, 
         handleResizeContacts,
         handleResizeFooter } from "./js/resize_elements.js";
import { handleScrollBackButton } from "./js/scroll_back_button.js";
import { handleToggleFooterItems } from "./js/loader_footer_items.js";
import { handleHideLoadingElement } from "./js/hide_loading_element.js";
import { handleSlideNav } from "./js/slide_nav.js";
import { handleSlideMenu } from "./js/slide_menu.js";
import { handleShowImages } from "./js/show_images.js";

let secondaryNav = document.body.querySelector("#nav-page .nav-ul"),
    menuButton = document.body.querySelector(".menu-wrap"),
    footerItems = document.body.querySelector(".flex-footer");
    
window.addEventListener("DOMContentLoaded", handleWindowLoad);
window.addEventListener("DOMContentLoaded", handleHideLoadingElement);
window.addEventListener("DOMContentLoaded", handleLoadSecondaryNav)
window.addEventListener("DOMContentLoaded", handleLoadArticles);
window.addEventListener("DOMContentLoaded", handleLoadProducts);
window.addEventListener("resize", handleResizeContacts);
window.addEventListener("resize", handleResizeNav);
window.addEventListener("resize", handleResizeFooter);
window.addEventListener("resize", handleChangeProductImagesStyles);
document.addEventListener("scroll", handleSlideNav);
document.addEventListener("scroll", handleShowImages);
document.addEventListener("scroll", handleScrollContacts);
document.addEventListener("scroll", handleScrollBackButton);
document.body.addEventListener("click", handleSelectItem);
document.body.addEventListener("click", handleChangeProductImage);
menuButton.addEventListener("click", handleSlideMenu);
footerItems.addEventListener("click", handleToggleFooterItems);
if (secondaryNav) secondaryNav.addEventListener("click", handleFilterArticlesByCategory);

function handleWindowLoad() {
    handleShowImages();
    handleResizeNav();
    handleResizeFooter();
    handleHideLoadingElement();
}

function handleLoadSecondaryNav() {
    handleLoadPageSecondaryNav().then(() => handleWindowLoad());
}

function handleLoadArticles() {
    if (document.querySelector(".articles")) {
        handleLoadPageArticles().then(() => handleWindowLoad());
    }
}

function handleLoadProducts() {
    handleLoadPageProducts().then(() => handleWindowLoad());
}

function handleSelectItem(e) {
    handleSelectPageItem(e)
        .then(() => handleWindowLoad())
        .then(() => handleBackButtonAnimation())
        .then(() => setBackButton())
        .then(() => handleChangeProductImagesStyles(e))
        .then(() => handleLoadRecommendedArticles())
        .then(() => handleLoadRecommendedProducts());
}

function setBackButton() {
    const backButton = document.querySelector(".back-button");
    if (backButton) backButton.addEventListener("click", handleSelectMain);
}

function handleSelectMain(e) {
    handleSelectPageMain(e);
    secondaryNav = document.body.querySelector("#nav-page")
    if (secondaryNav) secondaryNav.addEventListener("click", handleFilterArticlesByCategory);
}

function handleFilterArticlesByCategory(e) {
    if (isNavActive(e)) {
        let section = document.querySelector(".articles");

        if (e.target.innerHTML === "VISI") {
            section.classList.add("grid-container");    

            handleLoadPageArticles()
                .then(() => handleWindowLoad())
                .then(() => section.classList.remove("flex"));
        } else {
            handleFilterPageArticlesByCategory(e)
                .then(() => handleWindowLoad())
                .then(() => section.classList.add("flex"))
                .then(() => section.classList.remove("grid-container"));
        }
    }
}

