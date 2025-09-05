// Funcionalidad específica para la página de configuración

document.addEventListener('DOMContentLoaded', function() {
    initializeConfiguracion();
});

function initializeConfiguracion() {
    // Inicializar formularios
    initializeForms();
    
    // Inicializar botones
    initializeButtons();
    
    // Cargar configuración actual
    loadCurrentSettings();
}

function initializeForms() {
    const forms = document.querySelectorAll('.config-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

function initializeButtons() {
    // Botones de guardar
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', handleSave);
    });
    
    // Botones de reset
    const resetButtons = document.querySelectorAll('.btn-reset');
    resetButtons.forEach(button => {
        button.addEventListener('click', handleReset);
    });
    
    // Botones de prueba
    const testButtons = document.querySelectorAll('.btn-test');
    testButtons.forEach(button => {
        button.addEventListener('click', handleTest);
    });
}

function loadCurrentSettings() {
    // Cargar configuración de perfil
    loadProfileSettings();
    
    // Cargar configuración de notificaciones
    loadNotificationSettings();
    
    // Cargar configuración de sistema
    loadSystemSettings();
}

function loadProfileSettings() {
    const profileForm = document.querySelector('#profileForm');
    if (!profileForm) return;
    
    // Simular datos de perfil
    const profileData = {
        name: 'FotoStudio',
        email: 'info@fotostudio.com',
        phone: '+1 234 567 8900',
        address: '123 Calle Principal, Ciudad',
        website: 'www.fotostudio.com'
    };
    
    // Llenar formulario
    Object.keys(profileData).forEach(key => {
        const input = profileForm.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = profileData[key];
        }
    });
}

function loadNotificationSettings() {
    const notificationForm = document.querySelector('#notificationForm');
    if (!notificationForm) return;
    
    // Simular configuración de notificaciones
    const notificationData = {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        reminderTime: '24'
    };
    
    // Llenar formulario
    Object.keys(notificationData).forEach(key => {
        const input = notificationForm.querySelector(`[name="${key}"]`);
        if (input) {
            if (input.type === 'checkbox') {
                input.checked = notificationData[key];
            } else {
                input.value = notificationData[key];
            }
        }
    });
}

function loadSystemSettings() {
    const systemForm = document.querySelector('#systemForm');
    if (!systemForm) return;
    
    // Simular configuración del sistema
    const systemData = {
        timezone: 'America/Lima',
        language: 'es',
        dateFormat: 'DD/MM/YYYY',
        currency: 'PEN',
        backupFrequency: 'daily'
    };
    
    // Llenar formulario
    Object.keys(systemData).forEach(key => {
        const input = systemForm.querySelector(`[name="${key}"]`);
        if (input) {
            input.value = systemData[key];
        }
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Validar formulario
    if (validateForm(form, data)) {
        saveSettings(form.id, data);
    }
}

function validateForm(form, data) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field.name]) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    return isValid;
}

function handleSave(e) {
    const button = e.target;
    const form = button.closest('.config-form');
    
    if (form) {
        form.dispatchEvent(new Event('submit'));
    }
}

function handleReset(e) {
    const button = e.target;
    const form = button.closest('.config-form');
    
    if (form) {
        form.reset();
        loadCurrentSettings();
        
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification('Configuración restablecida', 'info');
        }
    }
}

function handleTest(e) {
    const button = e.target;
    const testType = button.dataset.test;
    
    switch(testType) {
        case 'email':
            testEmailConnection();
            break;
        case 'sms':
            testSMSConnection();
            break;
        case 'backup':
            testBackup();
            break;
    }
}

function testEmailConnection() {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Probando conexión de email...', 'info');
        
        setTimeout(() => {
            window.FotoStudio.showNotification('Conexión de email exitosa', 'success');
        }, 2000);
    }
}

function testSMSConnection() {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Probando conexión de SMS...', 'info');
        
        setTimeout(() => {
            window.FotoStudio.showNotification('Conexión de SMS exitosa', 'success');
        }, 2000);
    }
}

function testBackup() {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Probando respaldo...', 'info');
        
        setTimeout(() => {
            window.FotoStudio.showNotification('Respaldo exitoso', 'success');
        }, 3000);
    }
}

function saveSettings(formId, data) {
    // Simular guardado
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification('Guardando configuración...', 'info');
        
        setTimeout(() => {
            window.FotoStudio.showNotification('Configuración guardada exitosamente', 'success');
        }, 1000);
    }
}
