// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


console.log("Main.js initialized");


// JS: split each strong into per-letter spans and set a per-letter index (--i)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('p.intro strong').forEach(el => {
    const chars = Array.from(el.textContent);
    el.innerHTML = '';
    chars.forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.setProperty('--i', i);
      el.appendChild(s);
    });
  });
});