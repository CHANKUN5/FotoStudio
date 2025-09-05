// Funcionalidad específica para la página de contratos

document.addEventListener('DOMContentLoaded', function() {
    initializeContratos();
});

function initializeContratos() {
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar tabla
    initializeTable();
}

function initializeFilters() {
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterContracts);
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.dashboard-search input');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.FotoStudio.debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterContractsBySearch(query);
        }, 300));
    }
}

function initializeTable() {
    // Agregar funcionalidad a botones de acción
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleActionClick);
    });
}

function filterContracts() {
    const statusFilter = document.querySelector('.filter-select');
    const status = statusFilter ? statusFilter.value : '';
    
    const rows = document.querySelectorAll('.contratos-table tbody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        
        let showRow = true;
        
        if (status && statusBadge) {
            const rowStatus = statusBadge.classList.contains(`status-${status}`);
            if (!rowStatus) showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function filterContractsBySearch(query) {
    const rows = document.querySelectorAll('.contratos-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const showRow = text.includes(query);
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function handleActionClick(e) {
    const button = e.target.closest('.action-btn');
    const action = button.classList[1]; // view, edit, download
    
    const row = button.closest('tr');
    const contractId = row.querySelector('.contract-id').textContent;
    
    switch(action) {
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
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Viendo contrato ${contractId}`, 'info');
    }
}

function editContract(contractId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Editando contrato ${contractId}`, 'info');
    }
}

function downloadContract(contractId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Descargando contrato ${contractId}`, 'success');
    }
}

function updatePaginationInfo() {
    const visibleRows = document.querySelectorAll('.contratos-table tbody tr[style=""], .contratos-table tbody tr:not([style])');
    const totalRows = document.querySelectorAll('.contratos-table tbody tr').length;
    
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${visibleRows.length} de ${totalRows} contratos`;
    }
}
