function handleBackButtonAnimation() {
    const button = document.body.querySelector(".back-button, .not-animated");
    
    if (button === null) return;
    if (!button.classList.contains("not-animated")) return;
    button.classList.remove("not-animated");

    let timeout = 1500;
    if (window.innerWidth > 1920) timeout = 0;

    setTimeout(() => {
        button.classList.remove("fixed");
        button.classList.add("sticky");
        button.style.top = "-1px";
    }, timeout + 100);

    let height = document.body.clientHeight - 80;
    let width = 30;

    animate({
        duration: timeout,
        timing: makeEaseOut(bounce),
        draw: function(progress) {
            button.style.top = height * progress + "px";
        }
    });

    animate({
        duration: timeout,
        timing: makeEaseOut(quad),
        draw: function(progress) {
            button.style.right = width * progress + "px"
        }
    });
}

function makeEaseOut(timing) {
    return function(timeFraction) {
    return 1 - timing(1 - timeFraction);
    }
}

function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2);
}

export { handleBackButtonAnimation }