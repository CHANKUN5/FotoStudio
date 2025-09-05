document.addEventListener('DOMContentLoaded', function() {
    initializeReports();
});

function initializeReports() {
    initializeCharts();
    initializeFilters();
    loadSummaryData();
    animateMetrics();
}

function initializeCharts() {
    const servicesChart = document.getElementById('servicesChart');
    const clientsChart = document.getElementById('clientsChart');
    
    if (servicesChart) {
        drawServicesChart(servicesChart);
    }
    
    if (clientsChart) {
        drawClientsChart(clientsChart);
    }
}

function initializeFilters() {
    const periodFilter = document.getElementById('period-filter');
    if (periodFilter) {
        periodFilter.addEventListener('change', handlePeriodChange);
    }
    
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', handleExport);
    }
}

function drawServicesChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;
    
    const data = [
        { label: 'Impresión Minilab', value: 15, color: '#7c3aed' },
        { label: 'Recordatorios Escolares', value: 35, color: '#10b981' },
        { label: 'Enmarcado', value: 30, color: '#3b82f6' },
        { label: 'Retoque Fotográfico', value: 20, color: '#f59e0b' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    ctx.clearRect(0, 0, width, height);
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelRadius = radius + 30;
        const labelX = centerX + Math.cos(labelAngle) * labelRadius;
        const labelY = centerY + Math.sin(labelAngle) * labelRadius;
        
        ctx.fillStyle = '#374151';
        ctx.font = '12px Be Vietnam Pro';
        ctx.textAlign = 'center';
        ctx.fillText(`${item.value}%`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
    
    drawLegend(ctx, data, width, height);
}

function drawClientsChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const data = [
        { name: 'Colegio San José', value: 5000 },
        { name: 'Colegio Santa María', value: 4200 },
        { name: 'Juan Pérez', value: 2800 },
        { name: 'María López', value: 2000 },
        { name: 'Otros', value: 1000 }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const padding = 60;
    const barWidth = (width - padding * 2) / data.length - 20;
    const chartHeight = height - padding * 2;
    
    ctx.clearRect(0, 0, width, height);
    
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = padding + (index * (barWidth + 20));
        const y = height - padding - barHeight;
        
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, '#7c3aed');
        gradient.addColorStop(1, '#a855f7');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        ctx.fillStyle = '#374151';
        ctx.font = '11px Be Vietnam Pro';
        ctx.textAlign = 'center';
        
        const label = item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name;
        ctx.fillText(label, x + barWidth / 2, height - padding + 15);
        
        ctx.fillStyle = '#7c3aed';
        ctx.font = 'bold 12px Be Vietnam Pro';
        ctx.fillText(`$${item.value}`, x + barWidth / 2, y - 5);
    });
}

function drawLegend(ctx, data, width, height) {
    const legendY = height - 40;
    const legendItemWidth = width / data.length;
    
    data.forEach((item, index) => {
        const x = index * legendItemWidth + legendItemWidth / 2;
        
        ctx.fillStyle = item.color;
        ctx.fillRect(x - 30, legendY - 8, 12, 12);
        
        ctx.fillStyle = '#374151';
        ctx.font = '10px Be Vietnam Pro';
        ctx.textAlign = 'left';
        ctx.fillText(item.label, x - 15, legendY);
    });
}

function loadSummaryData() {
    const summaryData = [
        { service: 'Impresión Minilab', quantity: 45, revenue: 2250.00, percentage: 15 },
        { service: 'Recordatorios Escolares', quantity: 120, revenue: 5250.00, percentage: 35 },
        { service: 'Enmarcado', quantity: 80, revenue: 4500.00, percentage: 30 },
        { service: 'Retoque Fotográfico', quantity: 35, revenue: 3000.00, percentage: 20 }
    ];
    
    const tableBody = document.getElementById('summaryTable');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    summaryData.forEach(item => {
        const row = document.createElement('div');
        row.className = 'table-row';
        
        row.innerHTML = `
            <div class="table-cell">
                <span class="service-name">${item.service}</span>
            </div>
            <div class="table-cell">${item.quantity}</div>
            <div class="table-cell">
                <span class="amount">$${item.revenue.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</span>
            </div>
            <div class="table-cell">
                <span class="percentage">${item.percentage}%</span>
            </div>
        `;
        
        tableBody.appendChild(row);
    });
}

function animateMetrics() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    metricCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

function handlePeriodChange(event) {
    const period = event.target.value;
    showLoadingState();
    
    setTimeout(() => {
        updateChartsForPeriod(period);
        hideLoadingState();
        showNotification(`Datos actualizados para: ${getPeriodLabel(period)}`);
    }, 800);
}

function updateChartsForPeriod(period) {
    const servicesChart = document.getElementById('servicesChart');
    const clientsChart = document.getElementById('clientsChart');
    
    if (servicesChart) drawServicesChart(servicesChart);
    if (clientsChart) drawClientsChart(clientsChart);
    
    loadSummaryData();
}

function showLoadingState() {
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        card.style.opacity = '0.6';
        card.style.pointerEvents = 'none';
    });
}

function hideLoadingState() {
    const chartCards = document.querySelectorAll('.chart-card');
    chartCards.forEach(card => {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
    });
}

function getPeriodLabel(period) {
    const labels = {
        'today': 'Hoy',
        'week': 'Esta semana',
        'month': 'Este mes',
        'quarter': 'Este trimestre',
        'year': 'Este año'
    };
    return labels[period] || period;
}

function handleExport() {
    const exportBtn = document.querySelector('.export-btn');
    const originalText = exportBtn.innerHTML;
    
    exportBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Exportando...
    `;
    
    exportBtn.style.opacity = '0.7';
    exportBtn.disabled = true;
    
    setTimeout(() => {
        exportBtn.innerHTML = originalText;
        exportBtn.style.opacity = '1';
        exportBtn.disabled = false;
        showNotification('Reporte exportado exitosamente');
    }, 2000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#7c3aed'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

window.addEventListener('resize', () => {
    initializeCharts();
});