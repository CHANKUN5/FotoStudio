// Funcionalidad específica para la página de agenda

document.addEventListener('DOMContentLoaded', function() {
    initializeAgenda();
});

function initializeAgenda() {
    // Inicializar calendario
    initializeCalendar();
    
    // Inicializar filtros
    initializeFilters();
    
    // Inicializar búsqueda
    initializeSearch();
    
    // Inicializar eventos
    initializeEvents();
}

function initializeCalendar() {
    const calendar = document.querySelector('.calendar');
    if (!calendar) return;
    
    // Generar días del mes
    generateCalendarDays();
    
    // Agregar eventos a los días
    addEventListenersToDays();
}

function generateCalendarDays() {
    const calendarBody = document.querySelector('.calendar-body');
    if (!calendarBody) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Obtener primer día del mes
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Obtener día de la semana del primer día
    const startDay = firstDay.getDay();
    
    // Limpiar calendario
    calendarBody.innerHTML = '';
    
    // Agregar días vacíos al inicio
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarBody.appendChild(emptyDay);
    }
    
    // Agregar días del mes
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Marcar día actual
        if (day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        // Agregar eventos de ejemplo
        if (day % 3 === 0) {
            dayElement.classList.add('has-events');
            dayElement.title = 'Tiene eventos programados';
        }
        
        calendarBody.appendChild(dayElement);
    }
}

function addEventListenersToDays() {
    const days = document.querySelectorAll('.calendar-day:not(.empty)');
    days.forEach(day => {
        day.addEventListener('click', handleDayClick);
    });
}

function handleDayClick(e) {
    const day = e.target;
    const dayNumber = day.textContent;
    
    // Mostrar eventos del día
    showDayEvents(dayNumber);
}

function showDayEvents(dayNumber) {
    // Crear modal de eventos
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Eventos del ${dayNumber} de ${getCurrentMonthName()}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="event-list">
                        <div class="event-item">
                            <div class="event-time">09:00</div>
                            <div class="event-details">
                                <h6>Sesión de fotos - María González</h6>
                                <p>Estudio principal</p>
                            </div>
                        </div>
                        <div class="event-item">
                            <div class="event-time">14:00</div>
                            <div class="event-details">
                                <h6>Entrega de álbum - Juan Pérez</h6>
                                <p>Recepción</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary">Agregar Evento</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Limpiar modal después de cerrar
    modal.addEventListener('hidden.bs.modal', () => {
        document.body.removeChild(modal);
    });
}

function getCurrentMonthName() {
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[new Date().getMonth()];
}

function initializeFilters() {
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', filterEvents);
    });
}

function initializeSearch() {
    const searchInput = document.querySelector('.dashboard-search input');
    
    if (searchInput) {
        searchInput.addEventListener('input', window.FotoStudio.debounce((e) => {
            const query = e.target.value.toLowerCase();
            filterEventsBySearch(query);
        }, 300));
    }
}

function initializeEvents() {
    // Agregar funcionalidad a botones de acción
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', handleEventAction);
    });
}

function filterEvents() {
    const typeFilter = document.querySelector('.filter-select');
    const statusFilter = document.querySelectorAll('.filter-select')[1];
    
    const type = typeFilter ? typeFilter.value : '';
    const status = statusFilter ? statusFilter.value : '';
    
    const events = document.querySelectorAll('.event-item');
    
    events.forEach(event => {
        const eventType = event.querySelector('.event-type').textContent.toLowerCase();
        const eventStatus = event.querySelector('.event-status').classList[1];
        
        let showEvent = true;
        
        if (type && !eventType.includes(type)) {
            showEvent = false;
        }
        
        if (status && !eventStatus.includes(status)) {
            showEvent = false;
        }
        
        event.style.display = showEvent ? 'block' : 'none';
    });
}

function filterEventsBySearch(query) {
    const events = document.querySelectorAll('.event-item');
    
    events.forEach(event => {
        const text = event.textContent.toLowerCase();
        const showEvent = text.includes(query);
        event.style.display = showEvent ? 'block' : 'none';
    });
}

function handleEventAction(e) {
    const button = e.target;
    const action = button.textContent.trim();
    const event = button.closest('.event-item');
    const eventId = event.querySelector('.event-id').textContent;
    
    switch(action) {
        case 'Editar':
            editEvent(eventId);
            break;
        case 'Eliminar':
            deleteEvent(eventId);
            break;
        case 'Completar':
            completeEvent(eventId);
            break;
    }
}

function editEvent(eventId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Editando evento ${eventId}`, 'info');
    }
}

function deleteEvent(eventId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Eliminando evento ${eventId}`, 'warning');
    }
}

function completeEvent(eventId) {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(`Completando evento ${eventId}`, 'success');
    }
}
