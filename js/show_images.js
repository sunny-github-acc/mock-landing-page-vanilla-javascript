
function handleShowImages() {
    let images = document.body.querySelectorAll(".not-loaded");

    if (images === "") return;
    
    for (let image of images) if(isVisible(image)) setSrc(image);
}

function isVisible(image) {
    let coords = image.getBoundingClientRect(),
        windowHeight = document.documentElement.clientHeight,
        topVisible = coords.top >= 0 && coords.top - 500 <= windowHeight,
        bottomVisible = coords.bottom <= windowHeight && coords.bottom >= 0;

    return topVisible || bottomVisible;
}

function setSrc(image) {
    let src = image.dataset.src,
        tempImage = document.createElement("img"),
        dummyImage = document.createElement("img");

    tempImage.setAttribute("src", "https://svgshare.com/i/SeQ.svg");
    image.replaceWith(tempImage);
    image.style.opacity = 0;

    dummyImage.onload = function() {
        tempImage.replaceWith(image);
        image.style.transition = "opacity 1s";
        image.setAttribute("src", src); 
        image.classList.remove("not-loaded");
        setTimeout(() => image.style.opacity = 1);
    }

    dummyImage.src = src;
}
export { handleShowImages }