document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');
    const avatarPreview = document.getElementById('avatarPreview');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    initializeGlowEffects();
    createBubbleAnimation();
    
    loginForm.addEventListener('submit', handleLogin);
    
    emailInput.addEventListener('input', clearMessages);
    passwordInput.addEventListener('input', clearMessages);
    
    function handleLogin(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email) {
            showMessage('Por favor ingresa tu email', 'error');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor ingresa un email válido', 'error');
            emailInput.focus();
            return;
        }
        
        if (password.length < 8) {
            showMessage('La contraseña debe tener al menos 8 caracteres', 'error');
            passwordInput.focus();
            return;
        }
        
        const submitButton = loginForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<div class="loading-spinner"></div> Ingresando...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            const success = window.FotoStudio.login(email, password);
            
            if (success) {
                showMessage('¡Bienvenido! Redirigiendo...', 'success');
                showAvatarPreview();
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showMessage('Credenciales inválidas. Intenta nuevamente.', 'error');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                passwordInput.focus();
                passwordInput.select();
            }
        }, 1000);
    }
    
    function showMessage(message, type) {
        loginMessage.innerHTML = `<div class="login-${type}">${message}</div>`;
        loginMessage.classList.add('fade-in');
    }
    
    function clearMessages() {
        loginMessage.innerHTML = '';
        loginMessage.classList.remove('fade-in');
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showAvatarPreview() {
        const randomAvatar = window.FotoStudio.getRandomAvatar();
        avatarPreview.src = randomAvatar || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"%3E%3Ccircle cx="30" cy="30" r="30" fill="%237033ff"/%3E%3Ctext x="30" y="35" text-anchor="middle" fill="white" font-size="20" font-weight="bold"%3EU%3C/text%3E%3C/svg%3E';
        avatarPreview.classList.add('show');
    }
    
    function createBubbleAnimation() {
        const container = document.querySelector('.login-container');
        const bubbleCount = 12;
        
        for (let i = 0; i < bubbleCount; i++) {
            setTimeout(() => {
                createBubble(container);
            }, i * 500);
        }
        
        setInterval(() => {
            createBubble(container);
        }, 3000);
    }
    
    function createBubble(container) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        
        const size = Math.random() * 80 + 40;
        const leftPosition = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 8;
        const delay = Math.random() * 2;
        
        bubble.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${leftPosition}%;
            animation-duration: ${animationDuration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(bubble);
        
        setTimeout(() => {
            if (bubble.parentNode) {
                bubble.remove();
            }
        }, (animationDuration + delay) * 1000);
    }
    
    emailInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            passwordInput.focus();
        }
    });
    
    passwordInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
    });
    
    const inputs = [emailInput, passwordInput];
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
        
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentNode.classList.add('has-value');
            } else {
                this.parentNode.classList.remove('has-value');
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            clearMessages();
            emailInput.focus();
        }
    });
    
    setTimeout(() => {
        emailInput.focus();
    }, 500);
});