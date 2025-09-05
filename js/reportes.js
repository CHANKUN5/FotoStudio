// Funcionalidad específica para la página de reportes

document.addEventListener('DOMContentLoaded', function() {
    initializeReportes();
});

function initializeReportes() {
    // Inicializar gráficos
    initializeCharts();
    
    // Inicializar filtros
    initializeFilters();
    
    // Cargar datos de ejemplo
    loadReportData();
}

function initializeCharts() {
    // Gráfico de ingresos
    const revenueChart = document.getElementById('revenueChart');
    if (revenueChart) {
        drawRevenueChart(revenueChart);
    }
    
    // Gráfico de servicios
    const servicesChart = document.getElementById('servicesChart');
    if (servicesChart) {
        drawServicesChart(servicesChart);
    }
}

function initializeFilters() {
    const periodFilter = document.querySelector('.period-filter');
    if (periodFilter) {
        periodFilter.addEventListener('change', (e) => {
            updateCharts(e.target.value);
        });
    }
}

function loadReportData() {
    // Cargar datos de ejemplo para reportes
    updateOverviewCards();
    updateTopClients();
    updatePopularServices();
    updateMetrics();
}

function drawRevenueChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Datos de ejemplo para los últimos 6 meses
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    const revenueData = [12000, 15000, 18000, 22000, 19000, 25000];
    const maxRevenue = Math.max(...revenueData);
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    // Configurar estilos
    ctx.strokeStyle = '#7033ff';
    ctx.fillStyle = 'rgba(112, 51, 255, 0.1)';
    ctx.lineWidth = 3;
    
    // Dibujar área del gráfico
    ctx.beginPath();
    ctx.moveTo(50, height - 50);
    
    revenueData.forEach((value, index) => {
        const x = 50 + (index * (width - 100) / (revenueData.length - 1));
        const y = height - 50 - ((value / maxRevenue) * (height - 100));
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.lineTo(width - 50, height - 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Dibujar puntos
    ctx.fillStyle = '#7033ff';
    revenueData.forEach((value, index) => {
        const x = 50 + (index * (width - 100) / (revenueData.length - 1));
        const y = height - 50 - ((value / maxRevenue) * (height - 100));
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    // Dibujar etiquetas
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    months.forEach((month, index) => {
        const x = 50 + (index * (width - 100) / (months.length - 1));
        ctx.fillText(month, x, height - 20);
    });
}

function drawServicesChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 20;
    
    // Datos de ejemplo
    const servicesData = [
        { label: 'Bodas', value: 45, color: '#7033ff' },
        { label: 'Retratos', value: 25, color: '#10b981' },
        { label: 'Eventos', value: 20, color: '#f59e0b' },
        { label: 'Productos', value: 10, color: '#ef4444' }
    ];
    
    const total = servicesData.reduce((sum, item) => sum + item.value, 0);
    
    // Limpiar canvas
    ctx.clearRect(0, 0, width, height);
    
    let currentAngle = -Math.PI / 2;
    
    servicesData.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        // Dibujar sector
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Dibujar borde
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Dibujar etiqueta
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius + 20);
        const labelY = centerY + Math.sin(labelAngle) * (radius + 20);
        
        ctx.fillStyle = '#374151';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
}

function updateOverviewCards() {
    const overviewData = [
        { value: 'S/ 45,230', label: 'Ingresos Totales', change: '+12.5%', positive: true },
        { value: '156', label: 'Pedidos Completados', change: '+8.2%', positive: true },
        { value: '89', label: 'Clientes Activos', change: '+15.3%', positive: true },
        { value: '4.9', label: 'Rating Promedio', change: '+0.2', positive: true }
    ];
    
    const overviewCards = document.querySelectorAll('.overview-card');
    overviewCards.forEach((card, index) => {
        if (overviewData[index]) {
            const valueElement = card.querySelector('.overview-value');
            const labelElement = card.querySelector('.overview-label');
            const changeElement = card.querySelector('.overview-change');
            
            if (valueElement) valueElement.textContent = overviewData[index].value;
            if (labelElement) labelElement.textContent = overviewData[index].label;
            if (changeElement) {
                changeElement.textContent = overviewData[index].change;
                changeElement.className = `overview-change ${overviewData[index].positive ? 'positive' : 'negative'}`;
            }
        }
    });
}

function updateTopClients() {
    const clientsData = [
        { name: 'María González', orders: 8, amount: 'S/ 12,500' },
        { name: 'Carlos Pérez', orders: 6, amount: 'S/ 9,800' },
        { name: 'Ana Martínez', orders: 5, amount: 'S/ 7,200' },
        { name: 'Laura Rodríguez', orders: 4, amount: 'S/ 6,500' },
        { name: 'Miguel Torres', orders: 3, amount: 'S/ 4,800' }
    ];
    
    const clientsList = document.querySelector('.top-clients');
    if (clientsList) {
        clientsList.innerHTML = '';
        
        clientsData.forEach((client, index) => {
            const clientElement = document.createElement('div');
            clientElement.className = 'client-item';
            clientElement.innerHTML = `
                <div class="client-rank">${index + 1}</div>
                <div class="client-info">
                    <div class="client-name">${client.name}</div>
                    <div class="client-orders">${client.orders} pedidos</div>
                </div>
                <div class="client-amount">${client.amount}</div>
            `;
            clientsList.appendChild(clientElement);
        });
    }
}

function updatePopularServices() {
    const servicesData = [
        { name: 'Fotografía de Bodas', stats: '45 sesiones', progress: 90 },
        { name: 'Retratos Familiares', stats: '32 sesiones', progress: 70 },
        { name: 'Fotografía de Productos', stats: '28 sesiones', progress: 60 },
        { name: 'Eventos Corporativos', stats: '15 sesiones', progress: 40 }
    ];
    
    const servicesList = document.querySelector('.popular-services');
    if (servicesList) {
        servicesList.innerHTML = '';
        
        servicesData.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.className = 'service-item';
            serviceElement.innerHTML = `
                <div class="service-icon">📸</div>
                <div class="service-info">
                    <div class="service-name">${service.name}</div>
                    <div class="service-stats">${service.stats}</div>
                </div>
                <div class="service-progress">
                    <div class="progress-bar" style="width: ${service.progress}%"></div>
                </div>
            `;
            servicesList.appendChild(serviceElement);
        });
    }
}

