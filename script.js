// header
class THeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <header>
            <img class="logo" src="img/grmm-logo.jpg" />
            <img src="img/line-columns-svgrepo-com.svg" class="ham" />
            <nav>
                <a href="index.html">Home</a>
                <a href="index.html">About GRMM</a>
                <a href="#">Research</a>
                <a href="members.html">Members</a>
                <a href="publications.html">Publications</a>
                <a href="#">Teaching</a>
            </nav>
        </header>
        `;
    }
}

// <a class="btn" href="#">Get a Quote</a>

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

        const showButton = this.hasAttribute('show-button');
        const showImage = this.hasAttribute('show-image');

        const buttonHTML = showButton && link && linkText
            ? `<a class="btn" href="${link}">${linkText}</a>`
            : '';

        const imageHTML = showImage && img
            ? `<img src="${img}" alt="">`
            : '';

        this.innerHTML = `<section class="${selector}">
            <div class="primary">
                <h2>${heading}</h2>
                <p>
                    ${details}
                </p>
                ${buttonHTML}
            </div>
            ${imageHTML}
        </section>`;
    }
}
customElements.define('t-section', TSection);

// section members
class TMember extends HTMLElement {
    connectedCallback() {
        const heading = this.getAttribute('heading');
        const details = this.getAttribute('details');

        const align = this.getAttribute('align'); // "right" | null
        const bg = this.getAttribute('bg');         // "dark" | "light"

        const isRight = align === 'right';
        const islight = bg === 'light';

         // Parse buttons JSON safely
        let buttons = [];
        const buttonsAttr = this.getAttribute('buttons');
        if (buttonsAttr) {
        try {
            const parsed = JSON.parse(buttonsAttr);
            if (Array.isArray(parsed)) buttons = parsed;
        } catch (e) {
            console.warn('Invalid buttons JSON on <t-member>:', e);
        }
        }
        
        const buttonsHTML = buttons.length
      ? `
        <div class="social-buttons">
          ${buttons
            .filter(b => b && b.href && b.img)
            .map(
              b => `
                <a href="${b.href}" target="_blank" rel="noopener noreferrer" class="icon-link">
                  <img src="${b.img}" class="social-media" alt="${b.alt || ''}">
                </a>
              `
            )
            .join('')}
        </div>
      `
      : '';

        this.innerHTML = `
            <div class="member-section 
            ${isRight ? 'align-right' : ''}
            ${islight ? 'bg-light' : 'bg'}">
            
                <h2>${heading}</h2>
                <p>
                    ${details}
                </p>
                ${buttonsHTML}
            </div>`;
    }
}
customElements.define('t-member', TMember);

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

        const showButton = this.hasAttribute('show-button');
        const showImage = this.hasAttribute('show-image');

        const buttonHTML = showButton && link && linkText
            ? `<a class="btn" href="${link}">${linkText}</a>`
            : '';

        const imageHTML = showImage && img
            ? `<img src="${img}" alt="">`
            : '';

        this.innerHTML = `
        <section class="center padding6">
            <h2>${heading}</h2>
            <p>
                ${details}
            </p>
            ${buttonHTML}
        </div>
            ${imageHTML}
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