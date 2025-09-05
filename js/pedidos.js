// Funcionalidad específica para la página de pedidos

document.addEventListener('DOMContentLoaded', function() {
    initializePedidos();
});

function initializePedidos() {
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar tabla
    initializeTable();
    
    // Cargar datos de ejemplo
    loadSampleData();
}

function initializeFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const serviceFilter = document.getElementById('serviceFilter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterOrders);
    }
    
    if (serviceFilter) {
        serviceFilter.addEventListener('change', filterOrders);
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.FotoStudio.debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterOrdersBySearch(query);
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

function loadSampleData() {
    // Los datos ya están en el HTML, solo necesitamos inicializar la funcionalidad
    console.log('Datos de pedidos cargados');
}

function filterOrders() {
    const statusFilter = document.getElementById('statusFilter');
    const serviceFilter = document.getElementById('serviceFilter');
    
    const status = statusFilter ? statusFilter.value : '';
    const service = serviceFilter ? serviceFilter.value : '';
    
    const rows = document.querySelectorAll('#pedidosTableBody tr');
    
    rows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        const serviceTag = row.querySelector('.service-tag');
        
        let showRow = true;
        
        if (status && statusBadge) {
            const rowStatus = statusBadge.classList.contains(`status-${status}`);
            if (!rowStatus) showRow = false;
        }
        
        if (service && serviceTag) {
            const rowService = serviceTag.classList.contains(`service-${service}`);
            if (!rowService) showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function filterOrdersBySearch(query) {
    const rows = document.querySelectorAll('#pedidosTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const showRow = text.includes(query);
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function handleActionClick(e) {
    const button = e.target.closest('.action-btn');
    const action = button.classList[1]; // view, edit, delete
    
    const row = button.closest('tr');
    const orderId = row.querySelector('.order-id').textContent;
    
    switch(action) {
        case 'view':
            viewOrder(orderId);
            break;
        case 'edit':
            editOrder(orderId);
            break;
        case 'delete':
            deleteOrder(orderId);
            break;
    }
}

function viewOrder(orderId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Viendo detalles de ${orderId}`, 'info');
    }
}

function editOrder(orderId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Editando ${orderId}`, 'info');
    }
}

function deleteOrder(orderId) {
    if (confirm(`¿Estás seguro de que quieres eliminar ${orderId}?`)) {
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification(`${orderId} eliminado`, 'success');
        }
    }
}

function updatePaginationInfo() {
    const visibleRows = document.querySelectorAll('#pedidosTableBody tr[style=""], #pedidosTableBody tr:not([style])');
    const totalRows = document.querySelectorAll('#pedidosTableBody tr').length;
    
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${visibleRows.length} de ${totalRows} pedidos`;
    }
}