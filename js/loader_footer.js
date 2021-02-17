let footer = document.body.querySelector("footer");

const loadFooter = () => {
    return `
        <section class="footer">
            <div class="flex-footer">
                <div>
                    <div class="title"><a href="#">spintos laboratorija</a></div>
                    <h4>Rankų darbo jaukumas šiuolaikiniame mados pasaulyje</h4>
                    <ul class="fabs">
                        <li><a href="https://www.facebook.com" target="_blank"><i class="fab fa-facebook-f"></i></a></li>
                        <li><a href="https://www.twitter.com" target="_blank"><i class="fab fa-twitter"></i></a></li>
                        <li><a href="https://www.instagram.com" target="_blank"><i class="fab fa-instagram"></i></a></li>
                        <li><a href="https://www.gmail.com" target="_blank"><i class="fab fa-google"></i></a></li>
                    </ul>
                </div>
                <div class="flex-footer-item">
                    <div class="flex-footer-item-title">
                        <a href="#" onclick="return false;">
                            Daugiau iš spintos laboratorijos
                            <span class="up" hidden><i class="fas fa-caret-up" style="padding-left: 10px"></i></span>
                            <span class="down" hidden><i class="fas fa-caret-down" style="padding-left: 10px"></i></span>
                        </a>
                    </div>
                    <ur class="flex-footer-item-list">
                        <li><a href="#">Naujienlaiškis</a></li>
                        <li><a href="#">Susisiekite</a></li>
                        <li><a href="#">Apie spintos laboratoriją</a></li>
                        <li><a href="#">Bendradarbiaukime</a></li>
                    </ur>
                </div>
                <div class="flex-footer-item">
                    <div class="flex-footer-item-title">
                        <a href="#" onclick="return false;">
                            Visos skiltys
                            <span class="up" hidden><i class="fas fa-caret-up" style="padding-left: 10px"></i></span>
                            <span class="down" hidden><i class="fas fa-caret-down" style="padding-left: 10px"></i></span>
                        </a>
                    </div>
                    <ur class="flex-footer-item-list">
                        <li><a href="/pages/stilius.html">Stilius</a></li>
                        <li><a href="/pages/kultura.html">Kultūra</a></li>
                        <li><a href="/pages/spinta.html">Spinta</a></li>
                        <li><a href="/pages/dovanu_idejos.html">Dovanų idėjos</a></li>
                    </ur>
                </div>
                <div class="flex-footer-misc">
                    <div>
                        <a href="https://www.pexels.com">Photos provided by Pexels</a>
                    </div>
                    <span>© 2021 sunnyKK. Visos teisės saugomos.</span> 
                </div>
            </div>
        </section>`
}

footer.innerHTML = loadFooter();