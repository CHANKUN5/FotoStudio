// FotoStudio - Inventario JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FotoStudio global
    window.FotoStudio.init();
    
    // Funciones específicas de inventario
    initializeInventory();
});

function initializeInventory() {
    // Inicializar inventario
    initializeFilters();
    
    // Configurar eventos
    setupEventListeners();
    
    // Cargar datos del inventario
    loadInventoryData();
}

function initializeFilters() {
    // Inicializar filtros
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterInventory);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterInventory);
    }
    
    // Filtros de stock
    const stockFilters = document.querySelectorAll('#stockAlto, #stockMedio, #stockBajo');
    stockFilters.forEach(filter => {
        filter.addEventListener('change', filterInventory);
    });
}

function setupEventListeners() {
    // Event listeners para inventario
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('edit') ? 'edit' : 
                          this.classList.contains('stock') ? 'stock' : 'delete';
            const row = this.closest('tr');
            const productCode = row.querySelector('.product-code').textContent;
            
            handleAction(action, productCode);
        });
    });
}

function filterInventory() {
    // Filtrar inventario según criterios
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const stockAlto = document.getElementById('stockAlto');
    const stockMedio = document.getElementById('stockMedio');
    const stockBajo = document.getElementById('stockBajo');
    
    const category = categoryFilter ? categoryFilter.value : '';
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const showAlto = stockAlto ? stockAlto.checked : true;
    const showMedio = stockMedio ? stockMedio.checked : true;
    const showBajo = stockBajo ? stockBajo.checked : true;
    
    const rows = document.querySelectorAll('#inventarioTableBody tr');
    rows.forEach(row => {
        const productName = row.querySelector('.product-name').textContent.toLowerCase();
        const categoryTag = row.querySelector('.category-tag').textContent.toLowerCase();
        const stockBadge = row.querySelector('.stock-badge');
        const stockLevel = stockBadge ? stockBadge.textContent.toLowerCase() : '';
        
        let show = true;
        
        // Filtro por categoría
        if (category && !categoryTag.includes(category)) {
            show = false;
        }
        
        // Filtro por búsqueda
        if (search && !productName.includes(search)) {
            show = false;
        }
        
        // Filtro por stock
        if (stockLevel === 'alto' && !showAlto) show = false;
        if (stockLevel === 'medio' && !showMedio) show = false;
        if (stockLevel === 'bajo' && !showBajo) show = false;
        
        row.style.display = show ? '' : 'none';
    });
}

function handleAction(action, productCode) {
    // Manejar acciones de inventario
    switch (action) {
        case 'edit':
            editProduct(productCode);
            break;
        case 'stock':
            adjustStock(productCode);
            break;
        case 'delete':
            deleteProduct(productCode);
            break;
    }
}

function editProduct(productCode) {
    // Editar producto
    console.log('Editando producto:', productCode);
    // Implementar lógica de edición
}

function adjustStock(productCode) {
    // Ajustar stock
    console.log('Ajustando stock de:', productCode);
    const modal = document.getElementById('stockModal');
    if (modal) {
        modal.style.display = 'flex';
        // Pre-llenar datos del producto
        const stockInput = document.getElementById('stockProductCurrent');
        if (stockInput) {
            stockInput.value = 'Stock actual del producto';
        }
    }
}

function deleteProduct(productCode) {
    // Eliminar producto
    if (confirm(`¿Estás seguro de eliminar el producto ${productCode}?`)) {
        console.log('Eliminando producto:', productCode);
        // Implementar lógica de eliminación
    }
}

function openAddItemModal() {
    // Abrir modal para agregar item
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeAddItemModal() {
    // Cerrar modal para agregar item
    const modal = document.getElementById('addItemModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function closeStockModal() {
    // Cerrar modal de ajuste de stock
    const modal = document.getElementById('stockModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function exportInventario() {
    // Exportar inventario
    console.log('Exportando inventario...');
    // Implementar lógica de exportación
}

function clearFilters() {
    // Limpiar filtros
    const categoryFilter = document.getElementById('categoryFilter');
    const searchInput = document.getElementById('searchInput');
    const stockFilters = document.querySelectorAll('#stockAlto, #stockMedio, #stockBajo');
    
    if (categoryFilter) categoryFilter.value = '';
    if (searchInput) searchInput.value = '';
    stockFilters.forEach(filter => filter.checked = true);
    
    filterInventory();
}

function loadInventoryData() {
    // Cargar datos del inventario
    console.log('Cargando datos del inventario...');
    // Implementar carga de datos
}