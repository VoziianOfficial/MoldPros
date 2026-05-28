
document.addEventListener("DOMContentLoaded", () => {
    renderServicesGrid();
    initServicesSwiper();
});


function renderServicesGrid() {
    const container = document.querySelector("[data-services-grid]");
    if (!container || !window.SERVICES_DATA) return;

    container.innerHTML = window.SERVICES_DATA.map(service => {
        const isSwiper = container.classList.contains("swiper-wrapper") || Boolean(container.closest(".swiper"));
        return `
            ${isSwiper ? `<div class="swiper-slide">` : ``}
                <a href="${service.slug}" class="service-card reveal-up">
                    <img src="${service.image}" alt="${service.title}" loading="lazy" width="${service.imageWidth}" height="${service.imageHeight}">

                    <div class="service-card-content">
                        <div class="service-card-icon">
                            <i class="${service.icon}"></i>
                        </div>

                        <h3>${service.title}</h3>
                        <p>${service.short}</p>

                        <div class="service-card-arrow">
                            Explore
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </a>
            ${isSwiper ? `</div>` : ``}
        `;
    }).join("");

    requestAnimationFrame(() => {
        container.querySelectorAll(".reveal-up").forEach(card => card.classList.add("is-visible"));
    });
}


function initServicesSwiper() {
    const slider = document.querySelector(".servicesSwiper");

    if (!slider || typeof Swiper === "undefined") return;

    new Swiper(".servicesSwiper", {
        slidesPerView: 1,
        spaceBetween: 18,
        speed: 700,
        loop: true,
        grabCursor: true,

        pagination: {
            el: ".servicesSwiper .swiper-pagination",
            clickable: true
        },

        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1100: {
                slidesPerView: 3
            }
        }
    });
}

function initDecisionCards() {
    const wrapper = document.querySelector("[data-decision-cards]");
    if (!wrapper) return;

    const cards = wrapper.querySelectorAll(".decision-card");

    cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            cards.forEach((item) => item.classList.remove("is-active"));
            card.classList.add("is-active");
        });

        card.addEventListener("focus", () => {
            cards.forEach((item) => item.classList.remove("is-active"));
            card.classList.add("is-active");
        });
    });
}

document.addEventListener("DOMContentLoaded", initDecisionCards);
