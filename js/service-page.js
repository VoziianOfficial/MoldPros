const SERVICE_PAGE_COPY = {
    "mold-inspection-testing": {
        extraTitle: "Inspection details worth comparing.",
        extraLead:
            "Use the first conversation to understand the inspection process, moisture review, sampling options, report format, timing, and what the provider includes in the written scope.",
        panelTitle: "Ask before inspection",
        panelCopy:
            "A clear mold inspection estimate should explain whether visual review, moisture readings, air samples, surface samples, lab analysis, photos, or written findings are included.",
        stats: [
            ["Moisture", "Ask how leaks, humidity, odors, staining, or water history are reviewed."],
            ["Testing", "Compare air samples, surface samples, lab analysis, and reporting details."],
            ["Access", "Confirm attic, crawl space, basement, wall, or bathroom access needs."],
            ["Report", "Review written findings, photos, limitations, and next-step guidance."]
        ]
    },

    "mold-remediation": {
        extraTitle: "Remediation scope that changes the outcome.",
        extraLead:
            "Mold remediation projects may involve containment, affected material review, disposal, cleaning methods, moisture source questions, repair coordination, and post-remediation expectations.",
        panelTitle: "Ask before remediation",
        panelCopy:
            "Compare how each provider explains containment, affected areas, cleanup boundaries, equipment, disposal, exclusions, warranty terms, and what may change the final price.",
        stats: [
            ["Containment", "Ask how the affected area is isolated and surrounding spaces are protected."],
            ["Materials", "Compare how drywall, wood, insulation, cabinets, or flooring are handled."],
            ["Moisture", "Confirm whether leak, humidity, ventilation, or source-control questions are included."],
            ["Scope", "Review written estimates, exclusions, timeline, cleanup, and warranty details."]
        ]
    },

    "black-mold-removal": {
        extraTitle: "Black mold concerns need careful provider comparison.",
        extraLead:
            "Suspected black mold requests may involve dark staining, recurring moisture, testing questions, containment, material handling, disposal, and written cleanup scope.",
        panelTitle: "Ask before black mold removal",
        panelCopy:
            "Use the first provider conversation to understand how the concern is assessed, whether testing is recommended, how containment is handled, and what cleanup steps are included.",
        stats: [
            ["Assessment", "Ask how suspected black mold is visually reviewed or tested."],
            ["Containment", "Compare how work areas are separated and surrounding spaces are protected."],
            ["Materials", "Review what may be cleaned, removed, disposed of, or excluded."],
            ["Health", "Do not rely on provider matching content as medical advice or a health guarantee."]
        ]
    },

    "attic-crawl-space-mold": {
        extraTitle: "Hidden-area mold needs sharper access and moisture context.",
        extraLead:
            "Attic and crawl space mold cleanup can involve ventilation, roof leak history, humidity, insulation, wood sheathing, vapor issues, drainage, and difficult-access conditions.",
        panelTitle: "Ask before hidden-area cleanup",
        panelCopy:
            "Compare providers by how they explain access, safety, containment, affected materials, moisture source, insulation handling, cleanup boundaries, and follow-up recommendations.",
        stats: [
            ["Access", "Clarify attic, crawl space, basement, or tight-area entry conditions."],
            ["Moisture", "Ask about roof leaks, humidity, ventilation, vapor, drainage, or plumbing issues."],
            ["Materials", "Review insulation, wood, sheathing, joists, debris, and disposal handling."],
            ["Safety", "Confirm protective equipment, containment, cleanup scope, and exclusions."]
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    renderServicePage();
    initServiceParallax();
});

function renderServicePage() {
    const serviceId = document.documentElement.dataset.serviceId;

    if (!serviceId) return;

    const service = window.SERVICES_DATA?.find((item) => item.id === serviceId);
    const copy = SERVICE_PAGE_COPY[serviceId];

    if (service) {
        updateContactLinks(service);
        renderServiceFeaturesOnlyIfEmpty(service);
    }

    if (copy) {
        renderServiceSpecificCopyOnlyIfEmpty(copy);
    }
}

function updateTextOnlyIfEmpty(selector, text) {
    document.querySelectorAll(selector).forEach((el) => {
        if (!el.textContent.trim()) {
            el.textContent = text;
        }
    });
}

function updateContactLinks(service) {
    document.querySelectorAll("[data-service-contact-link]").forEach((link) => {
        link.href = `contact.html?service=${service.id}`;
    });
}

function renderServiceFeaturesOnlyIfEmpty(service) {
    const container = document.querySelector("[data-service-features]");

    if (!container) return;
    if (container.children.length > 0) return;
    if (!service.features || !service.features.length) return;

    container.innerHTML = service.features.map((feature) => {
        return `
            <div class="service-feature">
                <i class="fa-solid fa-check" aria-hidden="true"></i>
                <span>${feature}</span>
            </div>
        `;
    }).join("");
}

function renderServiceSpecificCopyOnlyIfEmpty(copy) {
    updateTextOnlyIfEmpty("[data-service-extra-title]", copy.extraTitle);
    updateTextOnlyIfEmpty("[data-service-extra-lead]", copy.extraLead);
    updateTextOnlyIfEmpty("[data-service-panel-title]", copy.panelTitle);
    updateTextOnlyIfEmpty("[data-service-panel-copy]", copy.panelCopy);

    const statSelectors = [
        ["[data-hero-stat-one]", "[data-hero-stat-one-text]"],
        ["[data-hero-stat-two]", "[data-hero-stat-two-text]"],
        ["[data-hero-stat-three]", "[data-hero-stat-three-text]"],
        ["[data-hero-stat-four]", "[data-hero-stat-four-text]"]
    ];

    statSelectors.forEach(([titleSelector, textSelector], index) => {
        const item = copy.stats[index];

        if (!item) return;

        updateTextOnlyIfEmpty(titleSelector, item[0]);
        updateTextOnlyIfEmpty(textSelector, item[1]);
    });
}

function initServiceParallax() {
    const heroImage = document.querySelector(".service-hero-bg img");

    if (!heroImage) return;

    window.addEventListener("scroll", () => {
        heroImage.style.transform = `scale(1.06) translateY(${window.scrollY * 0.07}px)`;
    }, { passive: true });
}