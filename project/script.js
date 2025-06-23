// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Exchange rate calculation
function calculateExchange() {
    const sendAmount = parseFloat(document.getElementById('sendAmount').value) || 0;
    const exchangeRate = 87.08; // INR to USDT rate
    const usdtRate = 1 / exchangeRate; // USDT per INR
    
    const receiveAmount = (sendAmount * usdtRate).toFixed(4);
    
    document.getElementById('receiveAmount').textContent = receiveAmount;
    document.getElementById('usdtRate').textContent = usdtRate.toFixed(4);
    document.getElementById('displayRate').textContent = usdtRate.toFixed(4);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    }
});

// Intersection Observer for animations
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

// FAQ Toggle Function
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// FAQ Tab switching
function switchFAQTab(tab) {
    document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
}

// Auth form handlers
function handleLogin(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    // Simulate login
    if (email && password) {
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    }
}

function handleSignup(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Simulate signup
    alert('Account created successfully! Redirecting to dashboard...');
    window.location.href = 'dashboard.html';
}

function handleTransfer(event) {
    event.preventDefault();
    alert('Transfer initiated successfully! You will receive a confirmation email shortly.');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Initialize first calculation if on main page
    if (document.getElementById('sendAmount')) {
        calculateExchange();
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .step-card, .security-card, .dashboard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add transition effects to cards
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    // FAQ tab switching
    document.querySelectorAll('.faq-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchFAQTab(this);
        });
    });
    
    // Country flag tooltips
    document.querySelectorAll('.country-flag').forEach(flag => {
        flag.addEventListener('mouseenter', function() {
            const country = this.getAttribute('data-country');
            if (country) {
                this.setAttribute('title', country);
            }
        });
    });
});

// Add click effect to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add smooth hover effects for navigation
document.querySelectorAll('.nav-buttons button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    console.log('Mobile menu toggle');
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone);
}

// Currency conversion helpers
function convertCurrency(amount, fromCurrency, toCurrency) {
    // Mock exchange rates
    const rates = {
        'INR': { 'USDT': 0.0115, 'USD': 0.012, 'EUR': 0.011 },
        'USD': { 'INR': 83.33, 'USDT': 0.96, 'EUR': 0.92 },
        'EUR': { 'INR': 90.91, 'USD': 1.09, 'USDT': 1.05 }
    };
    
    if (fromCurrency === toCurrency) return amount;
    
    const rate = rates[fromCurrency]?.[toCurrency] || 1;
    return (amount * rate).toFixed(4);
}

// Real-time exchange rate updates (mock)
function updateExchangeRates() {
    // This would typically fetch from an API
    const rates = {
        'INR_USDT': (0.0115 + (Math.random() - 0.5) * 0.0001).toFixed(6),
        'USD_INR': (83.33 + (Math.random() - 0.5) * 0.5).toFixed(2)
    };
    
    // Update display if elements exist
    const usdtRateElements = document.querySelectorAll('#usdtRate, #displayRate');
    usdtRateElements.forEach(element => {
        if (element) {
            element.textContent = rates.INR_USDT;
        }
    });
}

// Update rates every 30 seconds
setInterval(updateExchangeRates, 30000);

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button functionality
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.scroll-to-top');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Initialize tooltips for country flags
function initializeCountryTooltips() {
    const countryNames = {
        '🇺🇸': 'United States',
        '🇨🇦': 'Canada',
        '🇲🇽': 'Mexico',
        '🇧🇷': 'Brazil',
        '🇦🇷': 'Argentina',
        '🇨🇱': 'Chile',
        '🇬🇧': 'United Kingdom',
        '🇩🇪': 'Germany',
        '🇫🇷': 'France',
        '🇪🇸': 'Spain',
        '🇵🇱': 'Poland',
        '🇳🇬': 'Nigeria',
        '🇰🇪': 'Kenya',
        '🇿🇦': 'South Africa',
        '🇬🇭': 'Ghana',
        '🇮🇳': 'India',
        '🇨🇳': 'China',
        '🇯🇵': 'Japan',
        '🇰🇷': 'South Korea',
        '🇵🇭': 'Philippines',
        '🇹🇭': 'Thailand',
        '🇮🇩': 'Indonesia',
        '🇦🇪': 'UAE',
        '🇦🇺': 'Australia',
        '🇳🇿': 'New Zealand'
    };
    
    document.querySelectorAll('.country-flag').forEach(flag => {
        const emoji = flag.textContent.trim();
        const countryName = countryNames[emoji];
        if (countryName) {
            flag.setAttribute('title', countryName);
        }
    });
}

// Call initialization functions
document.addEventListener('DOMContentLoaded', function() {
    initializeCountryTooltips();
});