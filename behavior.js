'use strict';

import { handleLoadArticles as handleLoadPageArticles,
         handleLoadReadMoreArticles } from "./js/loader_articles.js";
import { handleLoadSecondaryNav as handleLoadPageSecondaryNav } from "./js/loader_nav_secondary.js";
import { handleFilterArticlesByCategory as handleFilterPageArticlesByCategory,
         handleIsNavActive } from "./js/filter_articles_by_category.js";
import { handleLoadProducts as handleLoadPageProducts } from "./js/loader_products.js";
import { handleBackButtonAnimation } from "./js/animation_back_button.js";
import { handleSelectMain as handleSelectPageMain } from "./js/select_main.js";
import { handleSelectItem as handleSelectPageItem } from "./js/select_item.js";
import { handleChangeProductImage, 
         handleChangeProductImagesStyles } from "./js/change_product_image.js";
import { handleScrollContacts } from "./js/scroll_contacts.js";
import { hide, show } from "./js/resize_elements.js";

let nav = document.body.querySelector(".nav ul"),
    secondaryNav = document.body.querySelector("#nav-page .nav-ul"),
    menuButton = document.body.querySelector(".menu-wrap"),
    footerItem = document.body.querySelectorAll(".flex-footer-item"),
    newsletter = document.body.querySelector(".newsletter");
    
window.addEventListener("DOMContentLoaded", handleWindowLoad);
window.addEventListener("DOMContentLoaded", handleLoading);
window.addEventListener("DOMContentLoaded", handleLoadSecondaryNav)
window.addEventListener("DOMContentLoaded", handleLoadArticles);
window.addEventListener("DOMContentLoaded", handleLoadProducts);
window.addEventListener("resize", handleResize);
window.addEventListener("resize", handleNav);
window.addEventListener("resize", handleFooter);
document.addEventListener("scroll", handleIsNav);
document.addEventListener("scroll", handleIsImg);
document.addEventListener("scroll", handleScrollContacts);
document.body.addEventListener("click", handleSelectItem);
document.body.addEventListener("click", handleChangeProductImage);
menuButton.addEventListener("click", handleMenu);
footerItem[0].parentElement.addEventListener("click", handlefooterItem);
if (secondaryNav) secondaryNav.addEventListener("click", handleFilterArticlesByCategory);

function handleWindowLoad() {
    handleIsImg();
    handleNav();
    handleFooter();
    handleLoading();
}

function handleLoading() {
    document.body.querySelector("#loading").hidden = true;
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

function handleResize() {
    let contacts = document.body.querySelector(".contacts");

    if (window.innerWidth > 768) {
        if (contacts) show(contacts);
    }
    
    if (window.innerWidth <= 768) {
        if (contacts) hide(contacts);
    }

    handleChangeProductImagesStyles();
}

function handleNav() {
    if (window.innerWidth > 768) {
            nav.classList.remove("nav-menu-ul");
            nav.classList.remove("menu-passive"); 
            nav.classList.remove("menu-active"); 
            nav.classList.add("nav-ul");
            nav.classList.add("nav-slide");
            newsletter.classList.remove("hidden");
            menuButton.classList.add("hidden");
    }
    if (window.innerWidth < 768) {
            nav.classList.add("nav-menu-ul");
            nav.classList.add("menu-passive");
            nav.classList.remove("nav-ul");
            nav.classList.remove("nav-slide");
            nav.classList.remove("nav-ul-top");
            newsletter.classList.add("hidden");
            menuButton.classList.remove("hidden");
    }
}

function handleMenu() {
    let menu = document.body.querySelector(".nav-menu-ul");
    menu.classList.toggle("menu-active");
    menu.classList.contains("menu-active") ? 
        document.body.style.overflow = "hidden" : 
        document.body.style.overflow = ""; 
}

function handleFooter() {
    if (window.innerWidth < 768) {
        for (let i of footerItem) {
        let up = i.querySelector(".up"),
            down = i.querySelector(".down"),
            list = i.querySelector(".flex-footer-item-list");
            up.hidden = true;
            down.hidden = false;
            list.hidden = true;
        }
    } else {
        for (let i of footerItem) {
            let up = i.querySelector(".up"),
                down = i.querySelector(".down"),
                list = i.querySelector(".flex-footer-item-list");
                up.hidden = true;
                down.hidden = true;
                list.hidden = false;
        }
    }
}

function handleIsNav(e) {
    let nav = document.body.querySelector(".nav-ul");
    if (!nav) return;
    if (this.oldScroll < window.scrollY) {
        nav.classList.add("nav-ul-top");
        
    } else {
        nav.classList.remove("nav-ul-top");
    }
    this.oldScroll = window.scrollY;
}

function handleIsImg() {
    let images = document.body.querySelectorAll(".not-loaded");
    if (images === "") return;
    
    for (let i of images) isVisible(i) ? setSrc(i) : null;

    function isVisible(img) {
        let coords = img.getBoundingClientRect(),
            windowHeight = document.documentElement.clientHeight,
            topVisible = coords.top >= 0 && coords.top - 500 <= windowHeight,
            bottomVisible = coords.bottom <= windowHeight && coords.bottom >= 0;
            return topVisible || bottomVisible;
    }
    
    function setSrc(image) {
        let src = image.dataset.src,
            tempImage = document.createElement("img");

        tempImage.onload = function(e) {
            image.style.transition = "opacity 1s";
            image.setAttribute("src", src); 
            image.classList.remove("not-loaded");
            image.style.opacity = 1
        }
        
        tempImage.src = src;
    }
}

function handleSelectItem(e) {
    handleSelectPageItem(e)
        .then(() => handleWindowLoad())
        .then(() => handleBackButtonAnimation())
        .then(() => setBackButton())
        .then(() => handleChangeProductImagesStyles(e))
        .then(() => handleLoadReadMoreArticles());
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
    if (handleIsNavActive(e)) {
            let section = document.querySelector(".articles");
        if (e.target.innerHTML === "VISI") {
            
            section.classList.add("grid-container");    

            handleLoadPageArticles()
                .then(() => handleWindowLoad())
                .then(() => section.classList.remove("flex"));
        }
        else handleFilterPageArticlesByCategory(e)
                .then(() => handleWindowLoad())
                .then(() => section.classList.add("flex"))
                .then(() => section.classList.remove("grid-container"));
    }
}


function handlefooterItem(e) {
    let elem = e.target.closest("a");
    if (elem === null || elem.closest(".flex-footer-item-title") === null || window.innerWidth > 768) return;
    let up = elem.querySelector(".up"),
        down = elem.querySelector(".down"),
        list = elem.parentNode.parentNode.querySelector(".flex-footer-item-list");
        up.hidden = !up.hidden;
        down.hidden = !down.hidden;
        list.hidden = !list.hidden;
    window.scrollBy(0, 100);
}