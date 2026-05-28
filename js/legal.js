
document.addEventListener("DOMContentLoaded", () => {
    initLegalActiveState();
    initLegalProgress();
});


function initLegalActiveState() {
    const page = document.documentElement.dataset.legalPage;
    const links = document.querySelectorAll(".legal-sidebar a");

    if (!page || !links.length) return;

    links.forEach(link => {
        const href = link.getAttribute("href");

        link.classList.remove("is-active");

        if (
            (page === "privacy" && href.includes("privacy")) ||
            (page === "cookie" && href.includes("cookie")) ||
            (page === "terms" && href.includes("terms"))
        ) {
            link.classList.add("is-active");
        }
    });
}


function initLegalProgress() {
    const article = document.querySelector(".legal-article");
    if (!article) return;

    const progress = document.createElement("div");
    progress.className = "legal-progress";
    document.body.appendChild(progress);

    const updateProgress = () => {
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight - window.innerHeight;
        const scrolled = window.scrollY - articleTop;

        const percent = Math.min(Math.max(scrolled / articleHeight, 0), 1);
        progress.style.transform = `scaleX(${percent})`;
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
}