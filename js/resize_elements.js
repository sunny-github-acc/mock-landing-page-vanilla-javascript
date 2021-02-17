function hide(element) {
    element.classList.add("no-display");
}

function show(element) {
    element.classList.remove("no-display");
}

export { hide, show }