// Funcionalidad específica para la página de inventario

document.addEventListener('DOMContentLoaded', function() {
    initializeInventario();
});

function initializeInventario() {
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar tabla
    initializeTable();
    
    // Inicializar checkboxes
    initializeCheckboxes();
}

function initializeFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.FotoStudio.debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterProductsBySearch(query);
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

function initializeCheckboxes() {
    const checkboxes = document.querySelectorAll('.checkbox-label input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterByStock);
    });
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter');
    const category = categoryFilter ? categoryFilter.value : '';
    
    const rows = document.querySelectorAll('#inventarioTableBody tr');
    
    rows.forEach(row => {
        const categoryTag = row.querySelector('.category-tag');
        
        let showRow = true;
        
        if (category && categoryTag) {
            const rowCategory = categoryTag.classList.contains(`cat-${category}`);
            if (!rowCategory) showRow = false;
        }
        
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function filterProductsBySearch(query) {
    const rows = document.querySelectorAll('#inventarioTableBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const showRow = text.includes(query);
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function filterByStock() {
    const stockAlto = document.getElementById('stockAlto');
    const stockMedio = document.getElementById('stockMedio');
    const stockBajo = document.getElementById('stockBajo');
    
    const rows = document.querySelectorAll('#inventarioTableBody tr');
    
    rows.forEach(row => {
        const stockBadge = row.querySelector('.stock-badge');
        
        let showRow = false;
        
        if (stockBadge) {
            if (stockAlto.checked && stockBadge.classList.contains('stock-alto')) {
                showRow = true;
            }
            if (stockMedio.checked && stockBadge.classList.contains('stock-medio')) {
                showRow = true;
            }
            if (stockBajo.checked && stockBadge.classList.contains('stock-bajo')) {
                showRow = true;
            }
        }
        
        row.style.display = showRow ? '' : 'none';
    });
    
    updatePaginationInfo();
}

function handleActionClick(e) {
    const button = e.target.closest('.action-btn');
    const action = button.classList[1]; // edit, stock, delete
    
    const row = button.closest('tr');
    const productCode = row.querySelector('.product-code').textContent;
    
    switch(action) {
        case 'edit':
            editProduct(productCode);
            break;
        case 'stock':
            openStockModal();
            break;
        case 'delete':
            deleteProduct(productCode);
            break;
    }
}

function editProduct(productCode) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Editando ${productCode}`, 'info');
    }
}

function deleteProduct(productCode) {
    if (confirm(`¿Estás seguro de que quieres eliminar ${productCode}?`)) {
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification(`${productCode} eliminado`, 'success');
        }
    }
}

function updatePaginationInfo() {
    const visibleRows = document.querySelectorAll('#inventarioTableBody tr[style=""], #inventarioTableBody tr:not([style])');
    const totalRows = document.querySelectorAll('#inventarioTableBody tr').length;
    
    const paginationInfo = document.querySelector('.pagination-info');
    if (paginationInfo) {
        paginationInfo.textContent = `Mostrando ${visibleRows.length} de ${totalRows} productos`;
    }
}