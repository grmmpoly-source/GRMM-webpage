// Shared GRMM components

class THeader extends HTMLElement {
  connectedCallback() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    const pages = [
      ["index.html", "Home"],
      ["research.html", "Research"],
      ["members.html", "Members"],
      ["publications.html", "Publications"],
      ["teaching.html", "Teaching"]
    ];

    const links = pages
      .map(
        ([href, label]) =>
          `<a href="${href}"${
            href === currentPage
              ? ' class="active" aria-current="page"'
              : ""
          }>${label}</a>`
      )
      .join("");

    this.innerHTML = `
      <header>
        <a class="brand" href="index.html" aria-label="GRMM home">
          <img
            class="logo"
            src="img/grmm-logo.png"
            alt="GRMM Research Group logo"
          >
        </a>

        <button
          class="ham"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
        >
          <img
            src="img/line-columns-svgrepo-com.svg"
            alt=""
            aria-hidden="true"
          >
        </button>

        <nav aria-label="Primary navigation">
            ${links}

            <button
            class="theme-toggle"
            type="button"
            aria-label="Switch to light mode"
            title="Switch theme"
            >
                ☀
            </button>
        </nav>
      </header>
    `;

    const button = this.querySelector(".ham");
    const icon = button.querySelector("img");
    const nav = this.querySelector("nav");

    const themeToggle = this.querySelector(".theme-toggle");

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
    document.body.classList.add("light");
    }

    const updateThemeButton = () => {
    const isLight = document.body.classList.contains("light");

    themeToggle.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );
    };

    updateThemeButton();

    themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

    updateThemeButton();
    });

    const closeMenu = () => {
      nav.classList.remove("show");

      button.setAttribute("aria-expanded", "false");
      button.setAttribute(
        "aria-label",
        "Open navigation menu"
      );

      icon.src = "img/line-columns-svgrepo-com.svg";
    };

    button.addEventListener("click", () => {
      const open = nav.classList.toggle("show");

      button.setAttribute(
        "aria-expanded",
        String(open)
      );

      button.setAttribute(
        "aria-label",
        open
          ? "Close navigation menu"
          : "Open navigation menu"
      );

      icon.src = open
        ? "img/close-bold-svgrepo-com.svg"
        : "img/line-columns-svgrepo-com.svg";
    });

    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }
}

customElements.define("t-header", THeader);


// ======================================================
// STANDARD SECTION
// ======================================================

class TSection extends HTMLElement {
  connectedCallback() {

    const selector =
      this.getAttribute("selector") || "";

    const heading =
      this.getAttribute("heading") || "";

    const details =
      this.getAttribute("details") || "";

    const link =
      this.getAttribute("link");

    const linkText =
      this.getAttribute("link-text");

    const img =
      this.getAttribute("img");

    // Check if the section should be reversed
    const reverse =
      this.hasAttribute("reverse");

    // Add "reverse" to the section classes when requested
    const sectionClasses = `
      ${selector}
      ${reverse ? "reverse" : ""}
    `;


    // -----------------------------
    // Button
    // -----------------------------

    const buttonHTML =
      this.hasAttribute("show-button") &&
      link &&
      linkText
        ? `
          <a class="btn" href="${link}">
            ${linkText}
          </a>
        `
        : "";


    // -----------------------------
    // Image
    // -----------------------------

    const imageHTML =
      this.hasAttribute("show-image") &&
      img
        ? `
          <img
            src="${img}"
            alt="${heading}"
            loading="lazy"
          >
        `
        : "";


    // -----------------------------
    // Render section
    // -----------------------------

    this.innerHTML = `
      <section class="${sectionClasses}">

        <div class="primary">

          <h2>
            ${heading}
          </h2>

          <div class="section-details">
            ${details}
          </div>

          ${buttonHTML}

        </div>

        ${imageHTML}

      </section>
    `;
  }
}

customElements.define(
  "t-section",
  TSection
);


// ======================================================
// MEMBER / CONTENT SECTION
// ======================================================

