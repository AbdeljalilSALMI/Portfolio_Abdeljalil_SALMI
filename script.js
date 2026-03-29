
// ─── Theme Toggle ──────────────────────────────────────────────────
const themeBtn = document.getElementById('themeToggle');
const html = document.documentElement;
themeBtn.addEventListener('click', () => {
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ─── Mobile Menu ───────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

// ─── Scroll Reveal ─────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─── Skill Bars Animation ──────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const w = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = w + '%'; }, 300);
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(c => barObserver.observe(c));

// ─── Active Nav Link ───────────────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.getAttribute('id');
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
  });
});

// ─── Contact Form ──────────────────────────────────────────────────
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const button = form.querySelector("button");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
  button.disabled = true;

  const data = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      successMsg.style.display = "block";

      setTimeout(() => {
        successMsg.style.display = "none";
      }, 5000);

    } else {
      alert("Erreur lors de l'envoi.");
    }

  } catch (error) {
    alert("Problème de connexion.");
  }

  button.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer';
  button.disabled = false;
});

// ─── Navbar scroll shadow ──────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,0.3)' : 'none';
});
