// Loading screen
window.addEventListener('load', function() {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Theme switching functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', function() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add a subtle animation effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-in-centre, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Counter animation
document.querySelectorAll('.impact-item, .stat-card, .feature-card').forEach(card => {
    card.addEventListener('touchstart', () => {
      card.classList.add('tapped');
      setTimeout(() => card.classList.remove('tapped'), 300);
    });
  });

  function enableMobileHover(selector, hoverClass = 'hover-active') {
    const elements = document.querySelectorAll(selector);
  
    elements.forEach(el => {
      el.addEventListener('touchstart', () => {
        // Remove hover from all others
        elements.forEach(e => e.classList.remove(hoverClass));
        // Add hover to the touched element
        el.classList.add(hoverClass);
      });
  
      el.addEventListener('touchend', () => {
        setTimeout(() => el.classList.remove(hoverClass), 1000); // Optional timeout
      });
    });
  }
  
  
// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver(function(entries) {
    if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Mobile menu close on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic navbar background
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const navbar = document.querySelector('.navbar');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // ✅ Initialize mobile hover simulation
    enableMobileHover('.strategy-card');
});

const hoverObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-hover');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.strategy-card, .feature-card, .impact-item').forEach(card => {
  hoverObserver.observe(card);
});

// Interactive feature cards
document.querySelectorAll('.feature-card, .stat-card, .impact-area').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Dynamic gradient animation
const hero = document.querySelector('.hero');
let gradientAngle = 135;

setInterval(() => {
    gradientAngle += 1;
    if (gradientAngle > 225) gradientAngle = 135;
    hero.style.background = `linear-gradient(${gradientAngle}deg, var(--gradient-start) 0%, var(--gradient-end) 100%)`;
}, 100);

// Typing effect for hero title
function typeWriter(element, text, speed = 50) {
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

// Initialize typing effect on page load
setTimeout(() => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 80);
}, 1000);

// Interactive particles background
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Form validation and interaction
function initializeContactForm() {
    const form = document.createElement('form');
    form.innerHTML = `
        <div class="row">
            <div class="col-md-6 mb-3">
                <input type="text" class="form-control" placeholder="Your Name" required>
            </div>
            <div class="col-md-6 mb-3">
                <input type="email" class="form-control" placeholder="Your Email" required>
            </div>
            <div class="col-12 mb-3">
                <input type="text" class="form-control" placeholder="Subject" required>
            </div>
            <div class="col-12 mb-3">
                <textarea class="form-control" rows="5" placeholder="Your Message" required></textarea>
            </div>
            <div class="col-12">
                <button type="submit" class="btn-hero">Send Message</button>
            </div>
        </div>
    `;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! We\'ll get back to you soon.');
    });
    
    return form;
}

// Advanced scroll animations
const scrollAnimations = {
    fadeInUp: (el, delay = 0) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
        }, delay);
    },
    
    slideInFromSide: (el, direction = 'left', delay = 0) => {
        setTimeout(() => {
            const translateX = direction === 'left' ? '-100px' : '100px';
            el.style.opacity = '0';
            el.style.transform = `translateX(${translateX})`;
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(el);
        }, delay);
    }
};

// Apply advanced animations
document.querySelectorAll('.feature-card').forEach((card, index) => {
    scrollAnimations.fadeInUp(card, index * 200);
});

document.querySelectorAll('.impact-area').forEach((area, index) => {
    const direction = index % 2 === 0 ? 'left' : 'right';
    scrollAnimations.slideInFromSide(area, direction, index * 150);
});

// Progress indicators
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
        z-index: 10000;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize progress bar
createProgressBar();

// Enhanced mobile experience
function optimizeMobile() {
    if (window.innerWidth <= 768) {
        // Reduce animation intensity on mobile
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        
        // Optimize touch interactions
        document.querySelectorAll('.feature-card, .stat-card, .impact-area').forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize mobile optimizations
optimizeMobile();
window.addEventListener('resize', optimizeMobile);

// Error handling and fallbacks
window.addEventListener('error', (e) => {
    console.log('Error caught:', e.error);
    // Graceful degradation - ensure basic functionality works
});

// Performance monitoring
window.addEventListener('load', () => {
    // Monitor page load performance
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time:', loadTime + 'ms');
});