function updateMetrics() {
    const metricsData = [
        { label: 'Tiempo Promedio', value: '2.5h', trend: '+0.3h' },
        { label: 'Satisfacción', value: '98%', trend: '+2%' },
        { label: 'Recomendaciones', value: '87%', trend: '+5%' },
        { label: 'Retención', value: '92%', trend: '+3%' }
    ];
    
    const metricsGrid = document.querySelector('.metrics-grid');
    if (metricsGrid) {
        metricsGrid.innerHTML = '';
        
        metricsData.forEach(metric => {
            const metricElement = document.createElement('div');
            metricElement.className = 'metric-item';
            metricElement.innerHTML = `
                <div class="metric-label">${metric.label}</div>
                <div class="metric-value">${metric.value}</div>
                <div class="metric-trend positive">${metric.trend}</div>
            `;
            metricsGrid.appendChild(metricElement);
        });
    }
}

function updateCharts(period) {
    showNotification(`Actualizando gráficos para: ${period}`, 'info');
    
    // Re-dibujar gráficos con nuevos datos
    const revenueChart = document.getElementById('revenueChart');
    if (revenueChart) {
        drawRevenueChart(revenueChart);
    }
    
    const servicesChart = document.getElementById('servicesChart');
    if (servicesChart) {
        drawServicesChart(servicesChart);
    }
}

function showNotification(message, type = 'info') {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}