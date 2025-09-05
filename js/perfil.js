// Funcionalidad específica para la página de perfil

document.addEventListener('DOMContentLoaded', function() {
    initializePerfil();
});

function initializePerfil() {
    // Inicializar tabs
    initializeTabs();
    
    // Inicializar formularios
    initializeForms();
    
    // Inicializar configuraciones
    initializeSettings();
    
    // Cargar datos del usuario
    loadUserData();
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remover clase active de todos los botones y panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Agregar clase active al botón y pane seleccionado
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

function initializeForms() {
    const personalForm = document.getElementById('personalForm');
    if (personalForm) {
        personalForm.addEventListener('submit', handlePersonalFormSubmit);
    }
    
    const resetButton = document.querySelector('.btn-reset');
    if (resetButton) {
        resetButton.addEventListener('click', resetPersonalForm);
    }
}

function initializeSettings() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const settingName = toggle.closest('.setting-item').querySelector('.setting-name').textContent;
            showNotification(`Configuración "${settingName}" actualizada`, 'success');
        });
    });
}

function loadUserData() {
    // Cargar datos del usuario desde localStorage
    const savedUser = localStorage.getItem('fotostudio_user');
    const savedAvatar = localStorage.getItem('fotostudio_avatar');
    
    if (savedUser) {
        const user = JSON.parse(savedUser);
        updateUserDisplay(user);
    }
    
    if (savedAvatar) {
        updateAvatarDisplay(savedAvatar);
    }
}

function updateUserDisplay(user) {
    const nameElements = document.querySelectorAll('[data-user-name]');
    nameElements.forEach(element => {
        element.textContent = user.name;
    });
    
    // Actualizar formulario
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    
    if (nameInput) nameInput.value = user.name;
    if (emailInput) emailInput.value = user.email;
}

function updateAvatarDisplay(avatarSrc) {
    const avatarElements = document.querySelectorAll('[data-user-avatar]');
    avatarElements.forEach(element => {
        element.src = avatarSrc;
    });
}

function handlePersonalFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    
    // Validar formulario
    if (validatePersonalForm(userData)) {
        // Actualizar datos del usuario
        const currentUser = JSON.parse(localStorage.getItem('fotostudio_user') || '{}');
        const updatedUser = {
            ...currentUser,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            bio: userData.bio
        };
        
        localStorage.setItem('fotostudio_user', JSON.stringify(updatedUser));
        
        // Actualizar display
        updateUserDisplay(updatedUser);
        
        showNotification('Información personal actualizada correctamente', 'success');
    }
}

function validatePersonalForm(data) {
    if (!data.name || !data.email) {
        showNotification('Por favor completa todos los campos requeridos', 'error');
        return false;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetPersonalForm() {
    const form = document.getElementById('personalForm');
    if (form) {
        form.reset();
        loadUserData(); // Recargar datos originales
        showNotification('Formulario restablecido', 'info');
    }
}

function changeAvatar() {
    // Generar nuevo avatar aleatorio
    const newAvatar = window.FotoStudio.getRandomAvatar();
    
    // Actualizar avatar en localStorage
    localStorage.setItem('fotostudio_avatar', newAvatar);
    
    // Actualizar display
    updateAvatarDisplay(newAvatar);
    
    showNotification('Avatar cambiado exitosamente', 'success');
}

function showNotification(message, type = 'info') {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}
