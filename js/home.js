
document.addEventListener("DOMContentLoaded", () => {
    initHomeParallax();
    initAos();
});


function initHomeParallax() {
    const heroImage = document.querySelector(".hero-bg img");

    if (!heroImage) return;

    window.addEventListener("scroll", () => {
        const y = window.scrollY;

        heroImage.style.transform = `scale(1.04) translateY(${y * 0.035}px)`;
    }, { passive: true });
}


function initAos() {
    if (typeof AOS === "undefined") return;

    AOS.init({
        duration: 750,
        easing: "ease-out-cubic",
        once: true,
        offset: 80
    });
}