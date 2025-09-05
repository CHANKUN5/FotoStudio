window.FotoStudio = {
    currentUser: null,
    currentAvatar: null,
    
    avatars: [
        'assets/avatar1.png',
        'assets/avatar2.png',
        'assets/avatar3.png',
        'assets/avatar4.png',
        'assets/avatar5.png',
        'assets/avatar6.png',
        'assets/avatar7.png',
        'assets/avatar8.png'
    ],
    
    init() {
        this.loadUserFromStorage();
        this.checkAuth();
        this.initNavigation();
    },
    
    loadUserFromStorage() {
        const savedUser = localStorage.getItem('fotostudio_user');
        const savedAvatar = localStorage.getItem('fotostudio_avatar');
        
        if (savedUser && savedAvatar) {
            this.currentUser = JSON.parse(savedUser);
            this.currentAvatar = savedAvatar;
            this.updateUserInfo();
        }
    },
    
    checkAuth() {
        const isLoginPage = window.location.pathname.includes('login.html') || window.location.pathname === '/';
        const isAuthenticated = this.currentUser !== null;
        
        if (!isAuthenticated && !isLoginPage) {
            window.location.href = 'login.html';
        }
    },
    
    login(email, password) {
        if (email && password.length >= 8) {
            this.currentUser = {
                email: email,
                name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                loginTime: new Date()
            };
            this.currentAvatar = this.getRandomAvatar();
            localStorage.setItem('fotostudio_user', JSON.stringify(this.currentUser));
            localStorage.setItem('fotostudio_avatar', this.currentAvatar);
            this.updateUserInfo();
            return true;
        }
        return false;
    },
    
    logout() {
        this.currentUser = null;
        this.currentAvatar = null;
        localStorage.removeItem('fotostudio_user');
        localStorage.removeItem('fotostudio_avatar');
        window.location.href = 'login.html';
    },
    
    getRandomAvatar() {
        // Si ya existe un avatar guardado en localStorage, lo devolvemos
        const savedAvatar = localStorage.getItem('fotostudio_avatar');
        if (savedAvatar && this.avatars.includes(savedAvatar)) {
            return savedAvatar;
        }
        
        // Generamos un avatar basado en el email del usuario para que sea consistente
        if (this.currentUser && this.currentUser.email) {
            // Usamos el hash simple del email para determinar el avatar
            const emailHash = this.simpleHash(this.currentUser.email);
            const avatarIndex = emailHash % this.avatars.length;
            return this.avatars[avatarIndex];
        }
        
        // Si no hay usuario, generamos uno aleatorio
        const randomIndex = Math.floor(Math.random() * this.avatars.length);
        return this.avatars[randomIndex];
    },
    
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convertir a entero de 32 bits
        }
        return Math.abs(hash);
    },
    
    navigate(page) {
        window.location.href = page;
    },
    
    initNavigation() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-nav');
                this.navigate(page);
            }
            
            if (e.target.matches('[data-logout]')) {
                e.preventDefault();
                this.logout();
            }
        });
    },
    
    updateUserInfo() {
        const userNameElements = document.querySelectorAll('[data-user-name]');
        const userAvatarElements = document.querySelectorAll('[data-user-avatar]');
        
        userNameElements.forEach(element => {
            if (this.currentUser) {
                element.textContent = this.currentUser.name;
            }
        });
        
        userAvatarElements.forEach(element => {
            if (this.currentAvatar) {
                if (element.tagName === 'IMG') {
                    element.src = this.currentAvatar;
                    element.alt = `Avatar de ${this.currentUser ? this.currentUser.name : 'Usuario'}`;
                } else {
                    element.style.backgroundImage = `url(${this.currentAvatar})`;
                }
            }
        });
    },
    
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fade-in`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            color: white;
            font-weight: 500;
            z-index: 1000;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #059669, #10b981)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #dc2626, #ef4444)';
        } else if (type === 'warning') {
            notification.style.background = 'linear-gradient(135deg, #d97706, #f59e0b)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #7033ff, #8a4dff)';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    },
    
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN'
        }).format(amount);
    },
    
    formatDate(date) {
        return new Intl.DateTimeFormat('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    },
    
    formatDateTime(date) {
        return new Intl.DateTimeFormat('es-PE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    },
    
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },
    
    animateValue(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (end - start) * easeOutQuart;
            
            element.textContent = Math.floor(current).toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    },
    
    createChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        
        ctx.clearRect(0, 0, width, height);
        
        if (options.type === 'line') {
            this.drawLineChart(ctx, data, width, height, options);
        } else if (options.type === 'bar') {
            this.drawBarChart(ctx, data, width, height, options);
        } else if (options.type === 'doughnut') {
            this.drawDoughnutChart(ctx, data, width, height, options);
        }
    },
    
    drawLineChart(ctx, data, width, height, options) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        const maxValue = Math.max(...data.values);
        const minValue = Math.min(...data.values);
        const range = maxValue - minValue;
        
        ctx.strokeStyle = options.color || '#7033ff';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, options.color || '#7033ff');
        gradient.addColorStop(1, options.color ? options.color + '20' : '#7033ff20');
        
        ctx.beginPath();
        data.values.forEach((value, index) => {
            const x = padding + (index / (data.values.length - 1)) * chartWidth;
            const y = height - padding - ((value - minValue) / range) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();
        
        if (options.fill) {
            ctx.lineTo(width - padding, height - padding);
            ctx.lineTo(padding, height - padding);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
        }
    },
    
    drawBarChart(ctx, data, width, height, options) {
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        const maxValue = Math.max(...data.values);
        const barWidth = chartWidth / data.values.length * 0.8;
        const barSpacing = chartWidth / data.values.length * 0.2;
        
        ctx.fillStyle = options.color || '#7033ff';
        
        data.values.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
            const y = height - padding - barHeight;
            
            const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
            gradient.addColorStop(0, options.color || '#7033ff');
            gradient.addColorStop(1, options.color ? options.color + '80' : '#7033ff80');
            ctx.fillStyle = gradient;
            
            ctx.fillRect(x, y, barWidth, barHeight);
        });
    },
    
    drawDoughnutChart(ctx, data, width, height, options) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 2 - 20;
        const innerRadius = radius * 0.6;
        
        const total = data.values.reduce((sum, value) => sum + value, 0);
        let currentAngle = -Math.PI / 2;
        
        data.values.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            const color = options.colors ? options.colors[index] : `hsl(${index * 60}, 70%, 60%)`;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.arc(centerX, centerY, innerRadius, currentAngle + sliceAngle, currentAngle, true);
            ctx.closePath();
            
            ctx.fillStyle = color;
            ctx.fill();
            
            currentAngle += sliceAngle;
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.FotoStudio.init();
});