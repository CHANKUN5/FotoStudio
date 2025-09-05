// FotoStudio - Configuración JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FotoStudio global
    window.FotoStudio.init();
    
    // Funciones específicas de configuración
    initializeConfiguration();
});

function initializeConfiguration() {
    // Inicializar configuración
    initializeSettings();
    
    // Configurar eventos
    setupEventListeners();
    
    // Cargar configuración actual
    loadCurrentSettings();
}

function initializeSettings() {
    // Inicializar toggles y controles
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            saveSetting(this.name, this.checked);
        });
    });
    
    // Inicializar selectores
    const selects = document.querySelectorAll('.form-control');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            saveSetting(this.name, this.value);
        });
    });
}

function setupEventListeners() {
    // Event listeners para configuración
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        option.addEventListener('click', function() {
            const avatar = this.dataset.avatar;
            selectAvatar(avatar);
        });
    });
    
    // Botones de guardar
    const saveButtons = document.querySelectorAll('.btn-primary');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            saveConfiguration();
        });
    });
}

function selectAvatar(avatarPath) {
    // Seleccionar nuevo avatar
    const avatarElements = document.querySelectorAll('[data-user-avatar]');
    avatarElements.forEach(element => {
        element.src = avatarPath;
    });
    
    // Guardar selección
    window.FotoStudio.currentAvatar = avatarPath;
    localStorage.setItem('userAvatar', avatarPath);
}

function saveSetting(name, value) {
    // Guardar configuración individual
    localStorage.setItem(name, value);
    console.log(`Configuración guardada: ${name} = ${value}`);
}

function saveConfiguration() {
    // Guardar toda la configuración
    const formData = new FormData();
    
    // Recopilar datos de formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const formDataObj = new FormData(form);
        for (let [key, value] of formDataObj.entries()) {
            formData.append(key, value);
        }
    });
    
    // Simular guardado
    console.log('Configuración guardada exitosamente');
    showNotification('Configuración guardada', 'success');
}

function loadCurrentSettings() {
    // Cargar configuración actual
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
        selectAvatar(savedAvatar);
    }
    
    // Cargar otras configuraciones
    const settings = ['emailNotifications', 'appointmentReminders', 'darkMode', 'language', 'timezone'];
    settings.forEach(setting => {
        const value = localStorage.getItem(setting);
        if (value !== null) {
            const element = document.querySelector(`[name="${setting}"]`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = value === 'true';
                } else {
                    element.value = value;
                }
            }
        }
    });
}

function showNotification(message, type = 'info') {
    // Mostrar notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}