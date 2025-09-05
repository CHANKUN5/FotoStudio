// Funcionalidad específica para la página de productos terminados

document.addEventListener('DOMContentLoaded', function() {
    initializeProductosTerminados();
});

function initializeProductosTerminados() {
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar tarjetas de productos
    initializeProductCards();
    
    // Inicializar tabla
    initializeTable();
}

function initializeFilters() {
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.dashboard-search input');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.FotoStudio.debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterProductsBySearch(query);
        }, 300));
    }
}

function initializeProductCards() {
    // Agregar funcionalidad a botones de acción
    const actionButtons = document.querySelectorAll('.product-actions .btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleProductAction);
    });
}

function initializeTable() {
    // Agregar funcionalidad a botones de acción de tabla
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleTableAction);
    });
}

function filterProducts() {
    const typeFilter = document.querySelector('.filter-select');
    const statusFilter = document.querySelectorAll('.filter-select')[1];
    
    const type = typeFilter ? typeFilter.value : '';
    const status = statusFilter ? statusFilter.value : '';
    
    const cards = document.querySelectorAll('.product-card');
    const rows = document.querySelectorAll('.productos-table tbody tr');
    
    // Filtrar tarjetas
    cards.forEach(card => {
        const productType = card.querySelector('.product-type').textContent.toLowerCase();
        const productStatus = card.querySelector('.product-status').classList[1];
        
        let showCard = true;
        
        if (type && !productType.includes(type)) {
            showCard = false;
        }
        
        if (status && !productStatus.includes(status)) {
            showCard = false;
        }
        
        card.style.display = showCard ? 'block' : 'none';
    });
    
    // Filtrar filas de tabla
    rows.forEach(row => {
        const productTypeTag = row.querySelector('.product-type-tag');
        const statusBadge = row.querySelector('.status-badge');
        
        let showRow = true;
        
        if (type && productTypeTag) {
            const rowType = productTypeTag.classList.contains(`type-${type}`);
            if (!rowType) showRow = false;
        }
        
        if (status && statusBadge) {
            const rowStatus = statusBadge.classList.contains(`status-${status}`);
            if (!rowStatus) showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function filterProductsBySearch(query) {
    const cards = document.querySelectorAll('.product-card');
    const rows = document.querySelectorAll('.productos-table tbody tr');
    
    // Filtrar tarjetas
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const showCard = text.includes(query);
        card.style.display = showCard ? 'block' : 'none';
    });
    
    // Filtrar filas de tabla
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const showRow = text.includes(query);
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function handleProductAction(e) {
    const button = e.target;
    const action = button.textContent.trim();
    const card = button.closest('.product-card');
    const productId = card.querySelector('.product-id').textContent;
    
    switch(action) {
        case 'Entregar':
            deliverProduct(productId);
            break;
        case 'Ver':
            viewProduct(productId);
            break;
        case '📱':
            contactClient(productId);
            break;
        case 'En Proceso':
            markInProgress(productId);
            break;
        case '✅ Entregado':
            // Ya entregado, no hacer nada
            break;
    }
}

function handleTableAction(e) {
    const button = e.target.closest('.action-btn');
    const action = button.classList[1]; // primary, secondary, info
    
    const row = button.closest('tr');
    const productId = row.querySelector('.product-id').textContent;
    
    switch(action) {
        case 'primary':
            deliverProduct(productId);
            break;
        case 'secondary':
            viewProduct(productId);
            break;
        case 'info':
            contactClient(productId);
            break;
    }
}

function deliverProduct(productId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Entregando producto ${productId}`, 'success');
    }
}

function viewProduct(productId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Viendo detalles de ${productId}`, 'info');
    }
}

function contactClient(productId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Contactando cliente de ${productId}`, 'info');
    }
}

function markInProgress(productId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Marcando ${productId} como en proceso`, 'info');
    }
}

function updatePaginationInfo() {
    const visibleRows = document.querySelectorAll('.productos-table tbody tr[style=""], .productos-table tbody tr:not([style])');
    const totalRows = document.querySelectorAll('.productos-table tbody tr').length;
    
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${visibleRows.length} de ${totalRows} productos`;
    }
}
