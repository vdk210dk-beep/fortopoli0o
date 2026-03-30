// ai clude


const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
}

// Load saved theme on page start
(function loadTheme() {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) {
        html.setAttribute('data-theme', saved);
    }
})();

themeToggle.addEventListener('click', toggleTheme);


/* ============================================
   MOBILE MENU
============================================ */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mainNav = document.getElementById('mainNav');
const navOverlay = document.getElementById('navOverlay');

function openMobileMenu() {
    mainNav.classList.add('open');
    hamburgerBtn.classList.add('active');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mainNav.classList.remove('open');
    hamburgerBtn.classList.remove('active');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

function toggleMobileMenu() {
    if (mainNav.classList.contains('open')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

hamburgerBtn.addEventListener('click', toggleMobileMenu);

// Close menu when overlay is clicked
navOverlay.addEventListener('click', closeMobileMenu);

// Close menu when a nav link is clicked
mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});


/* ============================================
   PORTFOLIO SHOW MORE / SHOW LESS
============================================ */
let isExpanded = false;
const showMoreBtn = document.getElementById('showMoreBtn');
const projectGrid = document.getElementById('projectGrid');

function toggleProjects() {
    const allCards = projectGrid.querySelectorAll('.project-card');

    if (!isExpanded) {
        // EXPAND: show all cards
        projectGrid.classList.add('expanded');

        // Animate cards beyond default visible range with staggered delay
        allCards.forEach((card, i) => {
            const defaultVisible = getDefaultVisible();
            if (i >= defaultVisible) {
                card.classList.remove('animate-in');
                void card.offsetWidth; // reflow to restart animation
                card.style.animationDelay = ((i - defaultVisible) * 60) + 'ms';
                card.classList.add('animate-in');
            }
        });

        showMoreBtn.innerHTML = 'Show less <span class="arrow" style="transform:rotate(180deg); display:inline-block;">↓</span>';
        showMoreBtn.classList.add('expanded');
        isExpanded = true;

    } else {
        // COLLAPSE
        projectGrid.classList.remove('expanded');

        allCards.forEach(card => {
            card.classList.remove('animate-in');
            card.style.animationDelay = '';
        });

        showMoreBtn.innerHTML = 'Show more <span class="arrow">↓</span>';
        showMoreBtn.classList.remove('expanded');
        isExpanded = false;

        // Scroll back to portfolio section
        document.getElementById('work').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Returns how many cards are visible by default based on screen size
function getDefaultVisible() {
    const w = window.innerWidth;
    if (w <= 768) return 2;
    return 4;
}

showMoreBtn.addEventListener('click', toggleProjects);


/* ============================================
   CONTACT FORM
============================================ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = '✅ Terima kasih! Pesan dikirim.';
    btn.style.background = 'linear-gradient(135deg, #00c851, #007E33)';
    btn.disabled = true;

    setTimeout(() => {
        contactForm.reset();
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
    }, 3000);
});


/* ============================================
   ACTIVE NAV LINK ON SCROLL
============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent-pink)';
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();
