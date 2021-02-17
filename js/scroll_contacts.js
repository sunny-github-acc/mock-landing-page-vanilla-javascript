function handleScrollContacts() {
    let contacts = document.body.querySelector(".contacts");

    if (!contacts) return;

    let contentTop = document.body.querySelector(".content").getBoundingClientRect().top - document.body.querySelector("#title").offsetHeight - "100";
    const footer = document.body.querySelector("footer");
    let contentBottom = footer.getBoundingClientRect().top + footer.offsetHeight - 50 - window.innerHeight;
    
    if (contentTop < 0 && contentBottom > 0) {
        contacts.classList.remove("not-visible");
    } else {
        contacts.classList.add("not-visible");
    }
}


export { handleScrollContacts }