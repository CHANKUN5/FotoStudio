// Funcionalidad específica para el dashboard

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    initializeWidgets();
    initializeActionButtons();
    loadMockData();
}

function initializeWidgets() {
    // Widget de pedidos
    const ordersWidget = document.querySelector('.ongoing-orders');
    if (ordersWidget) {
        initializeOrdersWidget(ordersWidget);
    }
    
    // Widget de mensajes
    const messagesWidget = document.querySelector('.messages');
    if (messagesWidget) {
        initializeMessagesWidget(messagesWidget);
    }
    
    // Widget de calendario
    const calendarWidget = document.querySelector('.calendar');
    if (calendarWidget) {
        initializeCalendarWidget(calendarWidget);
    }
}

function initializeOrdersWidget(widget) {
    const orderCards = widget.querySelectorAll('.order-card');
    orderCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.order-title').textContent;
            showOrderDetails(title);
        });
    });
}

function initializeMessagesWidget(widget) {
    const messageItems = widget.querySelectorAll('.message-item');
    messageItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('.message-name').textContent;
            openChat(name);
        });
    });
}

function initializeCalendarWidget(widget) {
    const calendarDays = widget.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', () => {
            if (day.textContent.trim()) {
                showDayEvents(day.textContent);
            }
        });
    });
}

function initializeActionButtons() {
    const notificationBtn = document.querySelector('.notification-btn');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', showNotifications);
    }
}

function showOrderDetails(title) {
    showNotification(`Abriendo detalles de: ${title}`, 'info');
}

function openChat(name) {
    showNotification(`Abriendo chat con: ${name}`, 'info');
}

function showDayEvents(day) {
    showNotification(`Eventos del día ${day}`, 'info');
}

function showNotifications() {
    showNotification('Mostrando notificaciones', 'info');
}

function showNotification(message, type = 'info') {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

function loadMockData() {
    console.log('Cargando datos de ejemplo...');
    updateChartsWithData();
}

function updateChartsWithData() {
    // Actualizar gráfico de horas de trabajo
    updateProductivityChart('week');
    
    // Actualizar métricas
    updateMetricsData();
}

function updateProductivityChart(period = 'week') {
    const canvas = document.getElementById('productivityChart');
    if (canvas) {
        drawProductivityChart(canvas, period);
    }
}

function drawProductivityChart(canvas, period = 'week') {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Datos según el período
    let data, labels, maxValue, title;
    
    switch(period) {
        case 'week':
            data = [24.5, 18.2, 8.8, 12.1, 15.3, 20.7, 22.4];
            labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
            maxValue = 30;
            title = 'Horas de Trabajo - Esta Semana';
            break;
        case 'month':
            data = [120, 135, 98, 156, 142, 178, 165, 189, 134, 167, 145, 198];
            labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            maxValue = 200;
            title = 'Horas de Trabajo - Este Año';
            break;
        default:
            data = [24.5, 18.2, 8.8, 12.1, 15.3, 20.7, 22.4];
            labels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
            maxValue = 30;
            title = 'Horas de Trabajo - Esta Semana';
    }
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurar estilos
    const barWidth = (width - 100) / data.length;
    const chartHeight = height - 80;
    const chartY = 40;
    
    // Dibujar título
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(title, width / 2, 20);
    
    // Dibujar barras
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = 50 + (index * barWidth);
        const y = chartY + chartHeight - barHeight;
        
        // Gradiente para la barra
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#7033ff');
        gradient.addColorStop(1, '#a855f7');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 10, barHeight);
        
        // Borde de la barra
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth - 10, barHeight);
        
        // Etiqueta del valor
        ctx.fillStyle = '#374151';
        ctx.font = '11px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${value}h`, x + (barWidth - 10) / 2, y - 5);
        
        // Etiqueta del día
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Arial';
        ctx.fillText(labels[index], x + (barWidth - 10) / 2, height - 10);
    });
    
    // Dibujar línea de meta
    const targetY = chartY + chartHeight - (20 / maxValue) * chartHeight;
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(50, targetY);
    ctx.lineTo(width - 50, targetY);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Etiqueta de meta
    ctx.fillStyle = '#ef4444';
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Meta: 20h', width - 10, targetY - 5);
}

