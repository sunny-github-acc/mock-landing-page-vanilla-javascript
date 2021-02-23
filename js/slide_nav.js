function handleSlideNav() {
    let nav = document.body.querySelector(".nav-ul");
    if (!nav) return;
    if (this.oldScroll < window.scrollY) {
        nav.classList.add("nav-ul-top");
        
    } else {
        nav.classList.remove("nav-ul-top");
    }
    this.oldScroll = window.scrollY;
}

export { handleSlideNav }