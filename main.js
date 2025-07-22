// Smooth scroll for anchor links
const links = document.querySelectorAll('nav a[href^="#"]');
for (const link of links) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 70, // offset for fixed navbar
        behavior: 'smooth'
      });
    }
  });
}

// Fade-in animation on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('section, .fade-in');
  const windowHeight = window.innerHeight;
  for (const el of reveals) {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add('fade-in');
    }
  }
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Navbar shadow on scroll
const navbar = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// (Optional) Prevent form submission (demo only)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for reaching out! (Demo only)');
});
