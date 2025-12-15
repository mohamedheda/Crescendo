// ============================================
// Language Toggle (RTL/LTR)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.getElementById('langToggle');
    const htmlElement = document.getElementById('htmlElement');
    
    if (langToggle) {
        // Check if language preference is stored
        const savedLang = localStorage.getItem('language');
        if (savedLang === 'ar') {
            setRTL();
        }
        
        langToggle.addEventListener('click', function() {
            const currentDir = htmlElement.getAttribute('dir');
            if (currentDir === 'ltr') {
                setRTL();
                localStorage.setItem('language', 'ar');
            } else {
                setLTR();
                localStorage.setItem('language', 'en');
            }
        });
    }
    
    function setRTL() {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
        if (langToggle) {
            langToggle.textContent = 'EN';
        }
    }
    
    function setLTR() {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
        if (langToggle) {
            langToggle.textContent = 'AR';
        }
    }
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 76; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

// ============================================
// Service Buttons (Services Page)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceDetails = document.querySelectorAll('.service-detail');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            serviceButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all service details
            serviceDetails.forEach(detail => {
                detail.style.display = 'none';
            });
            
            // Show selected service detail
            const serviceId = this.getAttribute('data-service');
            const selectedDetail = document.querySelector(`.service-detail[data-service="${serviceId}"]`);
            if (selectedDetail) {
                selectedDetail.style.display = 'block';
                // Scroll to service detail
                setTimeout(() => {
                    selectedDetail.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        });
    });
    
    // Show first service by default
    if (serviceDetails.length > 0) {
        serviceDetails[0].style.display = 'block';
    }
});

// ============================================
// Contact Form Validation
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactFormElement');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Basic validation
            let isValid = true;
            const requiredFields = ['firstName', 'lastName', 'phone', 'email', 'contactMethod', 'message'];
            
            requiredFields.forEach(field => {
                const input = document.getElementById(field);
                if (input && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else if (input) {
                    input.classList.remove('is-invalid');
                }
            });
            
            // Email validation
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email.value)) {
                isValid = false;
                email.classList.add('is-invalid');
            }
            
            // Phone validation (basic)
            const phone = document.getElementById('phone');
            if (phone && phone.value.trim().length < 10) {
                isValid = false;
                phone.classList.add('is-invalid');
            }
            
            if (isValid) {
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully. We will contact you soon.');
                contactForm.reset();
                
                // In a real application, you would send the data to a server here
                console.log('Form data:', data);
            } else {
                showFormMessage('error', 'Please fill in all required fields correctly.');
            }
        });
        
        // Remove invalid class on input
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }
    
    function showFormMessage(type, message) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message alert alert-${type === 'success' ? 'success' : 'danger'} mt-3`;
        messageDiv.textContent = message;
        
        // Insert message
        const form = document.getElementById('contactFormElement');
        if (form) {
            form.appendChild(messageDiv);
            
            // Scroll to message
            messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Remove message after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        }
    }
});

// ============================================
// Carousel Auto-play Configuration
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('#mainSlider');
    if (carousel) {
        const carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });
    }
});

// ============================================
// Animation on Scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .client-card, .service-detail');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================
// Mobile Menu Close on Link Click
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });
});

// ============================================
// Logo Error Handler
// ============================================
function handleLogoError(img) {
    img.style.display = 'none';
    const placeholder = img.nextElementSibling;
    if (placeholder && placeholder.classList.contains('logo-placeholder')) {
        placeholder.style.display = 'flex';
    }
}

