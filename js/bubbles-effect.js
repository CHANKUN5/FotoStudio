/**
 * Efectos mejorados para las burbujas y elementos visuales
 * FotoStudio - Sistema de gestión
 */

class BubblesEffect {
    constructor() {
        this.bubbles = document.querySelectorAll('.bubble');
        this.initialized = false;
    }

    /**
     * Inicializa los efectos de burbujas
     */
    init() {
        if (this.initialized) return;
        this.initialized = true;
        
        // Añadir movimiento aleatorio adicional a las burbujas
        this.bubbles.forEach(bubble => {
            // Posición inicial aleatoria
            const randomX = Math.random() * 10 - 5;
            const randomY = Math.random() * 10 - 5;
            const randomScale = 0.9 + Math.random() * 0.2;
            const randomRotate = Math.random() * 10 - 5;
            
            bubble.style.transform = `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotate}deg)`;
            
            // Añadir efecto de brillo aleatorio
            const randomOpacity = 0.7 + Math.random() * 0.3;
            bubble.style.opacity = randomOpacity;
        });
        
        // Añadir efecto de parallax al mover el mouse
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        console.log('✨ Efectos de burbujas inicializados');
    }
    
    /**
     * Maneja el movimiento del mouse para efecto parallax
     * @param {MouseEvent} e - Evento de movimiento del mouse
     */
    handleMouseMove(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        this.bubbles.forEach((bubble, index) => {
            const depth = 0.05 + (index % 3) * 0.02; // Diferentes profundidades para cada burbuja
            const moveX = (mouseX - 0.5) * depth * 100;
            const moveY = (mouseY - 0.5) * depth * 100;
            
            bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }
    
    /**
     * Añade efectos de brillo a elementos interactivos
     */
    addGlowEffects() {
        // Añadir efecto de brillo a botones
        const buttons = document.querySelectorAll('.btn-primary, .action-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.boxShadow = '0 0 15px rgba(112, 51, 255, 0.7)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.boxShadow = '';
            });
        });
        
        // Añadir efecto de brillo a enlaces del menú
        const menuLinks = document.querySelectorAll('.sidebar-menu-link');
        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const icon = link.querySelector('.sidebar-menu-icon');
                if (icon) {
                    icon.style.textShadow = '0 0 10px rgba(112, 51, 255, 0.7)';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                const icon = link.querySelector('.sidebar-menu-icon');
                if (icon) {
                    icon.style.textShadow = '';
                }
            });
        });
    }
}

// Exportar la clase para uso global
window.BubblesEffect = BubblesEffect;

// Inicializar automáticamente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const bubblesEffect = new BubblesEffect();
    bubblesEffect.init();
    bubblesEffect.addGlowEffects();
});