function updateHoursSummary() {
    const summaryItems = document.querySelectorAll('.summary-item');
    const summaryData = [
        { title: 'Fotografía', time: '2h 15m', icon: '📸' },
        { title: 'Edición', time: '1h 45m', icon: '✏️' },
        { title: 'Diseño', time: '0h 30m', icon: '🖼️' }
    ];
    
    summaryItems.forEach((item, index) => {
        if (summaryData[index]) {
            const title = item.querySelector('.summary-title');
            const time = item.querySelector('.summary-time');
            const icon = item.querySelector('.summary-icon');
            
            if (title) title.textContent = summaryData[index].title;
            if (time) time.textContent = summaryData[index].time;
            if (icon) icon.textContent = summaryData[index].icon;
        }
    });
}

// Funciones para navegación de pedidos
function navigateOrders(direction) {
    const carousel = document.getElementById('ordersCarousel');
    const cards = carousel.querySelectorAll('.order-card');
    const activeCard = carousel.querySelector('.order-card.active');
    let currentIndex = Array.from(cards).indexOf(activeCard);
    
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % cards.length;
    } else {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }
    
    // Remover clase active de todas las tarjetas
    cards.forEach(card => card.classList.remove('active'));
    
    // Agregar clase active a la tarjeta actual
    cards[currentIndex].classList.add('active');
}

// Funciones para mostrar modales y menús
function showNotifications() {
    alert('Sistema de notificaciones:\n\n• Nueva cita programada para mañana\n• Pedido de María González completado\n• Recordatorio: Entrega de álbum a las 14:00\n• Nuevo mensaje de Carlos Pérez\n• Reunión de equipo a las 16:00');
}

function showNewOrderModal() {
    alert('Funcionalidad de Nuevo Pedido:\n\n• Formulario para crear pedidos\n• Selección de tipo de servicio\n• Asignación de cliente\n• Configuración de fechas\n• Estimación de costos');
}

function showOrdersMenu() {
    alert('Opciones de Pedidos:\n\n• Ver todos los pedidos\n• Filtrar por estado\n• Exportar reportes\n• Configurar notificaciones');
}

function showProductivityMenu() {
    alert('Opciones de Productividad:\n\n• Configurar metas\n• Ver estadísticas detalladas\n• Exportar datos\n• Configurar alertas');
}

function showNewAppointmentModal() {
    alert('Funcionalidad de Nueva Cita:\n\n• Programar sesión\n• Seleccionar cliente\n• Configurar ubicación\n• Enviar recordatorios\n• Sincronizar calendario');
}

function showAppointmentsMenu() {
    alert('Opciones de Citas:\n\n• Ver calendario completo\n• Filtrar por fecha\n• Configurar recordatorios\n• Exportar agenda');
}

function updateMetricsData() {
    // Simular datos de métricas
    const metricsData = {
        revenue: 'S/ 45,230',
        orders: '156',
        clients: '89',
        completed: '142'
    };
    
    // Actualizar métricas si existen en el DOM
    const revenueElement = document.querySelector('[data-metric="revenue"]');
    const ordersElement = document.querySelector('[data-metric="orders"]');
    const clientsElement = document.querySelector('[data-metric="clients"]');
    const completedElement = document.querySelector('[data-metric="completed"]');
    
    if (revenueElement) revenueElement.textContent = metricsData.revenue;
    if (ordersElement) ordersElement.textContent = metricsData.orders;
    if (clientsElement) clientsElement.textContent = metricsData.clients;
    if (completedElement) completedElement.textContent = metricsData.completed;
}