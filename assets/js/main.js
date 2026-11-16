/* ==========================================================================
   JOHN PAUL CUEVAS - PORTFOLIO MAIN JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. THEME TOGGLE (DARK / LIGHT MODE WITH LOCALSTORAGE)
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const htmlElement = document.documentElement;

    // Kunin ang nakaraang theme setting mula sa localStorage o i-default sa 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'bi bi-sun-fill';
            themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
        } else {
            themeIcon.className = 'bi bi-moon-fill';
            themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
        }
    }


    // 2. HERO TYPEWRITER EFFECT
    const typewriterElement = document.getElementById('typewriterText');
    if (typewriterElement) {
        const roles = [
            "Web Developer & IT Specialist",
            "Unity VR Developer & C#",
            "Full-Stack Enthusiast",
            "Network & Systems Troubleshooter"
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeWriter() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2200; // Tagal ng pahinga kapag nabuo na ang salita
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400;
            }

            setTimeout(typeWriter, typingSpeed);
        }

        setTimeout(typeWriter, 1200);
    }


    // 3. DYNAMIC PROJECT FILTERING
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Alisin ang active class sa ibang buttons at ilipat sa pinindot
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });


    // 4. CONTACT FORM VALIDATION & FORMSPREE AJAX SUBMISSION
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async event => {
            event.preventDefault();
            event.stopPropagation();

            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }

            contactForm.classList.add('was-validated');
            
            // I-disable muna ang button habang nagse-send
            const originalBtnHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formAlert.className = 'alert alert-success mt-4';
                    formAlert.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message sent! Thank you for reaching out—I will get back to you soon.';
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formAlert.className = 'alert alert-danger mt-4';
                formAlert.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Oops! Something went wrong. Please email me directly instead.';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // 5. AUTOMATIC COPYRIGHT YEAR
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});