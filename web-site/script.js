// Modal functionality
function openModal(img) {
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Close modal when clicking outside the image
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Smooth scrolling for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for header
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    header.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = '0';
progressBar.style.left = '0';
progressBar.style.width = '0%';
progressBar.style.height = '4px';
progressBar.style.background = 'linear-gradient(90deg, #667eea, #764ba2)';
progressBar.style.zIndex = '1001';
progressBar.style.transition = 'width 0.3s ease';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
});

// Button hover effect
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
});

// FAQ accordion
document.querySelectorAll('.faq-item h3').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        parent.classList.toggle('active');
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
let isLightTheme = false;

themeToggle.addEventListener('click', () => {
    toggleTheme();
});

function toggleTheme() {
    isLightTheme = !isLightTheme;
    document.body.classList.toggle('light-theme');
    themeToggle.textContent = isLightTheme ? '☀️' : '🌙';
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');

    // Change image sources based on theme
    const images = document.querySelectorAll('.gallery img');
    const themeFolder = isLightTheme ? 'images/light/' : 'images/dark/';
    images.forEach(img => {
        const src = img.src.split('/').pop();
        img.src = themeFolder + src;
    });
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    toggleTheme();
}

// Draggable theme toggle
let isDragging = false;
let startY;
let currentY;

themeToggle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
    startY = e.clientY;
    themeToggle.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    currentY = e.clientY;
    const deltaY = currentY - startY;

    if (deltaY > 50) { // Pulled down
        themeToggle.style.transform = 'translateY(100px)';
        setTimeout(() => {
            themeToggle.style.transform = 'translateY(0) scale(1.2)';
            setTimeout(() => {
                themeToggle.style.transform = 'translateY(0) scale(1)';
                toggleTheme();
            }, 300);
        }, 200);
        isDragging = false;
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        themeToggle.style.transform = 'translateY(0)';
        themeToggle.style.cursor = 'grab';
        isDragging = false;
    }
});