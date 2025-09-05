// FotoStudio - Clientes JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FotoStudio global
    window.FotoStudio.init();
    
    // Funciones específicas de clientes
    initializeClients();
});

function initializeClients() {
    // Inicializar clientes
    initializeViewToggle();
    
    // Configurar eventos
    setupEventListeners();
    
    // Cargar datos de clientes
    loadClientsData();
}

function initializeViewToggle() {
    // Inicializar toggle de vista
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewToggleBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            switchView(view);
        });
    });
}

function setupEventListeners() {
    // Event listeners para clientes
    const searchInput = document.getElementById('clientsSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filterClients);
    }
    
    const statusFilter = document.querySelector('.status-filter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterClients);
    }
    
    // Botones de acción
    const actionButtons = document.querySelectorAll('.client-action-btn, .action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList.contains('primary') ? 'view' :
                          this.classList.contains('secondary') ? 'edit' : 'delete';
            const clientCard = this.closest('.client-card, tr');
            const clientName = clientCard.querySelector('.client-name, .table-client-name').textContent;
            
            handleClientAction(action, clientName);
        });
    });
}

function switchView(view) {
    // Cambiar entre vista de tarjetas y tabla
    const gridView = document.getElementById('clientsGridView');
    const tableView = document.getElementById('clientsTableView');
    
    if (view === 'grid') {
        if (gridView) gridView.style.display = 'grid';
        if (tableView) tableView.style.display = 'none';
    } else {
        if (gridView) gridView.style.display = 'none';
        if (tableView) tableView.style.display = 'block';
    }
}

function filterClients() {
    // Filtrar clientes según criterios
    const searchInput = document.getElementById('clientsSearch');
    const statusFilter = document.querySelector('.status-filter');
    
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    const status = statusFilter ? statusFilter.value : '';
    
    // Filtrar vista de tarjetas
    const clientCards = document.querySelectorAll('.client-card');
    clientCards.forEach(card => {
        const clientName = card.querySelector('.client-name').textContent.toLowerCase();
        const clientEmail = card.querySelector('.client-email').textContent.toLowerCase();
        const clientPhone = card.querySelector('.client-phone').textContent.toLowerCase();
        
        let show = true;
        
        // Filtro por búsqueda
        if (search && !clientName.includes(search) && !clientEmail.includes(search) && !clientPhone.includes(search)) {
            show = false;
        }
        
        // Filtro por estado (implementar según necesidad)
        if (status) {
            // Lógica de filtro por estado
        }
        
        card.style.display = show ? '' : 'none';
    });
    
    // Filtrar vista de tabla
    const tableRows = document.querySelectorAll('.clients-table tbody tr');
    tableRows.forEach(row => {
        const clientName = row.querySelector('.table-client-name').textContent.toLowerCase();
        const clientEmail = row.querySelector('.table-client-email').textContent.toLowerCase();
        
        let show = true;
        
        // Filtro por búsqueda
        if (search && !clientName.includes(search) && !clientEmail.includes(search)) {
            show = false;
        }
        
        // Filtro por estado
        if (status) {
            // Lógica de filtro por estado
        }
        
        row.style.display = show ? '' : 'none';
    });
}

function handleClientAction(action, clientName) {
    // Manejar acciones de cliente
    switch (action) {
        case 'view':
            viewClient(clientName);
            break;
        case 'edit':
            editClient(clientName);
            break;
        case 'delete':
            deleteClient(clientName);
            break;
    }
}

function viewClient(clientName) {
    // Ver perfil del cliente
    console.log('Viendo cliente:', clientName);
    // Implementar lógica de visualización
}

function editClient(clientName) {
    // Editar cliente
    console.log('Editando cliente:', clientName);
    // Implementar lógica de edición
}

function deleteClient(clientName) {
    // Eliminar cliente
    if (confirm(`¿Estás seguro de eliminar al cliente ${clientName}?`)) {
        console.log('Eliminando cliente:', clientName);
        // Implementar lógica de eliminación
    }
}

function openNewClientModal() {
    // Abrir modal para nuevo cliente
    console.log('Abriendo modal de nuevo cliente');
    // Implementar modal de nuevo cliente
}

function loadClientsData() {
    // Cargar datos de clientes
    console.log('Cargando datos de clientes...');
    // Implementar carga de datos
}