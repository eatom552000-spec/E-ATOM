document.addEventListener('DOMContentLoaded', function() {
    // Hide Loader After Page Load
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        loader.classList.add('loader-hidden');
        initParticles();
    });

    // Theme Toggle
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

    // Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    

    // Intersection Observer for Animations
    const observerOptions = { root: null, threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('calculations')) {
                    entry.target.querySelector('.reveal-text').style.animation = 'reveal 1s ease forwards';
                    entry.target.querySelector('.calculations-intro').style.animation = 'fadeIn 1.5s ease forwards 0.5s';
                    entry.target.querySelectorAll('.calculation-card').forEach((card, index) => {
                        setTimeout(() => { card.classList.add('visible'); }, index * 300);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.calculations').forEach(section => { observer.observe(section); });

    document.querySelectorAll('.calculations').forEach(section => { observer.observe(section); });

    // Stats Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const speed = 50;
            const increment = target / speed;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        });
    }

    // Services Accordion
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('active');
        });
    });

    // Glow Section Logic
    const glowTitle = document.querySelector('.glow-title');
    const glowInput = document.getElementById('glow-input');
    const glowSubmit = document.getElementById('glow-submit');
    let step = 1;
    let userName = '';
    let userSkill = '';
    // Logic لـ Calculations Section
const calcCards = document.querySelectorAll('.calculation-card');
const calcForm = document.getElementById('calculation-form');
const calcFormContainer = document.getElementById('calculation-form-container');
const calcBackBtn = document.getElementById('calculation-back-btn');
let calcStep = 1;
let calcType = '';


calcCards.forEach(card => {
    card.addEventListener('click', () => {
        calcType = card.getAttribute('data-type');
        calcCards.forEach(c => c.style.display = 'none');
        calcForm.style.display = 'block';
        calcBackBtn.style.display = 'block';
        calcStep = 2;

        if (calcType === 'fission') {
            calcFormContainer.innerHTML = `
                <div class="form-box">
                    <h3 class="form-title">Nuclear Fission Calculator</h3>
                    <div class="form-field">
                        <select id="fission-atoms" class="calc-input">
                            <option value="" disabled selected>Number of Atoms</option>
                            <option value="1000">1,000</option>
                            <option value="5000">5,000</option>
                            <option value="10000">10,000</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <select id="fission-type" class="calc-input">
                            <option value="" disabled selected>Type of Atoms</option>
                            <option value="U-235">Uranium-235</option>
                            <option value="Pu-239">Plutonium-239</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <select id="fission-speed" class="calc-input">
                            <option value="" disabled selected>Speed (MeV)</option>
                            <option value="1">1 MeV</option>
                            <option value="2">2 MeV</option>
                            <option value="3">3 MeV</option>
                        </select>
                    </div>
                    <button class="cta-button calc-submit" id="fission-submit"><i class="fas fa-calculator"></i> Send</button>
                </div>
                <div class="calc-result" id="fission-result" style="display: none;"></div>
            `;
        } else if (calcType === 'fusion') {
            calcFormContainer.innerHTML = `
                <div class="form-box">
                    <h3 class="form-title">Nuclear Fusion Calculator</h3>
                    <div class="form-field">
                        <select id="fusion-atoms" class="calc-input">
                            <option value="" disabled selected>Number of Atoms</option>
                            <option value="1000">1,000</option>
                            <option value="5000">5,000</option>
                            <option value="10000">10,000</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <select id="fusion-type" class="calc-input">
                            <option value="" disabled selected>Type of Atoms</option>
                            <option value="H-2">Deuterium (H-2)</option>
                            <option value="H-3">Tritium (H-3)</option>
                        </select>
                    </div>
                    <div class="form-field">
                        <select id="fusion-speed" class="calc-input">
                            <option value="" disabled selected>Speed (MeV)</option>
                            <option value="10">10 MeV</option>
                            <option value="20">20 MeV</option>
                            <option value="30">30 MeV</option>
                        </select>
                    </div>
                    <button class="cta-button calc-submit" id="fusion-submit"><i class="fas fa-calculator"></i> Send</button>
                </div>
                <div class="calc-result" id="fusion-result" style="display: none;"></div>
            `;
        }

        const calcSubmit = document.querySelector('.calc-submit');
        const calcResult = document.querySelector('.calc-result');

        calcSubmit.addEventListener('click', () => {
            let atoms, type, speed, energy;

            if (calcType === 'fission') {
                atoms = document.getElementById('fission-atoms').value;
                type = document.getElementById('fission-type').value;
                speed = document.getElementById('fission-speed').value;
                energy = atoms * speed * 0.1; // معادلة بسيطة للحساب
            } else if (calcType === 'fusion') {
                atoms = document.getElementById('fusion-atoms').value;
                type = document.getElementById('fusion-type').value;
                speed = document.getElementById('fusion-speed').value;
                energy = atoms * speed * 0.2; // معادلة بسيطة للحساب
            }

            if (atoms && type && speed) {
                calcFormContainer.querySelector('.form-box').style.display = 'none';
                calcResult.style.display = 'block';
                calcResult.innerHTML = `
                    <h3 class="result-title">Result: ${energy.toFixed(2)} MeV</h3>
                    <p class="result-text">Calculated for ${atoms} ${type} atoms at ${speed} MeV</p>
                `;
                calcResult.classList.add('visible');
                calcStep = 3;
            }
        });
    });
});

