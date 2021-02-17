function handleSelectMain(e) {
    let main = document.body.querySelector("main");
    let permanent = main.querySelector(".container-item.no-display");
    let id = main.querySelector(".container-item").id;
    main.innerHTML = permanent.innerHTML;
    
    let header = document.body.querySelector(".title-container").offsetHeight + 20;
    let top = document.body.querySelector("#" + id).getBoundingClientRect().top - header;
    
    
    scrollBy(0, top);
}

export { handleSelectMain }