class GlowingEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.spread = options.spread || 40;
        this.proximity = options.proximity || 64;
        this.glow = options.glow !== false;
        this.disabled = options.disabled || false;
        this.inactiveZone = options.inactiveZone || 0.01;
        
        this.init();
    }
    
    init() {
        if (this.disabled) return;
        
        this.element.style.position = 'relative';
        this.element.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
    
    handleMouseMove(e) {
        if (this.disabled) return;
        
        const rect = this.element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
        );
        
        const maxDistance = Math.sqrt(
            Math.pow(centerX, 2) + Math.pow(centerY, 2)
        );
        
        if (distance / maxDistance < this.inactiveZone) {
            this.clearEffect();
            return;
        }
        
        this.applyEffect(x, y, rect.width, rect.height);
    }
    
    handleMouseLeave() {
        this.clearEffect();
    }
    
    applyEffect(x, y, width, height) {
        const intensity = this.proximity / 100;
        
        if (this.glow) {
            const glowElement = this.getOrCreateGlowElement();
            glowElement.style.background = `radial-gradient(${this.spread}px circle at ${x}px ${y}px, rgba(112, 51, 255, ${intensity}), transparent 70%)`;
            glowElement.style.opacity = '1';
        }
        
        this.element.style.transform = `perspective(1000px) rotateX(${(y - height/2) / 10}deg) rotateY(${(x - width/2) / 10}deg)`;
    }
    
    clearEffect() {
        const glowElement = this.element.querySelector('.glow-overlay');
        if (glowElement) {
            glowElement.style.opacity = '0';
        }
        
        this.element.style.transform = '';
    }
    
    getOrCreateGlowElement() {
        let glowElement = this.element.querySelector('.glow-overlay');
        
        if (!glowElement) {
            glowElement = document.createElement('div');
            glowElement.className = 'glow-overlay';
            glowElement.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                border-radius: inherit;
                opacity: 0;
                transition: opacity 0.3s ease;
                z-index: 1;
            `;
            this.element.appendChild(glowElement);
        }
        
        return glowElement;
    }
    
    destroy() {
        this.element.removeEventListener('mousemove', this.handleMouseMove.bind(this));
        this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        const glowElement = this.element.querySelector('.glow-overlay');
        if (glowElement) {
            glowElement.remove();
        }
        
        this.element.style.transform = '';
    }
}

function initializeGlowEffects() {
    document.querySelectorAll('.glow-effect').forEach(element => {
        new GlowingEffect(element, {
            spread: 40,
            glow: true,
            proximity: 64,
            inactiveZone: 0.01
        });
    });
}