class TMember extends HTMLElement {
  connectedCallback() {
    const heading =
      this.getAttribute("heading");

    const details =
      this.getAttribute("details") || "";

    const align =
      this.getAttribute("align");

    const bg =
      this.getAttribute("bg");

    const profileImg =
      this.getAttribute("profile-img");

    const photoClass =
      this.getAttribute("class-member-photo") ||
      "member-photo";

    const profileAlt =
      this.getAttribute("profile-alt") ||
      heading ||
      "Profile photo";

    const profilePosition =
      this.getAttribute("profile-position") ||
      "right";

    const headingLayout =
      this.getAttribute("heading-layout") ||
      "normal";

    const isPublication =
      this.hasAttribute("publication");


    // --------------------------------------------------
    // Parse social/link buttons
    // --------------------------------------------------

    let buttons = [];

    const rawButtons =
      this.getAttribute("buttons");

    if (rawButtons) {
      try {
        const parsed = JSON.parse(rawButtons);

        if (Array.isArray(parsed)) {
          buttons = parsed;
        }
      } catch (error) {
        console.warn(
          "Invalid buttons JSON on <t-member>:",
          error
        );
      }
    }


    // --------------------------------------------------
    // Generate icons
    // --------------------------------------------------

    const icons = buttons
      .filter(
        (b) =>
          b &&
          b.href &&
          b.img
      )
      .map(
        (b) => `
          <a
            href="${b.href}"
            target="_blank"
            rel="noopener noreferrer"
            class="icon-link"
            aria-label="${b.alt || "External link"}"
          >
            <img
              src="${b.img}"
              class="social-media"
              alt=""
              aria-hidden="true"
            >
          </a>
        `
      )
      .join("");


    const socialHTML = icons
      ? `
        <div class="social-buttons">
          ${icons}
        </div>
      `
      : "";


    // --------------------------------------------------
    // Heading
    // --------------------------------------------------

    let headingHTML = "";

    if (heading) {
      headingHTML =
        headingLayout === "aside" && icons
          ? `
            <div class="member-heading-row">

              <h2>
                ${heading}
              </h2>

              <div
                class="social-buttons heading-buttons"
              >
                ${icons}
              </div>

            </div>
          `
          : `
            <h2>
              ${heading}
            </h2>
          `;
    }


    // --------------------------------------------------
    // Profile / research image
    // --------------------------------------------------

    const photoHTML = profileImg
      ? `
        <div
          class="${photoClass}
          member-photo-${profilePosition}"
        >
          <img
            src="${profileImg}"
            alt="${profileAlt}"
            loading="lazy"
          >
        </div>
      `
      : "";


    // --------------------------------------------------
    // Render member section
    // --------------------------------------------------

    this.innerHTML = `
      <section
        class="
          member-section
          ${
            align === "right"
              ? "align-right"
              : "align-left"
          }
          ${
            bg === "light"
              ? "bg-light"
              : "bg"
          }
          ${
            isPublication 
            ? "publication-card" 
            : ""}
        "
      >

        ${
          profilePosition === "left"
            ? photoHTML
            : ""
        }

        <div class="member-content">

          ${headingHTML}

          <div class="member-details">
            ${details}
          </div>

          ${
            headingLayout !== "aside"
              ? socialHTML
              : ""
          }

        </div>

        ${
          profilePosition === "right"
            ? photoHTML
            : ""
        }

      </section>
    `;
  }
}

customElements.define("t-member", TMember);


// ======================================================
// MAIN SECTION
// ======================================================

class TMainSection extends HTMLElement {
  connectedCallback() {
    const heading =
      this.getAttribute("heading") || "";

    const details =
      this.getAttribute("details") || "";

    const link =
      this.getAttribute("link");

    const linkText =
      this.getAttribute("link-text");

    const buttonHTML =
      this.hasAttribute("show-button") &&
      link &&
      linkText
        ? `
          <a class="btn" href="${link}">
            ${linkText}
          </a>
        `
        : "";

    this.innerHTML = `
      <section class="main-section">

        <h2>
          ${heading}
        </h2>

        <p>
          ${details}
        </p>

        ${buttonHTML}

      </section>
    `;
  }
}

customElements.define(
  "t-main-section",
  TMainSection
);


// ======================================================
// CALL TO ACTION
// ======================================================

class TCTA extends HTMLElement {
  connectedCallback() {
    const heading =
      this.getAttribute("heading") || "";

    const details =
      this.getAttribute("details") || "";

    const link =
      this.getAttribute("link");

    const linkText =
      this.getAttribute("link-text");


    const buttonHTML =
      this.hasAttribute("show-button") &&
      link &&
      linkText
        ? `
          <a
            class="btn"
            href="${link}"
          >
            ${linkText}
          </a>
        `
        : "";


    this.innerHTML = `
      <section
        class="center padding6 cta-section"
      >

        <h2>
          ${heading}
        </h2>

        <p>
          ${details}
        </p>

        ${buttonHTML}

      </section>
    `;
  }
}

customElements.define(
  "t-cta",
  TCTA
);


// ======================================================
// FOOTER
// ======================================================

class TFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer id="contact">

        <div class="footer">

          <div class="footer-upper">

            <div class="footer-left">

              <img
                class="logo"
                src="img/logo-exception-noir.png"
                alt="Polytechnique Montréal logo"
              >

              <img
                class="logo"
                src="img/grmm-logo.png"
                alt="GRMM Research Group logo"
              >

            </div>


            <div
              class="footer-right"
              aria-label="Contact links"
            >

              <a
                href="https://github.com/grmmpoly"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GRMM GitHub repository"
              >
                <img
                  src="img/icons8-github.svg"
                  class="social-media"
                  alt=""
                  aria-hidden="true"
                >
              </a>


              <a
                href="mailto:grmmpoly@gmail.com"
                aria-label="Email GRMM"
              >
                <img
                  src="img/email-svgrepo-com.svg"
                  class="social-media"
                  alt=""
                  aria-hidden="true"
                >
              </a>

            </div>

          </div>


          <div class="footer-bottom">

            <p>
              © 2026 Geomechanics & Rock Mass Modeling
              Research Group (GRMM).
              All rights reserved.
            </p>

          </div>

        </div>

      </footer>
    `;
  }
}

customElements.define(
  "t-footer",
  TFooter
);