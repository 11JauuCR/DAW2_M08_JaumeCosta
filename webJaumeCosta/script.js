/* =========================================================
   1. ELEMENTOS
========================================================= */

const header = document.querySelector('.header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('main section');
const currentYear = document.getElementById('current-year');


/* =========================================================
   2. AÑO AUTOMÁTICO
========================================================= */

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================================
   3. MENÚ MÓVIL
========================================================= */

function openMenu() {
    navMenu.classList.add('active');

    menuToggle.setAttribute('aria-expanded', 'true');

    menuToggle.setAttribute(
        'aria-label',
        'Cerrar menú'
    );

    menuToggle.textContent = '✕';

    document.body.classList.add('no-scroll');
}


function closeMenu() {
    navMenu.classList.remove('active');

    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.setAttribute(
        'aria-label',
        'Abrir menú'
    );

    menuToggle.textContent = '☰';

    document.body.classList.remove('no-scroll');
}


function toggleMenu() {
    const isOpen =
        navMenu.classList.contains('active');

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}


if (menuToggle && navMenu) {
    menuToggle.addEventListener(
        'click',
        toggleMenu
    );
}


/* =========================================================
   4. CERRAR MENÚ AL PULSAR EN UN ENLACE
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener('click', () => {

        closeMenu();

    });

});


/* =========================================================
   5. CERRAR MENÚ CON ESC
========================================================= */

document.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Escape' &&
            navMenu.classList.contains('active')
        ) {
            closeMenu();
        }

    }
);


/* =========================================================
   6. HEADER AL HACER SCROLL
========================================================= */

function updateHeader() {

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

}


window.addEventListener(
    'scroll',
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


/* =========================================================
   7. NAVEGACIÓN ACTIVA
========================================================= */

function updateActiveSection() {

    const scrollPosition =
        window.scrollY + 150;

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute('id');

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop + sectionHeight
        ) {

            navLinks.forEach((link) => {

                link.classList.remove(
                    'active'
                );

            });

            const activeLink =
                document.querySelector(
                    `.nav-menu a[href="#${sectionId}"]`
                );

            if (activeLink) {
                activeLink.classList.add(
                    'active'
                );
            }
        }

    });

}


window.addEventListener(
    'scroll',
    updateActiveSection,
    {
        passive: true
    }
);

updateActiveSection();


/* =========================================================
   8. INTERSECTION OBSERVER
========================================================= */

const animatedElements =
    document.querySelectorAll(
        '.info-card, .skill-card, .project-card, .timeline-item'
    );


const observer =
    new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'show'
                    );

                    observerInstance.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


animatedElements.forEach(
    (element) => {

        observer.observe(element);

    }
);


/* =========================================================
   9. REVEAL GENERAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        '.section-title, .about-text, .hero-text, .hero-card'
    );


const revealObserver =
    new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'visible'
                    );

                    observerInstance.unobserve(
                        entry.target
                    );
                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    (element) => {

        element.classList.add('reveal');

        revealObserver.observe(element);

    }
);


/* =========================================================
   10. BOTÓN VOLVER ARRIBA
========================================================= */

const scrollTopButton =
    document.createElement('button');

scrollTopButton.className =
    'scroll-top';

scrollTopButton.innerHTML = '↑';

scrollTopButton.setAttribute(
    'aria-label',
    'Volver arriba'
);

document.body.appendChild(
    scrollTopButton
);


function updateScrollButton() {

    if (window.scrollY > 500) {

        scrollTopButton.classList.add(
            'visible'
        );

    } else {

        scrollTopButton.classList.remove(
            'visible'
        );

    }

}


window.addEventListener(
    'scroll',
    updateScrollButton,
    {
        passive: true
    }
);


scrollTopButton.addEventListener(
    'click',
    () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

    }
);


/* =========================================================
   11. EFECTO TILT EN EL CÓDIGO
========================================================= */

const codeWindow =
    document.querySelector('.code-window');


