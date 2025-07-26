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

// Initialize EmailJS
emailjs.init("BYaldzwRTdyBMayar");

// Check if we're on localhost or GitHub Pages
const isLocalhost = window.location.hostname === 'localhost' || 
                   window.location.hostname === '127.0.0.1' || 
                   window.location.hostname === '';

const isGitHubPages = window.location.hostname.includes('github.io');

console.log('Current hostname:', window.location.hostname);
console.log('Is localhost:', isLocalhost);
console.log('Is GitHub Pages:', isGitHubPages);

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const form = this;
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitText = document.getElementById('submitText');
  const submitLoading = document.getElementById('submitLoading');
  const formMessage = document.getElementById('formMessage');
  
  // Get form data
  const formData = new FormData(form);
  const data = {
    name: formData.get('name').trim(),
    email: formData.get('email').trim(),
    subject: formData.get('subject').trim() || 'Portfolio Contact Form',
    message: formData.get('message').trim()
  };
  
  // Validation
  if (!data.name || !data.email || !data.message) {
    showMessage('Please fill in all required fields.', 'error');
    return;
  }
  
  if (!isValidEmail(data.email)) {
    showMessage('Please enter a valid email address.', 'error');
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitText.classList.add('hidden');
  submitLoading.classList.remove('hidden');
  hideMessage();
  
  // If on localhost, show demo message
  if (isLocalhost) {
    console.log('Local testing - EmailJS data:', data);
    setTimeout(() => {
      showMessage('Demo mode: Email would be sent with data: ' + JSON.stringify(data, null, 2), 'success');
      form.reset();
      submitBtn.disabled = false;
      submitText.classList.remove('hidden');
      submitLoading.classList.add('hidden');
    }, 2000);
    return;
  }
  
  // Send email using EmailJS (on live site)
  console.log('Sending email via EmailJS...');
  emailjs.send('service_8y6vzwh', 'template_nl97aub', {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
    form.reset();
  })
  .catch(function(error) {
    console.log('FAILED...', error);
    showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
  })
  .finally(function() {
    // Reset button state
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    submitLoading.classList.add('hidden');
  });
});

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show message helper
function showMessage(message, type) {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = message;
  formMessage.className = `mt-4 p-3 rounded-md text-center ${
    type === 'success' 
      ? 'bg-green-100 text-green-700 border border-green-200' 
      : 'bg-red-100 text-red-700 border border-red-200'
  }`;
  formMessage.classList.remove('hidden');
  
  // Auto-hide success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      hideMessage();
    }, 5000);
  }
}

// Hide message helper
function hideMessage() {
  const formMessage = document.getElementById('formMessage');
  formMessage.classList.add('hidden');
}
