function handleScrollBackButton() {
    let button = document.body.querySelector(".back-button");
    
    if (!button) return;
    
    const footer = document.body.querySelector("footer");
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - footer.offsetHeight) {
        button.classList.remove("fixed");
        button.classList.add("sticky");
    }
}


export { handleScrollBackButton }