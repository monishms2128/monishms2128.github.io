// ── LOADER ──
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1600);
});

// ── CUSTOM CURSOR ──
const cursor = document.getElementById("cursor");
const trail  = document.getElementById("cursor-trail");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top  = e.clientY + "px";
  trail.style.left  = e.clientX + "px";
  trail.style.top   = e.clientY + "px";
});
document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => { cursor.style.transform = "translate(-50%,-50%) scale(2)"; });
  el.addEventListener("mouseleave", () => { cursor.style.transform = "translate(-50%,-50%) scale(1)"; });
});

// ── SCROLL PROGRESS ──
window.addEventListener("scroll", () => {
  const total = document.body.scrollHeight - window.innerHeight;
  document.getElementById("scroll-progress").style.width = (window.scrollY / total * 100) + "%";
});

// ── NAVBAR SCROLL ──
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
  document.getElementById("back-top").classList.toggle("visible", window.scrollY > 400);
});

// ── BACK TO TOP ──
document.getElementById("back-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ── HAMBURGER ──
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav-links").classList.toggle("open");
});

// ── DARK / LIGHT TOGGLE ──
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.innerHTML = document.body.classList.contains("light")
    ? '<i class="fas fa-sun"></i>'
    : '<i class="fas fa-moon"></i>';
});

// ── TYPING ANIMATION ──
const phrases = [
  "CS Engineering Student 🎓",
  "Ex-PALS Student Leader 🌟",
  "GATE 2027 Aspirant 📐",
  "Fast Learner & Team Player 🤝",
  "Building Skills Every Day 🔥"
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById("typed-text");
function type() {
  const current = phrases[phraseIndex];
  typedEl.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  let speed = isDeleting ? 50 : 80;
  if (!isDeleting && charIndex === current.length + 1) { speed = 1800; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 300; }
  setTimeout(type, speed);
}
type();

// ── PARTICLES ──
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W, H, particles = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
resize();
window.addEventListener("resize", resize);
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r = Math.random() * 2 + 1;
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(112,165,253,${this.alpha})`;
    ctx.fill();
  }
}
for (let i = 0; i < 80; i++) particles.push(new Particle());
function drawLines() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(112,165,253,${0.12 * (1 - dist/120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }
}
function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawLines();
  requestAnimationFrame(animate);
}
animate();

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// ── SKILL BARS ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll(".bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.w + "%";
      });
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll(".skill-group").forEach(g => barObserver.observe(g));

// ── ACTIVE NAV ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute("id"); });
  navLinks.forEach(a => { a.style.color = a.getAttribute("href") === `#${current}` ? "var(--accent)" : ""; });
});

// ── CONTACT FORM ──
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const status = document.getElementById("form-status");
  const name = document.getElementById("form-name").value.trim();
  status.textContent = `Thanks ${name}! Your message has been noted. I'll reach out soon 🙌`;
  this.reset();
  setTimeout(() => { status.textContent = ""; }, 5000);
});
