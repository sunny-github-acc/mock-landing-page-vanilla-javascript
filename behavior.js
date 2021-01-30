'use strict';

import { handleContent as handlePageContent } from "./js/content.js";
import { handleFilterNav as handlePageFilterNav } from "./js/nav_loader_secondary.js";
import { handleContentFilter as handlePageContentFilter,
         handleNavIsActive } from "./js/content_filter.js";
import { handlePageArticle } from "./js/article_loader.js";
import { handleProducts as handlePageProducts } from "./js/product_loader.js";
import { handleBackButtonAnimation } from "./js/back_button_animation.js";
import { handleBackButton as handlePageBackButton } from "./js/back_button.js";

let nav = document.body.querySelector(".nav-ul"),
    navPage = document.body.querySelector("#nav-page"),
    menuButton = document.body.querySelector(".menu-wrap"),
    footerItem = document.body.querySelectorAll(".flex-footer-item"),
    newsletter = document.body.querySelector(".newsletter");
    
window.addEventListener("DOMContentLoaded", handleWindowLoad);
window.addEventListener("DOMContentLoaded", handleLoading);
window.addEventListener("DOMContentLoaded", handleFilterNav)
window.addEventListener("DOMContentLoaded", handleContent);
window.addEventListener("DOMContentLoaded", handleProducts);
window.addEventListener("resize", handleNav);
window.addEventListener("resize", handleFooter);
document.addEventListener("scroll", handleIsNav);
document.addEventListener("scroll", handleIsImg);
document.body.addEventListener("click", handleArticle);
menuButton.addEventListener("click", handleMenu);
navPage ? navPage.addEventListener("click", handleContentFilter) : null;
footerItem[0].parentElement.addEventListener("click", handlefooterItem);

function handleWindowLoad() {
    handleIsImg();
    handleNav();
    handleFooter();
    handleLoading();
}

function handleLoading() {
    document.body.querySelector("#loading").hidden = true;
}

function handleFilterNav() {
    handlePageFilterNav().then(() => handleWindowLoad());
}

function handleContent() {
    document.querySelector("#grid-container") ?
        handlePageContent().then(() => handleWindowLoad()) : 
        null;
}

function handleProducts() {
    handlePageProducts().then(() => handleWindowLoad());
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
    
    function setSrc(img) {
        let src = img.dataset.src,
            image = document.createElement("img"),
            temp = document.createElement("img");
            
        temp.setAttribute("src", "https://svgshare.com/i/SeQ.svg");
        img.replaceWith(temp);
        img.style.opacity = 0;

        image.onload = function(e) {
            temp.replaceWith(img);
            img.style.transition = "opacity 1s";
            img.setAttribute("src", src); 
            img.classList.remove("not-loaded");
            setTimeout(() => img.style.opacity = 1);
        }
        
        image.src = src;
    }
}

function handleArticle(e) {
    handlePageArticle(e)
        .then(() => handleWindowLoad())
        .then(() => handleBackButtonAnimation())
        .then(() => setBackButton());
}

function setBackButton() {
    const backButton = document.querySelector(".back-button");
    if (backButton) backButton.addEventListener("click", handleBackButton);
}

function handleBackButton(e) {
    handlePageBackButton(e);
    navPage = document.body.querySelector("#nav-page")
    navPage.addEventListener("click", handleContentFilter);
    console.log('navPage', navPage)
}

function handleContentFilter(e) {
    if (handleNavIsActive(e)) {
        if (e.target.innerHTML === "VISI") handleContent();
        else handlePageContentFilter(e).then(() => handleWindowLoad());
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
    window.scrollBy(0, 300);
}