function handleSlideMenu() {
    let menu = document.body.querySelector(".nav-menu-ul");
    menu.classList.toggle("menu-active");
    menu.classList.contains("menu-active") ? 
        document.body.style.overflow = "hidden" : 
        document.body.style.overflow = ""; 
}

export { handleSlideMenu }