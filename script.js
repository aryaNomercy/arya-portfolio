
// ===================================
// ARYA PERSONAL WEBSITE V2
// JAVASCRIPT
// ===================================

console.log("ARYA Portfolio V2 berhasil dijalankan!");

// 1. PAGE LOADER

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hidden");
    }, 500);
});

// 2. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.classList.toggle("open", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );
});

// Tutup menu setelah link diklik

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Tutup menu jika klik di luar navbar

document.addEventListener("click", event => {
    if (
        !event.target.closest(".navbar") &&
        navLinks.classList.contains("show")
    ) {
        navLinks.classList.remove("show");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }
});

// 3. SCROLL REVEAL ANIMATION

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});

// 4. ACTIVE NAVIGATION

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navigationLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    );
                });
            }
        });
    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// 5. HEADER SCROLL EFFECT

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(7, 11, 20, 0.96)";
    } else {
        header.style.background = "rgba(7, 11, 20, 0.85)";
    }
}, { passive: true });

// 6. FOOTER YEAR

const footerText = document.querySelector(".footer p");

if (footerText) {
    footerText.textContent =
        `© ${new Date().getFullYear()} ARYA. Built with creativity.`;
}

// 7. WELCOME MESSAGE

console.log("--------------------------------");
console.log("WELCOME TO ARYA PORTFOLIO");
console.log("Digital Creator | Creative Mind");
console.log("--------------------------------");