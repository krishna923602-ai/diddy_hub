/* =========================================================
   KRISHNANAND YADAV / KRISHNAVFX
   PREMIUM PORTFOLIO - MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initMobileMenu();
    initSmoothNavigation();
    initActiveNavigation();
    initScrollReveal();
    initHeaderScroll();
    initRoleAnimation();
    initProfileTilt();
    initGallery();
    initImageFallback();
    initRippleEffect();
    initScrollTop();
    initContactButtons();
    initProjectButtons();
    initKeyboardControls();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initLoader() {

    const loader = document.querySelector(".page-loader");

    if (!loader) return;

    const hideLoader = () => {

        setTimeout(() => {
            loader.classList.add("loaded");
        }, 700);

    };

    if (document.readyState === "complete") {

        hideLoader();

    } else {

        window.addEventListener("load", hideLoader, {
            once: true
        });

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) return;


    menuToggle.addEventListener("click", () => {

        const isOpen = navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });


    document.addEventListener("click", event => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

}


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

function initSmoothNavigation() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (
                !href ||
                href === "#" ||
                href === "#!"
            ) {
                return;
            }


            const target = document.querySelector(href);

            if (!target) return;


            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            history.replaceState(
                null,
                "",
                href
            );

        });

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-link"
    );

    if (!sections.length || !navLinks.length) {
        return;
    }


    const updateActiveNav = () => {

        const scrollPosition =
            window.scrollY + 180;


        let currentSection = "";


        sections.forEach(section => {

            const top = section.offsetTop;

            const height = section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!revealElements.length) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(".site-header");

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();

}


/* =========================================================
   ROLE TEXT ANIMATION
========================================================= */

function initRoleAnimation() {

    const roleElement =
        document.querySelector(".role-changing");

    if (!roleElement) return;


    const roles = [
        "WEB DEVELOPER",
        "VIDEO EDITOR",
        "YOUTUBER",
        "DESIGNER",
        "CREATOR"
    ];


    let index = 0;


    roleElement.textContent =
        roles[index];


    setInterval(() => {

        roleElement.style.opacity = "0";

        roleElement.style.transform =
            "translateY(8px)";


        setTimeout(() => {

            index =
                (index + 1) % roles.length;


            roleElement.textContent =
                roles[index];


            roleElement.style.opacity = "1";

            roleElement.style.transform =
                "translateY(0)";

        }, 250);

    }, 2600);

}


/* =========================================================
   PROFILE 3D TILT
========================================================= */

