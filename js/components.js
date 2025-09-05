/**
 * Componentes y utilidades globales para FotoStudio
 * Sistema mejorado con efectos visuales y animaciones
 */

// Inicialización de componentes comunes
document.addEventListener('DOMContentLoaded', function() {
    initializeComponents();
    initializeModals();
    initializeTooltips();
    initializeSidebar();
    initializeCardEffects();
});

function initializeComponents() {
    // Inicializar efectos de brillo
    if (typeof initializeGlowEffects === 'function') {
        initializeGlowEffects();
    }
    
    // Inicializar animaciones
    initializeAnimations();
    
    // Inicializar formularios
    initializeForms();
}

function initializeModals() {
    // Cerrar modales al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeAllModals();
        }
    });
    
    // Cerrar modales con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
}

function initializeTooltips() {
    // Inicializar tooltips simples
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function initializeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
            if (mainContent) mainContent.classList.toggle('expanded');
        });
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            if (mainContent) mainContent.classList.remove('expanded');
        });
    }
}

function initializeAnimations() {
    // Animación de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.stat-card, .metric-card, .chart-card, .widget-card').forEach(card => {
        observer.observe(card);
    });
}

function initializeCardEffects() {
    // Añadir efectos de hover a tarjetas
    const cards = document.querySelectorAll('.card, .widget-card, .stat-card, .metric-card, .chart-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

function initializeForms() {
    // Validación de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
    
    // Mejorar inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
}

function handleFormSubmit(e) {
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="loading-spinner"></div> Procesando...';
        submitButton.disabled = true;
        
        // Simular procesamiento
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Mostrar notificación de éxito
            if (window.FotoStudio && window.FotoStudio.showNotification) {
                window.FotoStudio.showNotification('Operación completada exitosamente', 'success');
            }
        }, 1500);
    }
}

function showTooltip(e) {
    const element = e.target;
    const title = element.getAttribute('title');
    
    if (!title) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = title;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--gray-900);
        color: white;
        padding: 0.5rem 0.75rem;
        border-radius: var(--border-radius-md);
        font-size: 0.875rem;
        z-index: 1000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    element._tooltip = tooltip;
    element.removeAttribute('title');
}

function hideTooltip(e) {
    const element = e.target;
    const tooltip = element._tooltip;
    
    if (tooltip) {
        tooltip.remove();
        delete element._tooltip;
    }
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// Funciones globales para modales comunes
function openNewOrderModal() {
    openModal('newOrderModal');
}

function closeNewOrderModal() {
    closeModal('newOrderModal');
}

function openNewClientModal() {
    openModal('newClientModal');
}

function closeNewClientModal() {
    closeModal('newClientModal');
}

function openNewContractModal() {
    openModal('newContractModal');
}

function closeNewContractModal() {
    closeModal('newContractModal');
}

function openNewProductModal() {
    openModal('newProductModal');
}

function closeNewProductModal() {
    closeModal('newProductModal');
}

function openNewAppointmentModal() {
    openModal('newAppointmentModal');
}

function closeNewAppointmentModal() {
    closeModal('newAppointmentModal');
}

function openAddItemModal() {
    openModal('addItemModal');
}

function closeAddItemModal() {
    closeModal('addItemModal');
}

function openStockModal() {
    openModal('stockModal');
}

function closeStockModal() {
    closeModal('stockModal');
}

// Funciones de utilidad
function exportData(type) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Exportando ${type}...`, 'info');
    }
    
    // Simular exportación
    setTimeout(() => {
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification(`${type} exportado exitosamente`, 'success');
        }
    }, 2000);
}

function exportReport() {
    exportData('reporte');
}

function exportInventario() {
    exportData('inventario');
}

function clearFilters() {
    const filters = document.querySelectorAll('.filter-select, input[type="checkbox"]');
    filters.forEach(filter => {
        if (filter.type === 'checkbox') {
            filter.checked = false;
        } else {
            filter.selectedIndex = 0;
        }
    });
    
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Filtros limpiados', 'info');
    }
}

// Navegación del calendario
function previousMonth() {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Navegando al mes anterior', 'info');
    }
}

function nextMonth() {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Navegando al mes siguiente', 'info');
    }
}

// Inicializar efectos de hover en tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.stat-card, .metric-card, .client-card, .product-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Manejo de avatares
document.addEventListener('DOMContentLoaded', function() {
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const avatarSrc = this.getAttribute('data-avatar');
            const currentAvatar = document.querySelector('.current-avatar img');
            
            if (currentAvatar && avatarSrc) {
                currentAvatar.src = avatarSrc;
                
                // Actualizar avatar en toda la aplicación
                if (window.FotoStudio) {
                    window.FotoStudio.currentAvatar = avatarSrc;
                    window.FotoStudio.updateUserInfo();
                }
            }
        });
    });
});
