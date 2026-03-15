document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initSmoothScroll();
    initActiveNavHighlight();
    initContactForm();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', (e) => {
        if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const parent = entry.target.parentElement;
                const siblings = parent ? parent.querySelectorAll('.reveal') : [];
                let delay = 0;

                siblings.forEach((sibling, i) => {
                    if (sibling === entry.target) {
                        delay = i * 100;
                    }
                });

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, Math.min(delay, 400));

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

function initContactForm() {
    const WHATSAPP_NUMBER = '5541991564339';
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const message = form.querySelector('#message').value.trim();

        let text = `Olá Dra. Ana Gabriela! Vim pelo seu site.\n\n`;
        text += `*Nome:* ${name}\n`;
        text += `*E-mail:* ${email}\n`;
        if (phone) text += `*Telefone:* ${phone}\n`;
        text += `\n*Mensagem:*\n${message}`;

        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(whatsappUrl, '_blank');

        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Redirecionado!';
        submitBtn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = originalContent;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            form.reset();
        }, 3000);
    });
}
