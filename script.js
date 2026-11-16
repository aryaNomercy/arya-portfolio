
// ==========================================
// ARYA PORTFOLIO V4 — JAVASCRIPT
// ==========================================

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_n9e3pof';
const EMAILJS_TEMPLATE_ID = 'template_tc4h137';
const EMAILJS_PUBLIC_KEY = 'VUf3HgcOcjseuw7mI';

// ==========================================
// PAGE LOADER
// ==========================================

const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader?.classList.add('done');
  }, 450);
});

// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navigationLinks = document.querySelectorAll('.nav-link');

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');

  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute(
    'aria-label',
    isOpen ? 'Tutup menu' : 'Buka menu'
  );
});

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Buka menu');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (
    navLinks?.classList.contains('open') &&
    !navLinks.contains(event.target) &&
    !menuToggle?.contains(event.target)
  ) {
    navLinks.classList.remove('open');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Buka menu');
  }
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================

const header = document.getElementById('header');

function updateHeader() {
  header?.classList.toggle('scrolled', window.scrollY > 30);
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// ==========================================
// SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    }
  );

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${(index % 4) * 80}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add('visible');
  });
}

// ==========================================
// ACTIVE NAVIGATION ON SCROLL
// ==========================================

const pageSections = document.querySelectorAll('main section[id]');

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;

          navigationLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${sectionId}`
            );
          });
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-35% 0px -55% 0px'
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// ==========================================
// AUTOMATIC ROLE TEXT
// ==========================================

const typedRole = document.getElementById('typedRole');

const roles = [
  'Pembelajar',
  'Pencinta Teknologi',
  'Penjelajah',
  'Digital Explorer'
];

let roleIndex = 0;

if (typedRole) {
  setInterval(() => {
    typedRole.style.opacity = '0';

    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      typedRole.textContent = roles[roleIndex];
      typedRole.style.opacity = '1';
    }, 250);
  }, 2600);

  typedRole.style.transition = 'opacity .25s ease';
}

// ==========================================
// EMAILJS INITIALIZATION
// ==========================================

if (window.emailjs) {
  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

// ==========================================
// CONTACT FORM
// ==========================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  const originalButtonText = submitButton.innerHTML;

  if (!window.emailjs) {
    formStatus.textContent =
      'EmailJS belum berhasil dimuat. Silakan coba lagi.';
    return;
  }

  submitButton.disabled = true;
  submitButton.innerHTML = 'Mengirim...';
  formStatus.textContent = 'Pesan sedang dikirim...';

  try {
    await window.emailjs.sendForm(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      contactForm
    );

    formStatus.textContent =
      'Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.';

    formStatus.style.color = '#62dca5';

    contactForm.reset();
  } catch (error) {
    console.error('EmailJS Error:', error);

    formStatus.textContent =
      'Pesan gagal dikirim. Silakan coba kembali.';

    formStatus.style.color = '#ff8585';
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});

// ==========================================
// BUTTON LOADING STATE
// ==========================================

document.querySelectorAll('.button').forEach((button) => {
  button.addEventListener('mouseenter', () => {
    button.style.setProperty('--hover-state', '1');
  });

  button.addEventListener('mouseleave', () => {
    button.style.setProperty('--hover-state', '0');
  });
});

// ==========================================
// YEAR
// ==========================================

const yearText = document.querySelector('.footer-inner p span');

if (yearText) {
  yearText.textContent = `© ${new Date().getFullYear()} ARYA`;
}

console.log('ARYA Portfolio V4 berhasil dimuat.');