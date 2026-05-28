
document.addEventListener("DOMContentLoaded", () => {
    if (!window.SITE_CONFIG) {
        console.error("SITE_CONFIG is not loaded. Check js/config.js");
        return;
    }

    applyGlobalData();
    renderServicesDropdowns();
    renderFooter();
    initMobileMenu();
    initHeaderDropdown();
    initStickyHeader();
    initCookieBanner();
    initForms();
    initRevealAnimations();
    initMetricCounters();
    initHomeProjectSwiper();
    initTextareaCounter();
    initAboutPathTabs();
    initAccordion();
});


function applyGlobalData() {
    const cfg = window.SITE_CONFIG;

    applyBranding(cfg);

    document.querySelectorAll("[data-company]").forEach((el) => {
        el.textContent = cfg.companyName;
    });

    document.querySelectorAll("[data-company-id]").forEach((el) => {
        el.textContent = cfg.companyId;
    });

    document.querySelectorAll("[data-address]").forEach((el) => {
        el.textContent = cfg.address.full;
    });

    document.querySelectorAll("[data-email]").forEach((el) => {
        el.textContent = cfg.email;
    });

    document.querySelectorAll("[data-email-link]").forEach((el) => {
        el.href = `mailto:${cfg.email}`;
    });

    document.querySelectorAll("[data-phone]").forEach((el) => {
        el.href = `tel:${cfg.phoneHref}`;


        el.textContent = cfg.phoneLabel;
    });

    document.querySelectorAll("[data-phone-number]").forEach((el) => {
        el.href = `tel:${cfg.phoneHref}`;
        el.textContent = cfg.phone;
    });

    document.querySelectorAll("[data-disclaimer]").forEach((el) => {
        el.textContent = cfg.disclaimer;
    });
}

function applyBranding(cfg) {
    const companyName = cfg?.companyName;

    const faviconHref = cfg?.branding?.faviconHref;
    if (faviconHref) {
        const iconLinks = document.querySelectorAll('link[rel="icon"]');
        iconLinks.forEach((link) => {
            link.href = faviconHref;
        });
    }

    if (companyName) {
        const logoLabel = `${companyName} home`;

        document.querySelectorAll(".logo").forEach((logo) => {
            const logoText = logo.querySelector(".logo-text");
            if (logoText) logoText.textContent = companyName;

            const currentLabel = logo.getAttribute("aria-label");
            if (currentLabel && currentLabel.toLowerCase().includes("home")) {
                logo.setAttribute("aria-label", logoLabel);
            }
        });
    }

    const logoImageSrc = cfg?.branding?.logo?.imageSrc;
    const logoAlt = cfg?.branding?.logo?.alt || companyName || "Logo";

    if (!logoImageSrc) return;

    document.querySelectorAll(".logo").forEach((logo) => {
        const logoIcon = logo.querySelector(".logo-icon");

        if (logoIcon && logoIcon.tagName.toLowerCase() === "svg") {
            const img = document.createElement("img");
            img.className = "logo-icon logo-image";
            img.src = logoImageSrc;
            img.alt = logoAlt;
            logoIcon.replaceWith(img);
        } else if (logoIcon && logoIcon.tagName.toLowerCase() === "img") {
            logoIcon.src = logoImageSrc;
            logoIcon.alt = logoAlt;
            logoIcon.classList.add("logo-image");
        }

        const mark = logo.querySelector(".logo-mark");
        if (mark) {
            mark.classList.add("has-image");
            mark.style.backgroundImage = `url("${logoImageSrc}")`;
            mark.style.backgroundSize = "cover";
            mark.style.backgroundPosition = "center";
            mark.style.backgroundRepeat = "no-repeat";
        }
    });
}


function renderServicesDropdowns() {
    if (!window.SERVICES_DATA) return;

    const dropdowns = document.querySelectorAll("[data-services-dropdown]");
    const mobileLists = document.querySelectorAll("[data-mobile-services-list]");

    dropdowns.forEach((dropdown) => {
        const servicesLinks = window.SERVICES_DATA.map((service) => {
            return `
                <a href="${service.slug}">
                    <i class="${service.icon}" aria-hidden="true"></i>
                    <span>${service.title}</span>
                </a>
            `;
        }).join("");

        dropdown.innerHTML = `
            <a class="services-dropdown-all" href="services.html">
                <i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>
                <span>All Services</span>
            </a>

            ${servicesLinks}
        `;
    });

    mobileLists.forEach((list) => {
        const servicesLinks = window.SERVICES_DATA.map((service) => {
            return `
                <a href="${service.slug}">
                    <span>${service.title}</span>
                    <i class="${service.icon}" aria-hidden="true"></i>
                </a>
            `;
        }).join("");

        list.innerHTML = `
            <a class="mobile-services-all" href="services.html">
                <span>All Services</span>
                <i class="fa-solid fa-table-cells-large" aria-hidden="true"></i>
            </a>

            ${servicesLinks}
        `;
    });
}