function initProfileTilt() {

    const card =
        document.querySelector(".profile-card");

    if (!card) return;


    const isMobile =
        window.matchMedia(
            "(max-width: 850px)"
        );


    if (isMobile.matches) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    card.addEventListener(
        "mousemove",
        event => {

            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX - rect.left;


            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateY =
                ((x - centerX) / centerX) * 7;


            const rotateX =
                ((centerY - y) / centerY) * 7;


            card.style.transform =
                `perspective(1200px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                `perspective(1200px)
                 rotateY(-5deg)
                 rotateX(3deg)`;

        }
    );

}


/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

function initGallery() {

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    if (!galleryItems.length) return;


    let lightbox =
        document.querySelector(
            ".image-lightbox"
        );


    if (!lightbox) {

        lightbox =
            createLightbox();

    }


    const lightboxImage =
        lightbox.querySelector(
            ".lightbox-content img"
        );


    const closeButton =
        lightbox.querySelector(
            ".lightbox-close"
        );


    galleryItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const image =
                    item.querySelector("img");


                if (!image) return;


                const source =
                    image.currentSrc ||
                    image.src;


                lightboxImage.src =
                    source;


                lightboxImage.alt =
                    image.alt ||
                    "Portfolio Image";


                lightbox.classList.add(
                    "active"
                );


                document.body.style.overflow =
                    "hidden";

            }
        );

    });


    const closeLightbox = () => {

        lightbox.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    };


    closeButton.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox.classList.contains(
                    "active"
                )
            ) {

                closeLightbox();

            }

        }
    );

}


/* =========================================================
   CREATE LIGHTBOX
========================================================= */

function createLightbox() {

    const lightbox =
        document.createElement("div");


    lightbox.className =
        "image-lightbox";


    lightbox.innerHTML = `
        <button
            class="lightbox-close"
            aria-label="Close image"
        >
            ×
        </button>

        <div class="lightbox-content">
            <img
                src=""
                alt="Portfolio Image"
            >
        </div>
    `;


    document.body.appendChild(
        lightbox
    );


    return lightbox;

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function initImageFallback() {

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                if (
                    image.dataset.fallbackApplied
                ) {
                    return;
                }


                image.dataset.fallbackApplied =
                    "true";


                image.style.objectFit =
                    "cover";


                image.style.opacity =
                    "0.75";


                image.alt =
                    "Image unavailable";

            },
            {
                once: true
            }
        );

    });

}


/* =========================================================
   BUTTON RIPPLE EFFECT
========================================================= */

function initRippleEffect() {

    const buttons =
        document.querySelectorAll(
            ".btn, .contact-button, .footer-socials a"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const ripple =
                    document.createElement("span");


                ripple.style.position =
                    "absolute";


                ripple.style.width =
                    "10px";


                ripple.style.height =
                    "10px";


                ripple.style.borderRadius =
                    "50%";


                ripple.style.background =
                    "rgba(255,255,255,0.3)";


                ripple.style.pointerEvents =
                    "none";


                ripple.style.transform =
                    "translate(-50%, -50%) scale(0)";


                ripple.style.animation =
                    "portfolioRipple 0.65s ease-out";


                ripple.style.left =
                    `${event.clientX - rect.left}px`;


                ripple.style.top =
                    `${event.clientY - rect.top}px`;


                const oldPosition =
                    getComputedStyle(
                        button
                    ).position;


                if (
                    oldPosition === "static"
                ) {

                    button.style.position =
                        "relative";

                }


                button.style.overflow =
                    "hidden";


                button.appendChild(
                    ripple
                );


                setTimeout(() => {

                    ripple.remove();

                }, 700);

            }
        );

    });


    addRippleAnimation();

}


/* =========================================================
   RIPPLE CSS
========================================================= */

function addRippleAnimation() {

    if (
        document.querySelector(
            "#portfolio-ripple-style"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "portfolio-ripple-style";


    style.textContent = `
        @keyframes portfolioRipple {

            0% {
                transform:
                    translate(-50%, -50%)
                    scale(0);

                opacity: 1;
            }

            100% {
                transform:
                    translate(-50%, -50%)
                    scale(25);

                opacity: 0;
            }

        }
    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   SCROLL TO TOP
========================================================= */

function initScrollTop() {

    let button =
        document.querySelector(
            ".scroll-top"
        );


    if (!button) {

        button =
            createScrollTopButton();

    }


    const updateButton = () => {

        if (window.scrollY > 500) {

            button.classList.add(
                "visible"
            );

        } else {

            button.classList.remove(
                "visible"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================================
   CREATE SCROLL TOP BUTTON
========================================================= */

function createScrollTopButton() {

    const button =
        document.createElement("button");


    button.className =
        "scroll-top";


    button.type =
        "button";


    button.setAttribute(
        "aria-label",
        "Scroll to top"
    );


    button.innerHTML =
        "↑";


    document.body.appendChild(
        button
    );


    return button;

}


/* =========================================================
   CONTACT BUTTONS
========================================================= */

function initContactButtons() {

    const buttons =
        document.querySelectorAll(
            ".contact-button"
        );


    buttons.forEach(button => {

        const href =
            button.getAttribute("href");


        if (
            !href ||
            href === "#"
        ) {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showToast(
                        "Contact link will be connected soon."
                    );

                }
            );

        }

    });

}


/* =========================================================
   PROJECT BUTTONS
========================================================= */

function initProjectButtons() {

    const projectLinks =
        document.querySelectorAll(
            ".project-actions a"
        );


    projectLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (
            !href ||
            href === "#"
        ) {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    showToast(
                        "Project link will be added soon."
                    );

                }
            );

        }

    });

}


/* =========================================================
   TOAST NOTIFICATION
========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(
            ".portfolio-toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.className =
            "portfolio-toast";


        toast.innerHTML = `
            <span class="toast-dot"></span>
            <span class="toast-message"></span>
        `;


        document.body.appendChild(
            toast
        );


        addToastStyles();

    }


    const messageElement =
        toast.querySelector(
            ".toast-message"
        );


    messageElement.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.portfolioToastTimer
    );


    window.portfolioToastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   TOAST CSS
========================================================= */

function addToastStyles() {

    if (
        document.querySelector(
            "#portfolio-toast-style"
        )
    ) {
        return;
    }


    const style =
        document.createElement("style");


    style.id =
        "portfolio-toast-style";


    style.textContent = `

        .portfolio-toast {

            position: fixed;

            left: 50%;

            bottom: 25px;

            z-index: 10000;

            display: flex;

            align-items: center;

            gap: 10px;

            padding: 13px 18px;

            border: 1px solid
                rgba(139,92,246,0.25);

            border-radius: 14px;

            background:
                rgba(14,10,21,0.94);

            backdrop-filter: blur(20px);

            color: white;

            font-size: 11px;

            box-shadow:
                0 20px 50px rgba(0,0,0,0.4);

            transform:
                translate(-50%, 30px);

            opacity: 0;

            visibility: hidden;

            transition:
                0.35s
                cubic-bezier(.22,1,.36,1);

        }


        .portfolio-toast.show {

            transform:
                translate(-50%, 0);

            opacity: 1;

            visibility: visible;

        }


        .toast-dot {

            width: 7px;

            height: 7px;

            border-radius: 50%;

            background:
                #a78bfa;

            box-shadow:
                0 0 15px
                rgba(167,139,250,0.8);

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   KEYBOARD CONTROLS
========================================================= */

function initKeyboardControls() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                const menu =
                    document.querySelector(
                        ".nav-menu"
                    );


                const toggle =
                    document.querySelector(
                        ".menu-toggle"
                    );


                if (menu) {

                    menu.classList.remove(
                        "active"
                    );

                }


                if (toggle) {

                    toggle.classList.remove(
                        "active"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        }
    );

}


/* =========================================================
   PARALLAX BACKGROUND
========================================================= */

function initBackgroundParallax() {

    const background =
        document.querySelector(
            ".background-effects"
        );


    if (!background) return;


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    window.addEventListener(
        "scroll",
        () => {

            const y =
                window.scrollY * 0.08;


            background.style.transform =
                `translateY(${y}px)`;

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   MOUSE GLOW
========================================================= */

function initMouseGlow() {

    if (
        window.matchMedia(
            "(max-width: 850px)"
        ).matches
    ) {
        return;
    }


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    let glow =
        document.querySelector(
            ".mouse-glow"
        );


    if (!glow) {

        glow =
            document.createElement(
                "div"
            );


        glow.className =
            "mouse-glow";


        document.body.appendChild(
            glow
        );


        const style =
            document.createElement(
                "style"
            );


        style.textContent = `

            .mouse-glow {

                position: fixed;

                width: 180px;

                height: 180px;

                left: 0;

                top: 0;

                z-index: -1;

                pointer-events: none;

                border-radius: 50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(
                            139,
                            92,
                            246,
                            0.10
                        ),
                        transparent 70%
                    );

                transform:
                    translate(-50%, -50%);

                filter: blur(10px);

            }

        `;


        document.head.appendChild(
            style
        );

    }


    let mouseX = -300;
    let mouseY = -300;

    let currentX = mouseX;
    let currentY = mouseY;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        }
    );


    const animate = () => {

        currentX +=
            (mouseX - currentX) * 0.08;


        currentY +=
            (mouseY - currentY) * 0.08;


        glow.style.left =
            `${currentX}px`;


        glow.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animate
        );

    };


    animate();

}


/* =========================================================
   INITIALIZE OPTIONAL EFFECTS
========================================================= */

initBackgroundParallax();
initMouseGlow();


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%c KRISHNAVFX ",
    "background:#8b5cf6;color:white;padding:8px 14px;border-radius:8px;font-weight:bold;"
);


console.log(
    "%cCreating. Coding. Editing.",
    "color:#b58cff;font-size:13px;font-weight:bold;"
);