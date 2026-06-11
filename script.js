// ── TYPING ANIMATION ──
const phrases = [
  "CS Engineering Student 🎓",
  "PALS Student Leader 🌟",
  "GATE 2027 Aspirant 📐",
  "Fast Learner & Team Player 🤝",
  "Building Skills Every Day 🔥"
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  let speed = isDeleting ? 50 : 80;
  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 300;
  }
  setTimeout(type, speed);
}
type();

// ── NAVBAR SCROLL ──
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
});

// ── HAMBURGER MENU ──
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("open");
});

// ── FADE IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.1 });

document.querySelectorAll(
  ".skill-group, .project-card, .achievement-item, .edu-card, .stat-card, .contact-card"
).forEach(el => {
  el.classList.add("fade-in");
  observer.observe(el);
});

// ── ACTIVE NAV LINK ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id");
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute("href") === `#${current}` ? "var(--accent)" : "";
  });
});
