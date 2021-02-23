let section = document.body.querySelector(".offer");

const loadOffer = () => {
    return `<div class="border-title offer-container">
                <p>Gaukite <strong>10%</strong> nuolaidą mūsų rankų darbo gaminiams </p>
                <div class="offer-btn">
                    <a href="naujienlaiskis.html"><span class="btn"><strong>UŽSISAKYTI</strong></span></a>
                </div>
            </div>`
}

if (section) section.innerHTML = loadOffer();