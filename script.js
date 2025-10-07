document.addEventListener('DOMContentLoaded', function() {
    /* Particle Animation Setup */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100);
    const colors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8AB4F8'];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDistance = 80;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.hypot(dx, dy);
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color;
                    ctx.globalAlpha = 1 - (distance / maxDistance);
                    ctx.lineWidth = 0.8;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    init();
    animate();

    /* Theme Toggle Functionality */
    const themeBtn = document.getElementById('theme-btn');
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    /* Transition Animation with Sound */
    const continueBtn = document.getElementById('continue-btn');
    if (continueBtn) {
        // إنشاء كائنات الصوت
        const clickSound = new Audio('click.mp3');
        const explosionSound = new Audio('explosion.mp3');

        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();

            // تشغيل صوت الكليك عند الضغط
            clickSound.play().catch(error => console.log("Error playing click sound:", error));

            const hero = document.querySelector('.hero');
            if (hero) {
                hero.classList.add('fade-out');
            } else {
                console.error('Hero section not found!');
            }

            setTimeout(() => {
                const transitionScreen = document.getElementById('transition-screen');
                const transitionCanvas = document.getElementById('transition-canvas');
                const transitionCtx = transitionCanvas.getContext('2d');
                const eatomText = document.getElementById('eatom-text');

                if (transitionScreen && transitionCanvas && eatomText) {
                    transitionScreen.classList.remove('hidden');
                    transitionScreen.classList.add('active');
                    transitionCanvas.width = window.innerWidth;
                    transitionCanvas.height = window.innerHeight;

                    const centerX = window.innerWidth / 2;
                    const centerY = window.innerHeight / 2;
                    const particles = [
                        { x: window.innerWidth * 0.1, y: centerY, vx: 4, vy: 0, size: 30, color: '#ff4500', label: 'H' },
                        { x: window.innerWidth * 0.9, y: centerY, vx: -4, vy: 0, size: 30, color: '#ff8c00', label: 'H' }
                    ];

                    let stage = 'approach';
                    let angle1 = 0;
                    let angle2 = Math.PI;
                    let radius = 80;
                    let orbitCount = 0;

                    function drawParticles() {
                        transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);

                        if (stage === 'approach') {
                            particles[0].x += particles[0].vx;
                            particles[1].x += particles[1].vx;
                            if (Math.abs(particles[0].x - particles[1].x) < 200) {
                                stage = 'orbit';
                            }
                        } else if (stage === 'orbit') {
                            angle1 += 0.12;
                            angle2 += 0.12;
                            particles[0].x = centerX + Math.cos(angle1) * radius;
                            particles[0].y = centerY + Math.sin(angle1) * radius;
                            particles[1].x = centerX + Math.cos(angle2) * radius;
                            particles[1].y = centerY + Math.sin(angle2) * radius;
                            orbitCount += 0.12;
                            if (orbitCount > 6 * Math.PI) {
                                stage = 'collide';
                            }
                        } else if (stage === 'collide') {
                            explode();
                            return;
                        }

                        particles.forEach(particle => {
                            transitionCtx.beginPath();
                            transitionCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                            transitionCtx.fillStyle = particle.color;
                            transitionCtx.fill();
                            transitionCtx.shadowBlur = 25;
                            transitionCtx.shadowColor = particle.color;

                            transitionCtx.font = 'bold 24px Poppins';
                            transitionCtx.fillStyle = '#fff';
                            transitionCtx.textAlign = 'center';
                            transitionCtx.textBaseline = 'middle';
                            transitionCtx.fillText(particle.label, particle.x, particle.y);
                        });

                        transitionCtx.beginPath();
                        transitionCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                        transitionCtx.lineWidth = 3;
                        transitionCtx.moveTo(particles[0].x, particles[0].y);
                        transitionCtx.lineTo(particles[1].x, particles[1].y);
                        transitionCtx.stroke();

                        requestAnimationFrame(drawParticles);
                    }

                    function explode() {
                        const explosionColors = [
                            '#ff4500', '#ff6a00', '#ff8c00', '#ffaa00', '#ffc300',
                            '#ffe100', '#ffff00', '#ffcc00', '#ff9900', '#ff6600',
                            '#ffffff', '#ffffcc', '#ffeeaa'
                        ];

                        let preExplosionGlow = 0;
                        const maxGlow = 60;

                        function animatePreExplosion() {
                            transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);
                            transitionCtx.beginPath();
                            transitionCtx.arc(centerX, centerY, 30, 0, Math.PI * 2);
                            transitionCtx.fillStyle = '#ffffff';
                            transitionCtx.shadowBlur = preExplosionGlow;
                            transitionCtx.shadowColor = '#ff4500';
                            transitionCtx.fill();

                            preExplosionGlow += 3;
                            if (preExplosionGlow <= maxGlow) {
                                requestAnimationFrame(animatePreExplosion);
                            } else {
                                // تشغيل صوت الانفجار هنا
                                explosionSound.play().catch(error => console.log("Error playing explosion sound:", error));
                                startMainExplosion();
                            }
                        }

                        function startMainExplosion() {
                            const explosionParticles = [];
                            const particleGroups = [
                                { count: 180, sizeRange: [5, 12], speedRange: [5, 15], lifeDecay: 0.01 },
                                { count: 250, sizeRange: [1, 5], speedRange: [12, 22], lifeDecay: 0.015 },
                                { count: 100, sizeRange: [8, 20], speedRange: [3, 8], lifeDecay: 0.007, smoke: true },
                                { count: 1, isShockwave: true }
                            ];

                            particleGroups.forEach(group => {
                                if (group.isShockwave) {
                                    explosionParticles.push({
                                        x: centerX,
                                        y: centerY,
                                        size: 5,
                                        maxSize: Math.max(transitionCanvas.width, transitionCanvas.height),
                                        isShockwave: true,
                                        life: 1
                                    });
                                    return;
                                }

                                for (let i = 0; i < group.count; i++) {
                                    const angle = Math.random() * Math.PI * 2;
                                    const speed = Math.random() * (group.speedRange[1] - group.speedRange[0]) + group.speedRange[0];
                                    const size = Math.random() * (group.sizeRange[1] - group.sizeRange[0]) + group.sizeRange[0];

                                    explosionParticles.push({
                                        x: centerX,
                                        y: centerY,
                                        vx: Math.cos(angle) * speed * (Math.random() * 0.4 + 0.8),
                                        vy: Math.sin(angle) * speed * (Math.random() * 0.4 + 0.8),
                                        size: size,
                                        originalSize: size,
                                        color: group.smoke
                                            ? `rgba(${50 + Math.random() * 50}, ${50 + Math.random() * 50}, ${50 + Math.random() * 50}, 0.7)`
                                            : explosionColors[Math.floor(Math.random() * explosionColors.length)],
                                        life: 1,
                                        lifeDecay: group.lifeDecay * (Math.random() * 0.5 + 0.7),
                                        smoke: group.smoke || false,
                                        gravity: group.smoke ? -0.02 : 0.1,
                                        rotation: Math.random() * Math.PI * 2,
                                        rotationSpeed: (Math.random() - 0.5) * 0.2
                                    });
                                }
                            });

                            function animateExplosion() {
                                transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);

                                let particlesRemaining = false;
                                for (let i = explosionParticles.length - 1; i >= 0; i--) {
                                    let p = explosionParticles[i];

                                    if (p.isShockwave) {
                                        p.size += (p.maxSize - p.size) * 0.06;
                                        p.life -= 0.03;

                                        if (p.life > 0) {
                                            transitionCtx.beginPath();
                                            transitionCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                                            transitionCtx.strokeStyle = `rgba(255, 255, 255, ${p.life * 0.7})`;
                                            transitionCtx.lineWidth = 2;
                                            transitionCtx.stroke();
                                            particlesRemaining = true;
                                        }
                                    } else {
                                        p.x += p.vx;
                                        p.y += p.vy;
                                        p.vy += p.gravity;
                                        p.life -= p.lifeDecay;
                                        p.rotation += p.rotationSpeed;

                                        if (!p.smoke) {
                                            p.size = p.originalSize * p.life;
                                        }

                                        if (p.life > 0) {
                                            transitionCtx.save();
                                            transitionCtx.translate(p.x, p.y);
                                            transitionCtx.rotate(p.rotation);

                                            if (p.smoke) {
                                                transitionCtx.beginPath();
                                                transitionCtx.arc(0, 0, p.size, 0, Math.PI * 2);
                                                transitionCtx.fillStyle = p.color.replace(')', `, ${p.life * 0.7})`).replace('rgba', 'rgba');
                                                transitionCtx.fill();
                                            } else {
                                                transitionCtx.beginPath();
                                                if (Math.random() > 0.5) {
                                                    transitionCtx.arc(0, 0, p.size, 0, Math.PI * 2);
                                                } else {
                                                    transitionCtx.rect(-p.size/2, -p.size/2, p.size, p.size);
                                                }
                                                transitionCtx.fillStyle = p.color;
                                                transitionCtx.shadowBlur = p.size * 2;
                                                transitionCtx.shadowColor = p.color;
                                                transitionCtx.fill();
                                            }

                                            transitionCtx.restore();
                                            particlesRemaining = true;
                                        }
                                    }
                                }

                                if (particlesRemaining) {
                                    requestAnimationFrame(animateExplosion);
                                } else {
                                    showEatomText();
                                }
                            }

                            animateExplosion();
                        }

                        animatePreExplosion();
                    }

                    function showEatomText() {
                        const text = "Eatom";
                        let currentChar = 0;

                        transitionCtx.fillStyle = '#000';
                        transitionCtx.fillRect(0, 0, transitionCanvas.width, transitionCanvas.height);

                        function typeText() {
                            if (currentChar <= text.length) {
                                transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);
                                transitionCtx.fillStyle = '#000';
                                transitionCtx.fillRect(0, 0, transitionCanvas.width, transitionCanvas.height);

                                transitionCtx.font = 'bold 120px Poppins';
                                transitionCtx.fillStyle = '#fff';
                                transitionCtx.textAlign = 'center';
                                transitionCtx.textBaseline = 'middle';
                                transitionCtx.shadowBlur = 20;
                                transitionCtx.shadowColor = '#ff4500';
                                transitionCtx.fillText(text.substring(0, currentChar), centerX, centerY);

                                if (currentChar < text.length) {
                                    const textWidth = transitionCtx.measureText(text.substring(0, currentChar)).width;
                                    transitionCtx.beginPath();
                                    transitionCtx.strokeStyle = '#ff4500';
                                    transitionCtx.lineWidth = 4;
                                    transitionCtx.moveTo(centerX + textWidth / 2 + 10, centerY - 40);
                                    transitionCtx.lineTo(centerX + textWidth / 2 + 10, centerY + 40);
                                    transitionCtx.stroke();
                                }

                                currentChar++;
                                setTimeout(typeText, 200);
                            } else {
                                let glow = 20;
                                function fadeGlow() {
                                    if (glow > 0) {
                                        transitionCtx.clearRect(0, 0, transitionCanvas.width, transitionCanvas.height);
                                        transitionCtx.fillStyle = '#000';
                                        transitionCtx.fillRect(0, 0, transitionCanvas.width, transitionCanvas.height);
                                        transitionCtx.shadowBlur = glow;
                                        transitionCtx.fillText(text, centerX, centerY);
                                        glow -= 1;
                                        requestAnimationFrame(fadeGlow);
                                    } else {
                                        setTimeout(() => {
                                            window.location.href = 'index.html';
                                        }, 100);
                                    }
                                }
                                fadeGlow();
                            }
                        }

                        typeText();
                    }

                    drawParticles();
                } else {
                    console.error('Transition elements not found!');
                    window.location.href = 'index.html';
                }
            }, 1000);
        });
    }

    /* Contact Form Submission */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            console.log('Form submitted:', { name, email, message });
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(successMessage);
            contactForm.reset();
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    /* Project Filter Functionality */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterButtons.length > 0 && projectItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                projectItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 500);
                    }
                });
            });
        });
    }

    /* Scroll Animation */
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    /* Smooth Scrolling */
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* Mobile Menu Toggle */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }

    console.log('JavaScript initialization complete!');
});