// Skills array with icons
const skills = [
    { name: "Requirement Analysis", icon: "📋" },
    { name: "Change Management", icon: "🔄" },
    { name: "Data Analysis", icon: "📊" },
    { name: "3rd Party Integration", icon: "🔗" },
    { name: "UML", icon: "📐" },
    { name: "BRD", icon: "📄" },
    { name: "Backlog", icon: "📝" },
    { name: "User Stories", icon: "👥" },
    { name: "Prioritization", icon: "🎯" },
    { name: "Stakeholder Management", icon: "🤝" },
    { name: "BPM", icon: "⚙️" },
    { name: "Sprint & Release Planning", icon: "📅" },
    { name: "Agile-Scrum", icon: "🏃" },
    { name: "Kanban", icon: "📌" },
    { name: "JIRA", icon: "🎫" },
    { name: "Postman", icon: "📮" },
    { name: "SQL", icon: "🗄️" },
    { name: "Figma-Lucid", icon: "🎨" },
    { name: "Kafka", icon: "📡" },
    { name: "RESTful", icon: "🌐" },
    { name: "Websocket", icon: "🔌" },
    { name: ".NET", icon: "💻" },
    { name: "Javascript", icon: "⚡" }
];

// Global variables
let isSpinning = false;
let currentRotation = 0;
let selectedSkills = [];
let wheelCanvas, wheelCtx;

// Color palette for wheel segments
const colors = [
    '#E63946', '#DC2F02', '#0077B6', '#023E8A',
    '#E63946', '#DC2F02', '#0077B6', '#023E8A',
    '#E63946', '#DC2F02', '#0077B6', '#023E8A',
    '#E63946', '#DC2F02', '#0077B6', '#023E8A',
    '#E63946', '#DC2F02', '#0077B6', '#023E8A',
    '#E63946', '#DC2F02', '#0077B6', '#023E8A'
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeWheel();
    initializeNavigation();
    initializeScrollAnimations();
    initializeContactForm();
    selectRandomSkills();
});

// Initialize the spin wheel
function initializeWheel() {
    wheelCanvas = document.getElementById('skillWheel');
    wheelCtx = wheelCanvas.getContext('2d');
    
    // Set canvas size
    const size = 200;
    wheelCanvas.width = size;
    wheelCanvas.height = size;
    
    // Draw initial wheel
    drawWheel();
    
    // Add spin button event listener
    document.getElementById('spinButton').addEventListener('click', spinWheel);
}

// Draw the wheel with skills
function drawWheel() {
    const centerX = wheelCanvas.width / 2;
    const centerY = wheelCanvas.height / 2;
    const radius = 90;
    const anglePerSegment = (2 * Math.PI) / skills.length;
    
    // Clear canvas
    wheelCtx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
    
    // Draw segments
    skills.forEach((skill, index) => {
        const startAngle = index * anglePerSegment + currentRotation;
        const endAngle = (index + 1) * anglePerSegment + currentRotation;
        
        // Draw segment
        wheelCtx.beginPath();
        wheelCtx.moveTo(centerX, centerY);
        wheelCtx.arc(centerX, centerY, radius, startAngle, endAngle);
        wheelCtx.closePath();
        wheelCtx.fillStyle = colors[index % colors.length];
        wheelCtx.fill();
        
        // Draw border
        wheelCtx.strokeStyle = '#FFFFFF';
        wheelCtx.lineWidth = 2;
        wheelCtx.stroke();
        
        // Draw skill text
        const textAngle = startAngle + anglePerSegment / 2;
        const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
        const textY = centerY + Math.sin(textAngle) * (radius * 0.7);
        
        wheelCtx.save();
        wheelCtx.translate(textX, textY);
        wheelCtx.rotate(textAngle + Math.PI / 2);
        wheelCtx.fillStyle = '#FFFFFF';
        wheelCtx.font = 'bold 10px Poppins';
        wheelCtx.textAlign = 'center';
        wheelCtx.fillText(skill.name.split(' ')[0], 0, 0);
        wheelCtx.restore();
    });
    
    // Draw center circle
    wheelCtx.beginPath();
    wheelCtx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    wheelCtx.fillStyle = '#FFFFFF';
    wheelCtx.fill();
    wheelCtx.strokeStyle = '#E63946';
    wheelCtx.lineWidth = 3;
    wheelCtx.stroke();
}

// Spin the wheel
function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    spinButton.disabled = true;
    spinButton.textContent = 'SPINNING...';
    
    // Random rotation (3-5 full rotations + random angle)
    const randomRotations = 3 + Math.random() * 2;
    const randomAngle = Math.random() * 2 * Math.PI;
    const totalRotation = randomRotations * 2 * Math.PI + randomAngle;
    
    // Animation duration
    const duration = 3000;
    const startTime = performance.now();
    const startRotation = currentRotation;
    
    // Easing function for smooth deceleration
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        currentRotation = startRotation + (totalRotation * easedProgress);
        drawWheel();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation complete
            isSpinning = false;
            spinButton.disabled = false;
            spinButton.textContent = 'SPIN';
            
            // Select new random skills
            selectRandomSkills();
        }
    }
    
    requestAnimationFrame(animate);
}

// Select 3 random skills to display
function selectRandomSkills() {
    const shuffled = [...skills].sort(() => 0.5 - Math.random());
    selectedSkills = shuffled.slice(0, 3);
    updateSkillDisplay();
}

// Update the skill display
function updateSkillDisplay() {
    const skillDisplay = document.getElementById('skillDisplay');
    skillDisplay.innerHTML = '';
    
    selectedSkills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `${skill.icon} ${skill.name}`;
        skillDisplay.appendChild(skillItem);
    });
}

// Initialize smooth navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.timeline-item, .project-card, .highlight-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize contact form
function initializeContactForm() {
    const form = document.querySelector('.contact-form form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelector('input[type="email"]').value;
        const message = form.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Add hover effects to floating cards
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero && heroVisual) {
        const rate = scrolled * -0.5;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Typing effect removed for better HTML compatibility

// Add skill wheel glow effect on hover
document.addEventListener('DOMContentLoaded', function() {
    const wheelContainer = document.querySelector('.wheel-wrapper');
    
    wheelContainer.addEventListener('mouseenter', function() {
        this.style.filter = 'drop-shadow(0 0 20px rgba(230, 57, 70, 0.5))';
    });
    
    wheelContainer.addEventListener('mouseleave', function() {
        this.style.filter = 'none';
    });
});

// Add mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && document.activeElement.id === 'spinButton') {
        spinWheel();
    }
});

// Add touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const spinButton = document.getElementById('spinButton');
    
    spinButton.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
    });
    
    spinButton.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1)';
        if (!isSpinning) {
            spinWheel();
        }
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
