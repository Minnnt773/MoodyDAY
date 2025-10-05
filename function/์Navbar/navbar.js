// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'linear-gradient(135deg, rgba(102, 126, 234, 0.95) 0%, rgba(118, 75, 162, 0.95) 100%)';
        navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }
});

// Add smooth hover effects (exclude dropdown toggles to prevent conflicts)
document.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
    });

    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
document.head.appendChild(style);