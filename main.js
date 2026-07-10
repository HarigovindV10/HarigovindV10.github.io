// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Guard: if the nav markup is ever missing, don't let it throw and abort the
// rest of this file (which would silently break the contact form).
if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }));
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Contact form -> Cloudflare Pages Function (/api/contact) -> Resend.
// Inline validation, no third-party JS. Reply-To is set to the visitor server-side.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fields = ['name', 'email', 'subject', 'message'];

  const setError = (id, msg) => {
    const group = document.getElementById(id).closest('.form-group');
    const err = document.getElementById(id + 'Error');
    if (msg) {
      if (err) err.textContent = msg;
      group.classList.add('invalid');
    } else {
      group.classList.remove('invalid');
    }
  };

  const validateField = (id) => {
    const value = document.getElementById(id).value.trim();
    if (!value) { setError(id, 'This field is required.'); return false; }
    if (id === 'email' && !EMAIL_RE.test(value)) {
      setError(id, 'Please enter a valid email address.');
      return false;
    }
    setError(id, null);
    return true;
  };

  // Live feedback as the user leaves or corrects a field.
  fields.forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener('blur', () => validateField(id));
    el.addEventListener('input', () => {
      if (el.closest('.form-group').classList.contains('invalid')) validateField(id);
    });
  });

  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    status.className = 'form-status';
    status.textContent = '';

    const valid = fields.map(validateField).every(Boolean);
    if (!valid) {
      const firstInvalid = contactForm.querySelector('.form-group.invalid input, .form-group.invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          subject: document.getElementById('subject').value.trim(),
          message: document.getElementById('message').value.trim(),
          company: document.getElementById('company').value, // honeypot
        }),
      });

      if (res.ok) {
        contactForm.reset();
        status.className = 'form-status success';
        status.textContent = "Thank you for your message! I'll get back to you soon.";
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.errors) {
          Object.entries(data.errors).forEach(([id, msg]) => setError(id, msg));
        }
        status.className = 'form-status error';
        status.textContent = data.error || 'Sorry, something went wrong. Please try again or email contact@harigovindvalsakumar.com.';
      }
    } catch (err) {
      status.className = 'form-status error';
      status.textContent = 'Network error. Please try again or email contact@harigovindvalsakumar.com.';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat');
  animateElements.forEach(el => observer.observe(el));
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    // Uncomment the line below to enable typing effect
    // typeWriter(heroTitle, originalText, 50);
  }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateX(10px)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateX(0)';
  });
});

// Smooth reveal animation for sections
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Trigger initial reveal
  revealOnScroll();
  
  // Listen for scroll events
  window.addEventListener('scroll', revealOnScroll);
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Console welcome message
console.log('%c👋 Welcome to my portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #6b7280; font-size: 14px;');
