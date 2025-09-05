// FotoStudio - Producción JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FotoStudio global
    window.FotoStudio.init();
    
    // Funciones específicas de producción
    initializeProduction();
});

function initializeProduction() {
    // Inicializar producción
    initializeWorkflow();
    
    // Configurar eventos
    setupEventListeners();
    
    // Cargar datos de producción
    loadProductionData();
}

function initializeWorkflow() {
    // Inicializar flujo de trabajo
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', filterWorkflow);
    }
}

function setupEventListeners() {
    // Event listeners para producción
    const workflowItems = document.querySelectorAll('.workflow-item');
    workflowItems.forEach(item => {
        const buttons = item.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const action = this.classList.contains('btn-primary') ? 'start' :
                              this.classList.contains('btn-success') ? 'complete' : 'view';
                const itemId = item.querySelector('.item-id').textContent;
                
                handleWorkflowAction(action, itemId);
            });
        });
    });
    
    // Botones de acciones rápidas
    const quickActions = document.querySelectorAll('.action-btn');
    quickActions.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent.toLowerCase();
            handleQuickAction(action);
        });
    });
}

function filterWorkflow() {
    // Filtrar flujo de trabajo
    const filterSelect = document.querySelector('.filter-select');
    const filter = filterSelect ? filterSelect.value : '';
    
    const workflowItems = document.querySelectorAll('.workflow-item');
    workflowItems.forEach(item => {
        const itemContent = item.querySelector('.item-content h5').textContent.toLowerCase();
        
        let show = true;
        
        if (filter && !itemContent.includes(filter)) {
            show = false;
        }
        
        item.style.display = show ? '' : 'none';
    });
}

function handleWorkflowAction(action, itemId) {
    // Manejar acciones del flujo de trabajo
    switch (action) {
        case 'start':
            startWork(itemId);
            break;
        case 'complete':
            completeWork(itemId);
            break;
        case 'view':
            viewWork(itemId);
            break;
    }
}

function startWork(itemId) {
    // Iniciar trabajo
    console.log('Iniciando trabajo:', itemId);
    // Implementar lógica de inicio
}

function completeWork(itemId) {
    // Completar trabajo
    console.log('Completando trabajo:', itemId);
    // Implementar lógica de finalización
}

function viewWork(itemId) {
    // Ver trabajo
    console.log('Viendo trabajo:', itemId);
    // Implementar lógica de visualización
}

function handleQuickAction(action) {
    // Manejar acciones rápidas
    switch (action) {
        case 'nueva sesión':
            createNewSession();
            break;
        case 'enmarcar':
            startFraming();
            break;
        case 'imprimir':
            startPrinting();
            break;
        case 'editar':
            startEditing();
            break;
    }
}

function createNewSession() {
    // Crear nueva sesión
    console.log('Creando nueva sesión');
    // Implementar lógica de nueva sesión
}

function startFraming() {
    // Iniciar enmarcado
    console.log('Iniciando enmarcado');
    // Implementar lógica de enmarcado
}

function startPrinting() {
    // Iniciar impresión
    console.log('Iniciando impresión');
    // Implementar lógica de impresión
}

function startEditing() {
    // Iniciar edición
    console.log('Iniciando edición');
    // Implementar lógica de edición
}

function loadProductionData() {
    // Cargar datos de producción
    console.log('Cargando datos de producción...');
    // Implementar carga de datos
}