calcBackBtn.addEventListener('click', () => {
    if (calcStep === 2) {
        calcForm.style.display = 'none';
        calcBackBtn.style.display = 'none';
        calcCards.forEach(card => card.style.display = 'block');
        calcStep = 1;
    } else if (calcStep === 3) {
        const calcResult = document.querySelector('.calc-result');
        calcResult.style.display = 'none';
        calcFormContainer.querySelector('.form-box').style.display = 'block';
        calcStep = 2;
    }
});

    // قائمة المهارات وردود ذكية
    const skillResponses = {
        'nuclear fusion': 'Your expertise in Nuclear Fusion is groundbreaking! We’d love to hear your ideas.',
        'quantum computing': 'Quantum Computing is the future! Share your vision with us.',
        'ai': 'AI Development is a game-changer. What’s your next big idea?',
        'sustainable energy': 'Sustainable Energy Design is our passion too! Tell us more.',
        'robotics': 'Advanced Robotics could transform the world. What’s your concept?',
        'default': 'That’s an amazing skill! Let’s see how you can contribute.'
    };

    // قائمة المهارات للاقتراحات الذكية
    const availableSkills = [
        'Nuclear Fusion Research',
        'Quantum Computing',
        'AI Development',
        'Sustainable Energy Design',
        'Advanced Robotics'
    ];

    // قائمة ردود تحليل الأفكار
    const ideaResponses = {
        'energy': 'Your idea could revolutionize energy solutions!',
        'tech': 'This tech-focused idea is incredibly innovative!',
        'research': 'A research-driven concept—brilliant!',
        'design': 'Your design approach is visionary!',
        'robot': 'Robotics in this idea? Mind-blowing!',
        'default': 'What a creative idea! We’re excited to explore it.'
    };

    glowInput.addEventListener('input', () => {
        if (step === 1) {
            const inputValue = glowInput.value.trim().toLowerCase();
            const datalist = document.getElementById('skills-list');
            datalist.innerHTML = '';
            const filteredSkills = availableSkills.filter(skill =>
                skill.toLowerCase().includes(inputValue)
            ).slice(0, 5);
            filteredSkills.forEach(skill => {
                const option = document.createElement('option');
                option.value = skill;
                datalist.appendChild(option);
            });
        }
    });

    glowSubmit.addEventListener('click', () => {
        if (step === 1 && glowInput.value.trim() !== '') {
            userSkill = glowInput.value.trim().toLowerCase();
            let response = skillResponses['default'];
            for (let skill in skillResponses) {
                if (userSkill.includes(skill)) {
                    response = skillResponses[skill];
                    break;
                }
            }
            glowTitle.style.opacity = '0';
            setTimeout(() => {
                glowTitle.textContent = response;
                glowTitle.style.opacity = '1';
                glowInput.value = '';
                glowInput.placeholder = 'Enter Your Name';
                glowInput.removeAttribute('list');
            }, 500);
            step = 2;
        } else if (step === 2 && glowInput.value.trim() !== '') {
            userName = glowInput.value.trim();
            glowTitle.style.opacity = '0';
            setTimeout(() => {
                glowTitle.textContent = `Hi ${userName}`;
                glowTitle.style.opacity = '1';
                glowInput.value = '';
                glowInput.placeholder = 'Share Your Idea';
            }, 500);
            step = 3;
        } else if (step === 3 && glowInput.value.trim() !== '') {
            const userIdea = glowInput.value.trim().toLowerCase();
            let ideaResponse = ideaResponses['default'];
            for (let keyword in ideaResponses) {
                if (userIdea.includes(keyword)) {
                    ideaResponse = ideaResponses[keyword];
                    break;
                }
            }
            glowTitle.style.opacity = '0';
            setTimeout(() => {
                glowTitle.textContent = `${ideaResponse} The Admin Will Review Your Idea`;
                glowTitle.style.opacity = '1';
                glowTitle.style.fontSize = '3em';
                glowTitle.style.textShadow = '0 0 30px var(--primary-color)';
                glowInput.style.transform = 'translateY(20px)';
                glowInput.style.opacity = '0';
                glowSubmit.style.transform = 'translateY(20px)';
                glowSubmit.style.opacity = '0';
            }, 500);
            step = 4;
        }
    });

    // Creativity Section Logic
    const creativityTitle = document.querySelector('.creativity-title');
    const creativityInput = document.getElementById('creativity-input');
    const creativitySubmit = document.getElementById('creativity-submit');
    const creativityOptions = document.getElementById('creativity-options');
    const creativityContent = document.getElementById('creativity-content');
    const infoText = document.getElementById('info-text');
    const infoVideo = document.getElementById('info-video');
    let creativityStep = 1;
    let creativityUserName = '';

    creativitySubmit.addEventListener('click', () => {
        if (creativityStep === 1 && creativityInput.value.trim() !== '') {
            creativityUserName = creativityInput.value.trim();
            creativityTitle.style.opacity = '0';
            setTimeout(() => {
                creativityTitle.textContent = `Welcome to Our Creative World, ${creativityUserName}`;
                creativityTitle.style.opacity = '1';
                creativityInput.style.display = 'none';
                creativitySubmit.style.display = 'none';
                creativityOptions.style.display = 'block';
            }, 500);
            creativityStep = 2;
        }
    });

    creativityOptions.addEventListener('change', () => {
        const selectedOption = creativityOptions.value;
        creativityOptions.style.display = 'none';
        creativityContent.style.display = 'block';

        if (selectedOption === 'fission') {
            infoText.innerHTML = `
                <h3>Nuclear Fission</h3>
                <p>Nuclear fission is a process where the nucleus of an atom splits into two or more smaller nuclei, releasing a large amount of energy. This process is used in nuclear power plants to generate electricity and in nuclear weapons. The reaction is initiated by bombarding a heavy nucleus, like Uranium-235, with a neutron, causing it to split and release more neutrons, which can trigger a chain reaction.</p>
            `;
            infoVideo.innerHTML = `
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/1U6Nzcv9VLE" title="Nuclear Fission Explained" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        } else if (selectedOption === 'fusion') {
            infoText.innerHTML = `
                <h3>Nuclear Fusion</h3>
                <p>Nuclear fusion is the process where two light atomic nuclei combine to form a heavier nucleus, releasing energy in the process. This is the process that powers stars, including the Sun. Fusion has the potential to provide a nearly limitless, clean source of energy on Earth, but it requires extremely high temperatures and pressures to overcome the repulsive forces between the positively charged nuclei.</p>
            `;
            infoVideo.innerHTML = `
                <iframe width="100%" height="315" src="https://www.youtube.com/embed/mZsaaturR6E" title="Nuclear Fusion Explained" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    });

    // Particle Effect with Connecting Lines
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
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

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        init();
        animate();
    }

    // Chatbot Logic (Question-Based with Predefined Questions and Answers)
    let isChatbotInitialized = false;
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotMessages = document.getElementById('chatbot-messages');
    let chatbotInputContainer = document.querySelector('.chatbot-input-container');

    // Ensure chatbotInputContainer exists, create if missing
    if (!chatbotInputContainer) {
        chatbotInputContainer = document.createElement('div');
        chatbotInputContainer.classList.add('chatbot-input-container');
        chatbotContainer.appendChild(chatbotInputContainer);
    }

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotToggle.style.display = 'none';
        if (!isChatbotInitialized) {
            initializeChatbot();
            isChatbotInitialized = true;
        }
    });

    chatbotClose.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotToggle.style.display = 'block';
    });

    // Define the question and answer structure
    const chatbotFlow = {
        initial: {
            question: "Welcome to Eatom AI's Chatbot! What would you like to learn about?",
            options: [
                { text: "What is nuclear fusion?", next: "fusion_definition" },
                { text: "How does Eatom contribute to fusion research?", next: "eatom_role" },
                { text: "Who created this project?", next: "creator_info" }
            ]
        },
        fusion_definition: {
            question: "Nuclear fusion is the process where two light atomic nuclei combine to form a heavier nucleus, releasing energy. It powers stars like the Sun. Want to know more?",
            options: [
                { text: "What fuels are used in fusion?", next: "fusion_fuels" },
                { text: "What are the challenges in fusion?", next: "fusion_challenges" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        fusion_fuels: {
            question: "Fusion typically uses isotopes like Deuterium and Tritium (forms of hydrogen). These are abundant and can produce significant energy. Curious about something else?",
            options: [
                { text: "How is energy extracted from fusion?", next: "energy_extraction" },
                { text: "What are the challenges in fusion?", next: "fusion_challenges" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        energy_extraction: {
            question: "Energy from fusion is captured as heat, which can drive turbines to generate electricity, similar to traditional power plants but cleaner. Want to explore more?",
            options: [
                { text: "What fuels are used in fusion?", next: "fusion_fuels" },
                { text: "What are the challenges in fusion?", next: "fusion_challenges" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        fusion_challenges: {
            question: "Fusion requires extreme temperatures (millions of degrees) and containing the plasma with magnetic fields, which is technologically challenging. More questions?",
            options: [
                { text: "What fuels are used in fusion?", next: "fusion_fuels" },
                { text: "How does Eatom contribute to fusion research?", next: "eatom_role" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        eatom_role: {
            question: "Eatom is pioneering fusion research by developing innovative reactor designs and simulation tools to make fusion energy practical. Interested in more details?",
            options: [
                { text: "What technologies does Eatom use?", next: "eatom_tech" },
                { text: "Who created this project?", next: "creator_info" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        eatom_tech: {
            question: "Eatom uses advanced AI simulations and magnetic confinement techniques to optimize fusion reactors. Want to know more about the project or fusion?",
            options: [
                { text: "What is nuclear fusion?", next: "fusion_definition" },
                { text: "Who created this project?", next: "creator_info" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        creator_info: {
            question: "This project was developed by a team of innovators at Eatom, and the creator is kareem ramy",
            options: [
                { text: "What inspired the creator?", next: "creator_inspiration" },
                { text: "How does Eatom contribute to fusion research?", next: "eatom_role" },
                { text: "Back to main questions", next: "initial" }
            ]
        },
        creator_inspiration: {
            question: "The creator was inspired by the potential of fusion to provide clean, limitless energy, driven by a mission to combat climate change. More to explore?",
            options: [
                { text: "What is nuclear fusion?", next: "fusion_definition" },
                { text: "What technologies does Eatom use?", next: "eatom_tech" },
                { text: "Back to main questions", next: "initial" }
            ]
        }
    };

    function initializeChatbot() {
        // Hide original input and submit button if they exist
        const chatbotInput = document.getElementById('chatbot-input');
        const chatbotSubmit = document.getElementById('chatbot-submit');
        if (chatbotInput) chatbotInput.style.display = 'none';
        if (chatbotSubmit) chatbotSubmit.style.display = 'none';

        // Display initial question
        displayQuestion('initial');
    }

    function displayQuestion(step) {
        const flow = chatbotFlow[step];
        // Add bot message
        const botMessage = document.createElement('div');
        botMessage.classList.add('message', 'bot-message');
        botMessage.textContent = flow.question;
        chatbotMessages.appendChild(botMessage);

        // Clear previous buttons and create new ones
        chatbotInputContainer.innerHTML = '';
        flow.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('chatbot-option-btn');
            button.textContent = option.text;
            button.addEventListener('click', () => {
                // Add user selection as a message
                const userMessage = document.createElement('div');
                userMessage.classList.add('message', 'user-message');
                userMessage.textContent = option.text;
                chatbotMessages.appendChild(userMessage);

                // Scroll to bottom
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

                // Display next question
                setTimeout(() => {
                    displayQuestion(option.next);
                }, 500);
            });
            chatbotInputContainer.appendChild(button);
        });

        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // زر Scroll to Top
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) { // يظهر الزر بعد النزول 300 بكسل
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // تسجيل سلس
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // Hide Loader After Page Load
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        loader.classList.add('loader-hidden');
        initParticles();
    });

    // Theme Toggle
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

    // Hamburger Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Animations
    const observerOptions = { root: null, threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('calculations')) {
                    entry.target.querySelector('.reveal-text').style.animation = 'reveal 1s ease forwards';
                    entry.target.querySelector('.about-intro').style.animation = 'fadeIn 1.5s ease forwards 0.5s';
                    entry.target.querySelectorAll('.about-card').forEach((card, index) => {
                        setTimeout(() => { card.classList.add('visible'); }, index * 300);
                    });
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about').forEach(section => { observer.observe(section); });

    // Stats Animation
    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const speed = 50;
            const increment = target / speed;

            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = Math.ceil(count);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            updateCount();
        });
    }

    // Particle Effect with Connecting Lines
    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
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

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        init();
        animate();
    }

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
// Logic لـ Contact Section
const contactTitle = document.querySelector('.contact-title');
const contactSubtitle = document.querySelector('.contact-subtitle');
const contactButtons = document.querySelector('.contact-buttons');
const contactForm = document.getElementById('contact-form');
const contactResponse = document.getElementById('contact-response');
const sendMessageBtn = document.getElementById('send-message-btn');
const contactSubmit = document.getElementById('contact-submit');
const contactBackBtn = document.getElementById('contact-back-btn');
const responseViewMapBtn = document.getElementById('response-view-map-btn');
const emailError = document.getElementById('email-error');
let contactStep = 1;

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

sendMessageBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (contactStep === 1) {
        contactButtons.style.display = 'none';
        contactForm.style.display = 'block';
        contactBackBtn.style.display = 'block';
        contactStep = 2;
    }
});

contactSubmit.addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    emailError.classList.remove('active');

    if (name && email && message) {
        if (isValidEmail(email)) {
            contactTitle.style.opacity = '0';
            setTimeout(() => {
                contactTitle.textContent = 'Eatom will care of your review';
                contactTitle.style.opacity = '1';
                contactForm.style.display = 'none';
                contactSubtitle.style.display = 'none';
                contactResponse.style.display = 'flex';
                contactBackBtn.style.display = 'block';
            }, 500);
            contactStep = 3;
        } else {
            emailError.textContent = 'Please enter a valid email address!';
            emailError.classList.add('active');
        }
    } else {
        if (!email) {
            emailError.textContent = 'Email is required!';
            emailError.classList.add('active');
        } else if (!isValidEmail(email)) {
            emailError.textContent = 'Please enter a valid email address!';
            emailError.classList.add('active');
        }
    }
});

responseViewMapBtn.addEventListener('click', () => {
    window.open('https://www.google.com/maps/place/123+Future+St,+Tech+City,+Egypt', '_blank');
});

contactBackBtn.addEventListener('click', () => {
    if (contactStep === 2) {
        contactForm.style.display = 'none';
        contactBackBtn.style.display = 'none';
        contactButtons.style.display = 'flex';
        contactStep = 1;
        emailError.classList.remove('active');
    } else if (contactStep === 3) {
        contactTitle.style.opacity = '0';
        setTimeout(() => {
            contactTitle.textContent = 'Contact';
            contactTitle.style.opacity = '1';
            contactSubtitle.style.display = 'block';
            contactButtons.style.display = 'flex';
            contactResponse.style.display = 'none';
            contactBackBtn.style.display = 'none';
        }, 500);
        contactStep = 1;
    }
});

contactSubmit.addEventListener('click', () => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (name && isValidEmail(email) && message) {
        contactTitle.style.opacity = '0';
        setTimeout(() => {
            contactTitle.textContent = 'Eatom will care of your review';
            contactTitle.style.opacity = '1';
            contactForm.style.display = 'none';
            contactSubtitle.style.display = 'none';
            contactResponse.style.display = 'flex';
            contactBackBtn.style.display = 'block';
        }, 500);
        contactStep = 3;
    } else {
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address!');
        } else {
            alert('Please fill in all fields!');
        }
    }
});

responseViewMapBtn.addEventListener('click', () => {
    window.open('https://www.google.com/maps/place/123+Future+St,+Tech+City,+Egypt', '_blank');
});

contactBackBtn.addEventListener('click', () => {
    if (contactStep === 2) {
        contactForm.style.display = 'none';
        contactBackBtn.style.display = 'none';
        contactButtons.style.display = 'flex';
        contactStep = 1;
    } else if (contactStep === 3) {
        contactTitle.style.opacity = '0';
        setTimeout(() => {
            contactTitle.textContent = 'Contact';
            contactTitle.style.opacity = '1';
            contactSubtitle.style.display = 'block';
            contactButtons.style.display = 'flex';
            contactResponse.style.display = 'none';
            contactBackBtn.style.display = 'none';
        }, 500);
        contactStep = 1;
    }
});

});