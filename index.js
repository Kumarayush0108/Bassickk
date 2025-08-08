// Efficient Portfolio Script
class PortfolioManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeAnimations();
        this.setupIntersectionObserver();
        this.showLoader();
    }

    bindEvents() {
        // Navigation events
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Resume download
        const resumeBtn = document.getElementById('downloadResume');
        resumeBtn?.addEventListener('click', (e) => this.downloadResume(e));

        // Back to top button
        const backToTop = document.getElementById('backToTop');
        backToTop?.addEventListener('click', () => this.scrollToTop());

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());

        // Button ripple effects
        this.addRippleEffects();
    }

    showLoader() {
        window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    this.initializeCounters();
                    this.initializeSkillBars();
                }, 500);
            }, 2000);
        });
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
    }

    scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleScroll() {
        this.updateActiveNavLink();
        this.updateNavbarBackground();
        this.toggleBackToTopButton();
        this.addParallaxEffect();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 80) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    updateNavbarBackground() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        }
    }

    toggleBackToTopButton() {
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }

    addParallaxEffect() {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.floating-shapes');
        const speed = 0.3;
        
        shapes.forEach(shape => {
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    downloadResume(e) {
        const btn = e.target.closest('.resume-btn');
        const originalHTML = btn.innerHTML;
        
        // Visual feedback
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Downloading...</span>';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.disabled = true;
        
        // Create download link
        const link = document.createElement('a');
        // Replace with your actual resume file path
        link.href = 'your-resume.pdf'; 
        link.download = 'Your_Name_Resume.pdf';
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Reset button
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i><span>Downloaded!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
                btn.disabled = false;
            }, 2000);
        }, 1000);
    }

    initializeCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = { threshold: 0.7 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }

    initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observerOptions = { threshold: 0.5 };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const skillPercentage = bar.getAttribute('data-skill');
                    setTimeout(() => {
                        bar.style.width = skillPercentage + '%';
                    }, 500);
                    observer.unobserve(bar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => observer.observe(bar));
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('[data-aos]').forEach(element => {
            observer.observe(element);
        });
    }

    initializeAnimations() {
        // 3D hover effects for cards
        document.querySelectorAll('.tool-card, .tech-card, .hobby-card, .contact-card, .cert-card, .project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => this.apply3DHover(e, card));
            card.addEventListener('mouseleave', () => this.remove3DHover(card));
            card.addEventListener('mousemove', (e) => this.update3DHover(e, card));
        });

        // Timeline animations
        this.initializeTimelineAnimations();

        // Project image hover effects
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
            });
        });
    }

    apply3DHover(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
    }

    update3DHover(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(15px)`;
    }

    remove3DHover(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    }

    initializeTimelineAnimations() {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.timeline-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = `all 0.8s ease ${index * 0.2}s`;
            timelineObserver.observe(item);
        });
    }

    addRippleEffects() {
        document.querySelectorAll('.btn, .tool-btn, .tech-btn, .hobby-btn, .contact-btn, .cert-btn, .exp-btn, .project-btn').forEach(button => {
            button.addEventListener('click', (e) => this.createRipple(e, button));
        });
    }

    createRipple(e, button) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
}

// Global functions for button clicks
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
}

function openLink(url) {
    window.open(url, '_blank');
}

function openMusicApp() {
    // Music app integration - customize these URLs with your actual profiles
    const musicPlatforms = {
        spotify: 'https://open.spotify.com/user/yourusername',
        appleMusic: 'https://music.apple.com/profile/yourusername',
        soundcloud: 'https://soundcloud.com/yourusername',
        youtubeMusic: 'https://music.youtube.com/channel/yourchannelid'
    };
    
    // You can customize this to detect user's preferred platform or show options
    // For now, it opens Spotify by default
    window.open(musicPlatforms.spotify, '_blank');
    
    // Optional: Show platform selection
    // const platform = prompt('Choose music platform:\n1. Spotify\n2. Apple Music\n3. SoundCloud\n4. YouTube Music\nEnter 1-4:');
    // const platforms = Object.values(musicPlatforms);
    // if (platform >= 1 && platform <= 4) {
    //     window.open(platforms[platform - 1], '_blank');
    // }
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes typeWriter {
        from { width: 0; }
        to { width: 100%; }
    }
    
    @keyframes blink {
        from, to { border-color: transparent; }
        50% { border-color: white; }
    }
`;
document.head.appendChild(styleSheet);

// Performance optimizations
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();
    lazyLoadImages();
    
    console.log(`
🚀 Portfolio Loaded Successfully!
💻 Built with Modern Web Technologies
🎨 Optimized for Performance & UX
📱 Fully Responsive Design
✨ Interactive Animations & Effects

Features:
✅ Efficient Code Structure
✅ Modern ES6+ JavaScript
✅ Responsive Design
✅ Interactive Animations
✅ Resume Download
✅ Music App Integration
✅ Real-time Link Integration
✅ Performance Optimized
    `);
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Portfolio Error:', e.message);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('nav-menu')?.classList.remove('active');
        document.getElementById('hamburger')?.classList.remove('active');
    }
});

// Service Worker for performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(() => console.log('Service Worker registered'))
            .catch(() => console.log('Service Worker registration failed'));
    });
}

// Analytics and performance monitoring
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Portfolio loaded in ${Math.round(loadTime)}ms`);
    
    // Optional: Send analytics data
    // Analytics.track('portfolio_loaded', { loadTime: Math.round(loadTime) });
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels where needed
    document.querySelectorAll('button:not([aria-label])').forEach(btn => {
        const text = btn.textContent.trim();
        if (text) btn.setAttribute('aria-label', text);
    });
    
    // Add focus indicators
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
}

// Initialize accessibility improvements
document.addEventListener('DOMContentLoaded', improveAccessibility);

// Export for testing purposes
window.PortfolioManager = PortfolioManager;
