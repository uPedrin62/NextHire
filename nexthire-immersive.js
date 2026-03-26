// NextHire Immersive JavaScript - Funcionalidades Comuns

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, input, .clickable').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Particles Background
function initParticles(particleCount = 80) {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 1.5 + 0.5
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 191, 255, 0.4)';
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        });
        
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// GSAP Animations
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Fade in elements
    gsap.utils.toArray('.fade-in').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Slide in from left
    gsap.utils.toArray('.slide-left').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            },
            opacity: 0,
            x: -100,
            duration: 1
        });
    });
    
    // Slide in from right
    gsap.utils.toArray('.slide-right').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%'
            },
            opacity: 0,
            x: 100,
            duration: 1
        });
    });
}

// Page Transition
function pageTransition(url) {
    if (typeof gsap !== 'undefined') {
        gsap.to('body', {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                window.location.href = url;
            }
        });
    } else {
        window.location.href = url;
    }
}

// Show Alert
function showAlert(message, type = 'success') {
    const alert = document.getElementById('alert');
    if (!alert) return;
    
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.display = 'block';
    
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000);
}

// Initialize everything on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    initCustomCursor();
    initParticles();
    initAnimations();
    
    // Add immersive classes to existing elements
    document.querySelectorAll('button:not(.btn-immersive)').forEach(btn => {
        if (!btn.classList.contains('btn-login') && 
            !btn.classList.contains('btn-register') &&
            !btn.classList.contains('zoom-btn-immersive')) {
            btn.classList.add('btn-immersive');
        }
    });
    
    document.querySelectorAll('input:not(.input-immersive)').forEach(input => {
        if (!input.classList.contains('form-control-immersive') &&
            !input.classList.contains('form-control')) {
            input.classList.add('input-immersive');
        }
    });
}