function renderFooter() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const cfg = window.SITE_CONFIG;

    footer.innerHTML = `
        <div class="footer-container">
            <div class="footer-top">
                <div class="footer-brand">
                    <a class="logo logo-premium-simple logo-mold-spore footer-logo" href="index.html" aria-label="${cfg.companyName} home">
                        <svg class="logo-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M33.2 5.8C38.1 5.8 40.1 10.2 39.1 14.2C38.5 16.7 39.3 19.1 41.5 20.3C43.6 21.5 46.1 20.5 47.7 18.6C50.8 14.8 56.5 16.6 57.3 21.5C57.8 24.7 55.9 27.2 53.3 28.2C50.6 29.3 49.5 31.9 50.8 34.4C52.1 36.8 55.1 37.2 57.5 38.6C61.4 40.8 61.6 46.9 57.4 49.4C54.4 51.2 51.2 50.2 49.1 47.8C47 45.5 43.9 45.6 42.2 48.2C40.8 50.4 41.5 53.4 40.4 55.9C38.5 60.4 32.2 60.9 29.7 56.7C28 53.8 28.8 50.7 31 48.5C32.8 46.7 32.4 43.7 29.9 42.7C26.9 41.5 24.8 43.9 22.4 46.2C19.5 49 14.4 48.6 12.1 45.1C9.5 41.1 11.8 36.8 15.8 35.6C18.7 34.7 20.4 32.7 19.7 30.2C19 27.7 16.4 27 13.8 26.5C9.2 25.6 7.4 20 10.7 16.7C13.4 14 17.2 14.6 19.5 17.2C21.2 19.1 23.9 19.7 25.8 18.1C27.9 16.3 27.2 13.7 27.7 11.2C28.2 8.2 30.2 5.8 33.2 5.8ZM37.6 25.1A3.8 3.8 0 1 0 37.6 32.7A3.8 3.8 0 1 0 37.6 25.1ZM28.3 36.8A2.4 2.4 0 1 0 28.3 41.6A2.4 2.4 0 1 0 28.3 36.8Z"
                                fill="#307D80"
                            />

                            <circle cx="23.5" cy="9.2" r="2.6" fill="#8CC0C0" />
                            <circle cx="50.7" cy="13.5" r="3.1" fill="#489C9E" />
                            <circle cx="8.6" cy="31.2" r="3.4" fill="#489C9E" />
                            <circle cx="53.7" cy="43.5" r="2.2" fill="#8CC0C0" />
                            <circle cx="25.6" cy="57.1" r="3.2" fill="#489C9E" />
                        </svg>

                        <span class="logo-text">${cfg.companyName}</span>
                    </a>

                    <p>${cfg.footerText}</p>
                </div>

                <nav class="footer-nav" aria-label="Footer navigation">
                    <h4>Navigation</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>

                <div class="footer-contact">
                    <h4>Contact</h4>
                    <div class="footer-contact-row">
                        <i class="fa-solid fa-phone" aria-hidden="true"></i>
                        <a href="tel:${cfg.phoneHref}">${cfg.phone}</a>
                    </div>

                    <div class="footer-contact-row">
                        <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                        <p>${cfg.address.full}</p>
                    </div>

                    <div class="footer-contact-row">
                        <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                        <a href="mailto:${cfg.email}">${cfg.email}</a>
                    </div>
                </div>

                <nav class="footer-legal" aria-label="Legal links">
                    <h4>Legal</h4>
                    <ul>
                        ${cfg.legalLinks.map((link) => `
                            <li><a href="${link.href}">${link.label}</a></li>
                        `).join("")}
                    </ul>
                </nav>
            </div>

            <div class="footer-bottom">
                <p>${cfg.serviceArea}</p>
                <p>${cfg.disclaimer}</p>
                <p>© ${new Date().getFullYear()} ${cfg.companyName} — ${cfg.companyId}</p>
            </div>
        </div>
    `;

    applyBranding(cfg);
}


function initMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    const body = document.body;

    if (!toggle || !menu) return;

    const closeMenu = () => {
        menu.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
        body.style.overflow = "";
    };

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");

        toggle.classList.toggle("is-active", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
        menu.setAttribute("aria-hidden", String(!isOpen));
        body.style.overflow = isOpen ? "hidden" : "";
    });

    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    const servicesToggle = menu.querySelector("[data-mobile-services-toggle]");
    const servicesList = menu.querySelector("[data-mobile-services-list]");

    if (servicesToggle && servicesList) {
        servicesToggle.addEventListener("click", () => {
            const isOpen = servicesList.classList.toggle("is-open");
            servicesToggle.setAttribute("aria-expanded", String(isOpen));
        });
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
        }
    });
}


function initHeaderDropdown() {
    const dropdown = document.querySelector(".nav-dropdown");
    const button = document.querySelector(".nav-dropdown-toggle");

    if (!dropdown || !button) return;

    button.addEventListener("click", (e) => {
        e.stopPropagation();

        const isOpen = dropdown.classList.toggle("is-open");
        button.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("is-open");
            button.setAttribute("aria-expanded", "false");
        }
    });
}


function initStickyHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateHeader = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}


