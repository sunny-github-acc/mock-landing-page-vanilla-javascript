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
    if (e.type != "resize") if (e.target.closest("active")) return;
    
    if (!document.body.querySelector(".product-image-container")) return;
    
    let active = document.body.querySelector(".product-image-container .active");
    const passiveImageDummy = document.body.querySelector(".product-image-container-dummy .passive img");
    const container = document.body.querySelector(".product-image-container");

    if (!active) { 
        active = setActive();
        setPassiveStyles();
        setTimeout(() => {
            container.classList.remove("not-visible");
        }, 1000);
    }
    
    setStyle();

    if (e.type === "resize") {
        setTimeout(() => {
            setStyle();
        }, 500);
    }

    passiveImageDummy.onload = function() {
        setTimeout(() => {
            setStyle();
        }, 100);
    }
    
    if (e && e.type != "resize") {
        resetStyle();
    }

    active.classList.add("styled");
}

function setStyle() {
    const container = document.body.querySelector(".product-image-container");
    const containerRect = container.getBoundingClientRect();
    const activeImage = document.body.querySelector(".product-image-container .active img");
    const activeRect = activeImage.parentElement.getBoundingClientRect();
    const dummyImage = document.body.querySelector(".product-image-container-dummy .active img");
    const passiveImageDummy = document.body.querySelector(".product-image-container-dummy .passive img");
    const icon = document.body.querySelector(".product-image-container .icon");
    let passiveOffsetWidth;    
    
    if (isActiveAhead()) passiveOffsetWidth = 0;
    else passiveOffsetWidth = passiveImageDummy.offsetWidth;
    
    const left = activeRect.left - containerRect.left + passiveOffsetWidth;
    const top = dummyImage.offsetHeight;
    const bottom = passiveImageDummy.offsetHeight;
    const padding = 2;

    container.style.pointerEvents = "none";
    container.style.marginTop = top + 20 + "px";
    container.style.marginBottom = bottom + "px";
    activeImage.style.left = -left + padding + "px";
    activeImage.style.top = -top  + "px";
    icon.style.top = bottom - (icon.offsetHeight / 2) + "px";

    setTimeout(() => {
        container.style.pointerEvents = "unset";
    }, 800);
}

function isActiveAhead() {
    const active = document.body.querySelector(".product-image-container .active");
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