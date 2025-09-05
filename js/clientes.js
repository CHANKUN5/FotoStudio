// Funcionalidad específica para la página de clientes

document.addEventListener('DOMContentLoaded', function() {
    initializeClientes();
});

function initializeClientes() {
    // Inicializar vista toggle
    initializeViewToggle();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar tarjetas de cliente
    initializeClientCards();
}

function initializeViewToggle() {
    const viewToggleButtons = document.querySelectorAll('.view-toggle-btn');
    const gridView = document.getElementById('clientsGridView');
    const tableView = document.getElementById('clientsTableView');
    
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            // Actualizar botones activos
            viewToggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar/ocultar vistas
            if (view === 'grid') {
                if (gridView) gridView.style.display = 'grid';
                if (tableView) tableView.style.display = 'none';
            } else {
                if (gridView) gridView.style.display = 'none';
                if (tableView) tableView.style.display = 'block';
            }
        });
    });
}

function initializeSearch() {
    const searchInput = document.getElementById('clientsSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.FotoStudio.debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterClients(query);
        }, 300));
    }
}

function initializeFilters() {
    const statusFilter = document.querySelector('.status-filter');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            const status = this.value;
            filterClientsByStatus(status);
        });
    }
}

function initializeClientCards() {
    // Agregar funcionalidad a botones de acción
    const actionButtons = document.querySelectorAll('.client-action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleClientAction);
    });
    
    // Agregar funcionalidad a botones de tabla
    const tableActionButtons = document.querySelectorAll('.action-btn');
    tableActionButtons.forEach(button => {
        button.addEventListener('click', handleTableAction);
    });
}

function filterClients(query) {
    const clientCards = document.querySelectorAll('.client-card');
    const tableRows = document.querySelectorAll('.clients-table tbody tr');
    
    // Filtrar tarjetas
    clientCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const showCard = text.includes(query);
        card.style.display = showCard ? 'block' : 'none';
    });
    
    // Filtrar filas de tabla
    tableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const showRow = text.includes(query);
        row.style.display = showRow ? '' : 'none';
    });
}

function filterClientsByStatus(status) {
    const clientCards = document.querySelectorAll('.client-card');
    const tableRows = document.querySelectorAll('.clients-table tbody tr');
    
    if (!status) {
        // Mostrar todos
        clientCards.forEach(card => card.style.display = 'block');
        tableRows.forEach(row => row.style.display = '');
        return;
    }
    
    // Filtrar tarjetas
    clientCards.forEach(card => {
        const tags = card.querySelectorAll('.client-tag');
        let hasStatus = false;
        
        tags.forEach(tag => {
            if (tag.textContent.toLowerCase().includes(status)) {
                hasStatus = true;
            }
        });
        
        card.style.display = hasStatus ? 'block' : 'none';
    });
    
    // Filtrar filas de tabla
    tableRows.forEach(row => {
        const badge = row.querySelector('.badge');
        const showRow = badge && badge.textContent.toLowerCase().includes(status);
        row.style.display = showRow ? '' : 'none';
    });
}

function handleClientAction(e) {
    const button = e.target.closest('.client-action-btn');
    const action = button.classList[1]; // primary, secondary, danger
    
    const card = button.closest('.client-card');
    const clientName = card.querySelector('.client-name').textContent;
    
    switch(action) {
        case 'primary':
            viewClientProfile(clientName);
            break;
        case 'secondary':
            if (button.title.includes('Editar')) {
                editClient(clientName);
            } else {
                contactClient(clientName);
            }
            break;
        case 'danger':
            deleteClient(clientName);
            break;
    }
}

function handleTableAction(e) {
    const button = e.target.closest('.action-btn');
    const action = button.classList[1]; // view, edit, delete
    
    const row = button.closest('tr');
    const clientName = row.querySelector('.table-client-name').textContent;
    
    switch(action) {
        case 'view':
            viewClientProfile(clientName);
            break;
        case 'edit':
            editClient(clientName);
            break;
        case 'delete':
            deleteClient(clientName);
            break;
    }
}

function viewClientProfile(clientName) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Viendo perfil de ${clientName}`, 'info');
    }
}

function editClient(clientName) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Editando ${clientName}`, 'info');
    }
}

function contactClient(clientName) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Contactando a ${clientName}`, 'info');
    }
}

function deleteClient(clientName) {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${clientName}?`)) {
        if (window.FotoStudio && window.FotoStudio.showNotification) {
            window.FotoStudio.showNotification(`${clientName} eliminado`, 'success');
        }
    }
}