if (codeWindow) {

    codeWindow.addEventListener(
        'mousemove',
        (event) => {

            if (window.innerWidth < 800) {
                return;
            }

            const rect =
                codeWindow.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -3;

            const rotateY =
                ((x - centerX) / centerX) * 3;

            codeWindow.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    codeWindow.addEventListener(
        'mouseleave',
        () => {

            codeWindow.style.transform =
                'perspective(1000px) rotateX(2deg) rotateY(-4deg)';

        }
    );

}


/* =========================================================
   12. EFECTO HOVER DE PROYECTOS
========================================================= */

const projectCards =
    document.querySelectorAll(
        '.project-card'
    );


projectCards.forEach(
    (card) => {

        card.addEventListener(
            'mouseenter',
            () => {

                projectCards.forEach(
                    (otherCard) => {

                        if (
                            otherCard !== card
                        ) {
                            otherCard.style.opacity =
                                '0.65';
                        }

                    }
                );

            }
        );


        card.addEventListener(
            'mouseleave',
            () => {

                projectCards.forEach(
                    (otherCard) => {

                        otherCard.style.opacity =
                            '1';

                    }
                );

            }
        );

    }
);


/* =========================================================
   13. CONTADOR DE PROYECTOS
========================================================= */

const projectCounter =
    document.querySelector(
        '[data-project-counter]'
    );


if (projectCounter) {

    const target =
        Number(
            projectCounter.dataset.projectCounter
        );

    let current = 0;

    const counterObserver =
        new IntersectionObserver(
            (entries, observerInstance) => {

                if (
                    entries[0].isIntersecting
                ) {

                    const interval =
                        setInterval(
                            () => {

                                current += 1;

                                projectCounter.textContent =
                                    current;

                                if (
                                    current >= target
                                ) {

                                    clearInterval(
                                        interval
                                    );

                                }

                            },
                            80
                        );

                    observerInstance.disconnect();

                }

            }
        );

    counterObserver.observe(
        projectCounter
    );
}


/* =========================================================
   14. BOTÓN DE TEMA
========================================================= */

const themeButton =
    document.querySelector(
        '[data-theme-toggle]'
    );


if (themeButton) {

    const savedTheme =
        localStorage.getItem(
            'portfolio-theme'
        );


    if (savedTheme === 'light') {

        document.body.classList.remove(
            'dark-mode'
        );

    }


    themeButton.addEventListener(
        'click',
        () => {

            document.body.classList.toggle(
                'dark-mode'
            );

            const isDark =
                document.body.classList.contains(
                    'dark-mode'
                );

            localStorage.setItem(
                'portfolio-theme',
                isDark
                    ? 'dark'
                    : 'light'
            );

        }
    );

}


/* =========================================================
   15. VALIDACIÓN DE FORMULARIO
========================================================= */

const contactForm =
    document.querySelector(
        '#contact-form'
    );


if (contactForm) {

    contactForm.addEventListener(
        'submit',
        (event) => {

            event.preventDefault();

            const name =
                document.querySelector(
                    '#name'
                );

            const email =
                document.querySelector(
                    '#email'
                );

            const message =
                document.querySelector(
                    '#message'
                );


            if (
                !name.value.trim() ||
                !email.value.trim() ||
                !message.value.trim()
            ) {

                showFormMessage(
                    'Completa todos los campos.'
                );

                return;

            }


            if (!validateEmail(email.value)) {

                showFormMessage(
                    'Introduce un email válido.'
                );

                return;

            }


            showFormMessage(
                'Formulario validado correctamente.'
            );

            contactForm.reset();

        }
    );

}


function validateEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}


function showFormMessage(message) {

    let messageElement =
        document.querySelector(
            '.form-message'
        );


    if (!messageElement) {

        messageElement =
            document.createElement(
                'p'
            );

        messageElement.className =
            'form-message';

        contactForm.appendChild(
            messageElement
        );

    }


    messageElement.textContent =
        message;

}


/* =========================================================
   16. CARGA DE LA PÁGINA
========================================================= */

window.addEventListener(
    'load',
    () => {

        document.body.classList.add(
            'loaded'
        );

    }
);


/* =========================================================
   17. DETECTAR CAMBIO DE TAMAÑO
========================================================= */

window.addEventListener(
    'resize',
    () => {

        if (
            window.innerWidth > 700 &&
            navMenu.classList.contains('active')
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   18. SMOOTH SCROLL PERSONALIZADO
========================================================= */

navLinks.forEach(
    (link) => {

        link.addEventListener(
            'click',
            (event) => {

                const targetId =
                    link.getAttribute(
                        'href'
                    );

                if (
                    !targetId.startsWith('#')
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    header.offsetHeight;

                const targetPosition =
                    target.offsetTop -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

            }
        );

    }
);


/* =========================================================
   19. PREVENIR ERRORES DE IMÁGENES
========================================================= */

const images =
    document.querySelectorAll(
        'img'
    );


images.forEach(
    (image) => {

        image.addEventListener(
            'error',
            () => {

                image.style.display =
                    'none';

            }
        );

    }
);


/* =========================================================
   20. CONSOLA
========================================================= */

console.log(
    '%cPortfolio de Jaume Costa',
    'color: #38bdf8; font-size: 20px; font-weight: bold;'
);

console.log(
    'Portfolio cargado correctamente.'
);