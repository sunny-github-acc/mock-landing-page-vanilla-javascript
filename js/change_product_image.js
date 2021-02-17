function handleChangeProductImage(e) {
    const target = e.target.closest(".passive");
    if (!target) return;

    const active = document.body.querySelector(".product-image-container .active");

    target.classList.remove("passive");
    target.classList.add("active");
    target.classList.add("previous");
    active.classList.remove("active");
    active.classList.add("passive");
    
    handleChangeProductImagesStyles(e);
}

function handleChangeProductImagesStyles(e) {
    if (e) if (e.target.closest("active")) return;
    if (!document.body.querySelector(".product-image-container")) return;
    
    let active = document.body.querySelector(".product-image-container .active");
    let passiveImageDummy = document.body.querySelector(".product-image-container-dummy .passive img");

    if (!active) { 
        active = setActive();
        setPassiveStyles();
        setTimeout(() => {
            container.classList.remove("not-visible");
        }, 1000);
    }

    const container = document.body.querySelector(".product-image-container");
    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const activeImage = active.firstChild.nextSibling;
    const dummyImage = document.body.querySelector(".product-image-container-dummy .active img");
    const icon = document.body.querySelector(".product-image-container .icon");

    
    setStyle();

    passiveImageDummy.onload = function() {
        setTimeout(() => {
            setStyle();
        }, 100);
    }

    if (e) {
        resetStyle()
    }

    active.classList.add("styled");


    function setStyle() {
        let passiveOffsetWidth;
        if (isAhead(active)) passiveOffsetWidth = 0;
        else passiveOffsetWidth = passiveImageDummy.offsetWidth;
        
        let left = activeRect.left - containerRect.left + passiveOffsetWidth;
        let top = dummyImage.offsetHeight;
        let bottom = passiveImageDummy.offsetHeight;
        let padding = 2;

        container.style.marginTop = top + 20 + "px";
        container.style.marginBottom = bottom + "px";
        activeImage.style.left = -left + padding + "px";
        activeImage.style.top = -top  + "px";
        icon.style.top = bottom - (icon.offsetHeight / 2) + "px";
    }

    function isAhead(active) {
        const previous = document.body.querySelectorAll(".product-image-container .previous");
        
        if (!previous[1]) return true;

        if (previous[0] === active) {
            previous[1].classList.remove("previous");
            return true;
        } else {
            previous[0].classList.remove("previous");
            return false;
        }
    }

    function resetStyle() {
        const styled = document.body.querySelector(".product-image-container .styled");
        if (!styled) return;
        const styledImage = styled.firstChild.nextSibling;
        styledImage.style.left = 0;
        styledImage.style.top = 0;
        styled.classList.remove("styled");
    }

}

function setActive() {
    const active = document.body.querySelector(".product-image-container .passive");
    active.classList.remove("passive");
    active.classList.add("active"); 
    return active;
}

function setPassiveStyles() {
    const passiveImages = document.body.querySelectorAll(".passive");
    for (let image of passiveImages) {
        image.firstChild.nextSibling.style.left = 0;
        image.firstChild.nextSibling.style.top = 0;
    }
}

export { handleChangeProductImage, handleChangeProductImagesStyles }