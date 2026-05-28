
document.addEventListener("DOMContentLoaded", () => {
    initAboutParallax();
    initAboutHoverEffects();
    initAboutCounters();
});


function initAboutParallax() {
    const heroImage = document.querySelector(".about-hero-visual img");
    const valuesImage = document.querySelector(".values-image img");

    if (!heroImage && !valuesImage) return;

    window.addEventListener("scroll", () => {
        const y = window.scrollY;

        if (heroImage) {
            heroImage.style.transform = `scale(1.04) translateY(${y * 0.05}px)`;
        }

        if (valuesImage) {
            valuesImage.style.transform = `scale(1.03) translateY(${y * 0.04}px)`;
        }
    }, { passive: true });
}


function initAboutHoverEffects() {
    const cards = document.querySelectorAll(".model-card, .values-list div");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `
                perspective(700px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-6px)
            `;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });
}


function initAboutCounters() {
    const counters = document.querySelectorAll("[data-counter]");

    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.dataset.counter, 10);
            let current = 0;

            const step = Math.ceil(target / 60);

            const interval = setInterval(() => {
                current += step;

                if (current >= target) {
                    el.textContent = target;
                    clearInterval(interval);
                } else {
                    el.textContent = current;
                }
            }, 20);

            observer.unobserve(el);
        });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
}