function handleToggleFooterItems(e) {
    let element = e.target.closest("a");

    if (element === null || element.closest(".flex-footer-item-title") === null || window.innerWidth > 768) return;
    
    let up = element.querySelector(".up"),
        down = element.querySelector(".down"),
        list = element.parentNode.parentNode.querySelector(".flex-footer-item-list");
    
    up.hidden = !up.hidden;
    down.hidden = !down.hidden;
    list.hidden = !list.hidden;

    window.scrollBy(0, 100);
}

export { handleToggleFooterItems }