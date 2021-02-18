function handleResizeNav() {
    let nav = document.body.querySelector(".nav ul"),
        menuButton = document.body.querySelector(".menu-wrap"),
        newsletter = document.body.querySelector(".newsletter");
    
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

function handleResizeContacts() {
    let contacts = document.body.querySelector(".contacts");

    if (window.innerWidth > 768) {
        if (contacts) show(contacts);
    }
    
    if (window.innerWidth <= 768) {
        if (contacts) hide(contacts);
    }
}

function handleResizeFooter() {
    let footerItem = document.body.querySelectorAll(".flex-footer-item");
    
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

function hide(element) {
    element.classList.add("no-display");
}

function show(element) {
    element.classList.remove("no-display");
}

export { handleResizeNav, handleResizeContacts, handleResizeFooter }