// ===================================================
// Zensical Extra JS - extra.js
// Purpose: Smooth scroll animations, mermaid fade-in, metrics dropdown
// ===================================================

document.addEventListener('DOMContentLoaded', () => {

    // ====== Elements to animate ======
    const sections = document.querySelectorAll('.section');
    const mermaids = document.querySelectorAll('pre.mermaid');

    // ====== Intersection Observer ======
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // add class for CSS transitions
                obs.unobserve(entry.target); // stop observing after first reveal
            }
        });
    }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

    // Observe all sections and apply fallback for those already visible
    sections.forEach(sec => {
        observer.observe(sec);
        if (sec.getBoundingClientRect().top < window.innerHeight) {
            sec.classList.add('visible');
        }
    });

    // Observe Mermaid diagrams and apply fallback
    mermaids.forEach(m => {
        observer.observe(m);
        if (m.getBoundingClientRect().top < window.innerHeight) {
            m.classList.add('visible');
        }
    });

    // ====== Optional: Dropdown arrows rotate smoothly (for accessibility) ======
    const toggles = document.querySelectorAll('.metric-toggle input');
    toggles.forEach(input => {
        const title = input.nextElementSibling;
        input.addEventListener('change', () => {
            // Optional: highlight open card
            if (input.checked) {
                title.parentElement.style.background = "#e2f0ff"; // subtle blue when open
            } else {
                title.parentElement.style.background = ""; // revert to default
            }
        });
    });

});

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible"); // trigger CSS animation
                observer.unobserve(entry.target); // animate only once
            }
        });
    }, { threshold: 0.1 }); // trigger when 10% visible

    cards.forEach(card => observer.observe(card));
});

document$.subscribe(function() {
    const cards = document.querySelectorAll('.section-card');

    cards.forEach(card => {
        card.classList.add('visible');
    });
});