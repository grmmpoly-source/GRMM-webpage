// header
class THeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <img class="logo" src="img/grmm-logo.jpg" />
            <img src="img/line-columns-svgrepo-com.svg" class="ham" />
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
                <a class="btn" href="#">Get a Quote</a>
            </nav>
        </header>
        `;
    }
}
customElements.define('t-header', THeader);

// section
class TSection extends HTMLElement {
    connectedCallback() {
        const selector = this.getAttribute('selector');
        const heading = this.getAttribute('heading');
        const details = this.getAttribute('details');
        const link = this.getAttribute('link');
        const linkText = this.getAttribute('link-text');
        const img = this.getAttribute('img');
        this.innerHTML = `<section class="${selector}">
            <div class="primary">
                <h2>${heading}</h2>
                <p>
                    ${details}
                </p>
                <a class="btn" href="${link}">${linkText}</a>
            </div>
            <img src="${img}" />
        </section>`;
    }
}
customElements.define('t-section', TSection);

// main section
class TMainSection extends HTMLElement {
    connectedCallback() {
        const heading = this.getAttribute('heading');
        const details = this.getAttribute('details');
        this.innerHTML = `
        <div class="main-section">
            <h2>${heading}</h2>
            <p>
                ${details}
            </p>
        </div>`;
    }
}
customElements.define('t-main-section', TMainSection);

// CTA
class TCTA extends HTMLElement {
    connectedCallback() {
        const heading = this.getAttribute('heading');
        const details = this.getAttribute('details');
        const link = this.getAttribute('link');
        const linkText = this.getAttribute('link-text');
        this.innerHTML = `
        <section class="center padding6">
            <h2>${heading}</h2>
            <p>
                ${details}
            </p>
            <a href="${link}" class="btn">${linkText}</a>
        </section>`;
    }
}
customElements.define('t-cta', TCTA);

// footer
class TFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer>
        <div class="footer">
        <div class="footer-upper">
            <div class="footer-left">
                <img class="logo" src="img/logo-exception-noir.png"/>
                <img class="logo" src="img/grmm-logo.jpg"/>
            </div>
            <div class="footer-right">
                <img src="img/icons8-github.svg" class="social-media"/>
                <img src="img/email-svgrepo-com.svg"  class="social-media" />
            </div>
        </div>
        <div class="footer-bottom">
            <p>
                © 2024 Geomechanics & Rock Mass Modeling Research Group (GRMM). All rights reserved.
            </p>
            </div>     
        </div>
    </footer>`;
    }
}
customElements.define('t-footer', TFooter);

// hamburger
const ham = document.querySelector(".ham");
const nav = document.querySelector("nav");
ham.addEventListener("click", toggle);
nav.addEventListener("click", toggle);
function toggle() {
  ham.src = ham.src.includes("img/close-bold-svgrepo-com.svg")
    ? "img/line-columns-svgrepo-com.svg"
    : "img/close-bold-svgrepo-com.svg";
  nav.classList.toggle("show");
}