function initCookieBanner() {
    const cfg = window.SITE_CONFIG;
    const storageKey = "moldpros_cookie_choice";

    if (localStorage.getItem(storageKey)) return;

    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Privacy preferences");

    banner.innerHTML = `
        <div class="cookie-content">
            <h4>${cfg.cookieBanner.title}</h4>
            <p>${cfg.cookieBanner.text}</p>

            <div class="cookie-actions">
                <button class="btn-accept" type="button">${cfg.cookieBanner.acceptText}</button>
                <button class="btn-decline" type="button">${cfg.cookieBanner.declineText}</button>
            </div>

            <div class="cookie-links">
                ${cfg.legalLinks.map((link) => `
                    <a href="${link.href}">${link.label}</a>
                `).join("")}
            </div>
        </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector(".btn-accept").addEventListener("click", () => {
        localStorage.setItem(storageKey, "accepted");
        banner.remove();
    });

    banner.querySelector(".btn-decline").addEventListener("click", () => {
        localStorage.setItem(storageKey, "declined");
        banner.remove();
    });
}


function initForms() {
    const forms = document.querySelectorAll("[data-lead-form]");
    const cfg = window.SITE_CONFIG;

    forms.forEach((form) => {
        const message = form.querySelector("[data-form-message]");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                showFormMessage(message, cfg.formMessages.error, "error");
                form.reportValidity();
                return;
            }

            form.reset();
            showFormMessage(message, cfg.formMessages.success, "success");
        });
    });
}

function showFormMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.className = `form-message ${type}`;

    window.setTimeout(() => {
        element.textContent = "";
        element.className = "form-message";
    }, 5000);
}


function initRevealAnimations() {
    document.documentElement.classList.add("reveal-ready");

    const elements = document.querySelectorAll(".reveal-up");

    if (!elements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16
        }
    );

    elements.forEach((el) => observer.observe(el));
}


function initMetricCounters() {
    const counters = document.querySelectorAll("[data-count-to]");

    if (!counters.length) return;

    const easeOutQuart = (value) => {
        return 1 - Math.pow(1 - value, 4);
    };

    const formatNumber = (value, suffix) => {
        return `${Math.round(value)}${suffix}`;
    };

    const animateCounter = (counter) => {
        if (counter.dataset.counted === "true") return;

        counter.dataset.counted = "true";

        const target = Number(counter.dataset.countTo || 0);
        const suffix = counter.dataset.countSuffix || "";
        const duration = 1800;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);

            let currentValue = target * easedProgress;

            if (progress < 0.45 && target > 5) {
                const softNoise = Math.sin(progress * 22) * target * 0.025;
                currentValue += softNoise;
            }

            currentValue = Math.min(Math.max(currentValue, 0), target);

            counter.textContent = formatNumber(currentValue, suffix);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.textContent = `${target}${suffix}`;
            }
        };

        requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.35
        }
    );

    counters.forEach((counter) => observer.observe(counter));
}


function initHomeProjectSwiper() {
    const slider = document.querySelector(".homeProjectSwiper");

    if (!slider || typeof Swiper === "undefined") return;

    if (slider.dataset.swiperInitialized === "true") return;
    slider.dataset.swiperInitialized = "true";

    new Swiper(slider, {
        slidesPerView: 1,
        speed: 900,
        loop: true,
        grabCursor: true,
        effect: "slide",
        autoplay: {
            delay: 5200,
            disableOnInteraction: false
        },
        pagination: {
            el: ".home-slider-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".home-slider-next",
            prevEl: ".home-slider-prev"
        }
    });
}


function initTextareaCounter() {
    const textarea = document.querySelector(".home-contact-field-wide textarea");
    const counter = document.querySelector(".home-contact-field-wide small");

    if (!textarea || !counter) return;

    const max = textarea.getAttribute("maxlength") || 500;

    const updateCounter = () => {
        counter.textContent = `${textarea.value.length}/${max}`;
    };

    updateCounter();
    textarea.addEventListener("input", updateCounter);
}


function initAboutPathTabs() {
    const tabs = document.querySelectorAll(".about-path-tab");
    const title = document.querySelector("#pathTitle");
    const text = document.querySelector("#pathText");
    const meta = document.querySelector("#pathMeta");
    const number = document.querySelector("#pathNumber");
    const image = document.querySelector("#pathImage");

    if (!tabs.length || !title || !text || !meta || !number) return;

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((item) => item.classList.remove("is-active"));
            tab.classList.add("is-active");

            title.textContent = tab.dataset.title || "";
            text.textContent = tab.dataset.text || "";
            meta.textContent = tab.dataset.meta || "";
            number.textContent = tab.dataset.number || "";

            if (image && tab.dataset.image) {
                image.style.opacity = "0";

                setTimeout(() => {
                    image.src = tab.dataset.image;
                    image.style.opacity = "1";
                }, 200);
            }
        });
    });
}


function initAccordion() {
    const items = document.querySelectorAll(".accordion-item");

    if (!items.length) return;

    items.forEach((item) => {
        const header = item.querySelector(".accordion-header");

        if (!header) return;

        header.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            items.forEach((i) => i.classList.remove("active"));

            if (!isOpen) {
                item.classList.add("active");
            }
        });
    });
}
