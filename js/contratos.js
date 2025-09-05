// FotoStudio - Contratos JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FotoStudio global
    window.FotoStudio.init();
    
    // Funciones específicas de contratos
    initializeContracts();
});

function initializeContracts() {
    // Inicializar contratos
    initializeFilters();
    
    // Configurar eventos
    setupEventListeners();
    
    // Cargar datos de contratos
    loadContractsData();
}

function initializeFilters() {
    // Inicializar filtros
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterContracts);
    });
}

function setupEventListeners() {
    // Event listeners para contratos
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('view') ? 'view' :
                          this.classList.contains('edit') ? 'edit' : 'download';
            const row = this.closest('tr');
            const contractId = row.querySelector('.contract-id').textContent;
            
            handleContractAction(action, contractId);
        });
    });
}

function filterContracts() {
    // Filtrar contratos según criterios
    const statusFilter = document.querySelector('.filter-select');
    const typeFilter = document.querySelectorAll('.filter-select')[1];
    
    const status = statusFilter ? statusFilter.value : '';
    const type = typeFilter ? typeFilter.value : '';
    
    const rows = document.querySelectorAll('.contratos-table tbody tr');
    rows.forEach(row => {
        const contractStatus = row.querySelector('.status-badge').textContent.toLowerCase();
        const contractType = row.querySelector('.contract-type').textContent.toLowerCase();
        
        let show = true;
        
        // Filtro por estado
        if (status && !contractStatus.includes(status)) {
            show = false;
        }
        
        // Filtro por tipo
        if (type && !contractType.includes(type)) {
            show = false;
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function handleContractAction(action, contractId) {
    // Manejar acciones de contrato
    switch (action) {
        case 'view':
            viewContract(contractId);
            break;
        case 'edit':
            editContract(contractId);
            break;
        case 'download':
            downloadContract(contractId);
            break;
    }
}

function viewContract(contractId) {
    // Ver contrato
    console.log('Viendo contrato:', contractId);
    // Implementar lógica de visualización
}

function editContract(contractId) {
    // Editar contrato
    console.log('Editando contrato:', contractId);
    // Implementar lógica de edición
}

function downloadContract(contractId) {
    // Descargar contrato
    console.log('Descargando contrato:', contractId);
    // Implementar lógica de descarga
}

function openNewContractModal() {
    // Abrir modal para nuevo contrato
    const modal = document.getElementById('newContractModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeNewContractModal() {
    // Cerrar modal para nuevo contrato
    const modal = document.getElementById('newContractModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function loadContractsData() {
    // Cargar datos de contratos
    console.log('Cargando datos de contratos...');
    // Implementar carga de datos
}