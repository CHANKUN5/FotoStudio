// Funcionalidad específica para la página de producción

document.addEventListener('DOMContentLoaded', function() {
    initializeProduccion();
});

function initializeProduccion() {
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar elementos de flujo de trabajo
    initializeWorkflow();
    
    // Inicializar acciones rápidas
    initializeQuickActions();
    
    // Inicializar actividad reciente
    initializeRecentActivity();
}

function initializeFilters() {
    const filterSelect = document.querySelector('.workflow-filters select');
    
    if (filterSelect) {
        filterSelect.addEventListener('change', filterWorkflowItems);
    }
}

function initializeWorkflow() {
    // Agregar funcionalidad a elementos de flujo de trabajo
    const workflowItems = document.querySelectorAll('.workflow-item');
    workflowItems.forEach(item => {
        const buttons = item.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', handleWorkflowAction);
        });
    });
}

function initializeQuickActions() {
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleQuickAction);
    });
}

function initializeRecentActivity() {
    // Simular actualizaciones de actividad
    setInterval(updateActivity, 10000);
}

function filterWorkflowItems() {
    const filterSelect = document.querySelector('.workflow-filters select');
    const filter = filterSelect ? filterSelect.value : '';
    
    const workflowItems = document.querySelectorAll('.workflow-item');
    
    workflowItems.forEach(item => {
        const itemText = item.textContent.toLowerCase();
        const showItem = !filter || itemText.includes(filter);
        item.style.display = showItem ? 'block' : 'none';
    });
}

function handleWorkflowAction(e) {
    const button = e.target;
    const action = button.textContent.trim();
    const item = button.closest('.workflow-item');
    const itemId = item.querySelector('.item-id').textContent;
    
    switch(action) {
        case 'Iniciar':
            startWork(itemId);
            break;
        case 'Completar':
            completeWork(itemId);
            break;
        case 'Ver':
            viewWorkDetails(itemId);
            break;
    }
}

function handleQuickAction(e) {
    const button = e.target.closest('.action-btn');
    const actionText = button.querySelector('span').textContent;
    
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Iniciando: ${actionText}`, 'info');
    }
}

function startWork(itemId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Iniciando trabajo ${itemId}`, 'success');
    }
    
    // Simular cambio de estado
    setTimeout(() => {
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification(`${itemId} iniciado`, 'success');
        }
    }, 1000);
}

function completeWork(itemId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Completando trabajo ${itemId}`, 'success');
    }
    
    // Simular cambio de estado
    setTimeout(() => {
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification(`${itemId} completado`, 'success');
        }
    }, 1000);
}

function viewWorkDetails(itemId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Viendo detalles de ${itemId}`, 'info');
    }
}

function updateActivity() {
    const activityItems = document.querySelectorAll('.activity-item');
    if (activityItems.length > 0) {
        const randomIndex = Math.floor(Math.random() * activityItems.length);
        const randomItem = activityItems[randomIndex];
        
        // Agregar efecto de actualización
        randomItem.style.transform = 'scale(1.02)';
        randomItem.style.background = 'rgba(112, 51, 255, 0.05)';
        
        setTimeout(() => {
            randomItem.style.transform = '';
            randomItem.style.background = '';
        }, 1000);
    }
}
