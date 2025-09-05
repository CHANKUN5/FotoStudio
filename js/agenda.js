// FotoStudio - Agenda JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar FotoStudio global
    window.FotoStudio.init();
    
    // Funciones específicas de agenda
    initializeAgenda();
});

function initializeAgenda() {
    // Inicializar calendario
    initializeCalendar();
    
    // Inicializar vista de citas
    initializeAppointments();
    
    // Configurar eventos
    setupEventListeners();
}

function initializeCalendar() {
    // Lógica del calendario
    console.log('Calendario inicializado');
}

function initializeAppointments() {
    // Lógica de citas
    console.log('Citas inicializadas');
}

function setupEventListeners() {
    // Event listeners para agenda
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

function switchView(view) {
    // Cambiar entre vista de semana y mes
    console.log('Cambiando a vista:', view);
}

function previousMonth() {
    // Navegar al mes anterior
    console.log('Mes anterior');
}

function nextMonth() {
    // Navegar al mes siguiente
    console.log('Mes siguiente');
}

function openNewAppointmentModal() {
    // Abrir modal de nueva cita
    const modal = document.getElementById('newAppointmentModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeNewAppointmentModal() {
    // Cerrar modal de nueva cita
    const modal = document.getElementById('newAppointmentModal');
    if (modal) {
        modal.style.display = 'none';
    }
}