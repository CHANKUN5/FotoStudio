document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    initializeChart();
    initializeTasks();
    initializeTimeBlocks();
    initializeTabSwitching();
    loadDashboardData();
}

function initializeChart() {
    const canvas = document.getElementById('visitorsChart');
    if (canvas) {
        drawVisitorsChart(canvas);
    }
}

function drawVisitorsChart(canvas) {
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    const width = rect.width;
    const height = rect.height;
    
    const data = [
        { date: 'Jun 1', value: 65 },
        { date: 'Jun 3', value: 75 },
        { date: 'Jun 5', value: 58 },
        { date: 'Jun 7', value: 90 },
        { date: 'Jun 9', value: 70 },
        { date: 'Jun 11', value: 85 },
        { date: 'Jun 13', value: 78 },
        { date: 'Jun 15', value: 95 },
        { date: 'Jun 17', value: 88 },
        { date: 'Jun 19', value: 92 },
        { date: 'Jun 21', value: 105 },
        { date: 'Jun 23', value: 98 },
        { date: 'Jun 25', value: 115 },
        { date: 'Jun 27', value: 108 },
        { date: 'Jun 29', value: 125 }
    ];
    
    const padding = { top: 20, right: 40, bottom: 40, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const valueRange = maxValue - minValue;
    
    ctx.clearRect(0, 0, width, height);
    
    const points = data.map((d, i) => ({
        x: padding.left + (chartWidth * i) / (data.length - 1),
        y: padding.top + chartHeight - ((d.value - minValue) / valueRange) * chartHeight,
        value: d.value,
        date: d.date
    }));
    
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
    gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.1)');
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fill();
    
    const lineGradient = ctx.createLinearGradient(0, 0, chartWidth, 0);
    lineGradient.addColorStop(0, '#a855f7');
    lineGradient.addColorStop(1, '#22c55e');
    
    ctx.strokeStyle = lineGradient;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();
    
    points.forEach(point => {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.strokeStyle = lineGradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.stroke();
    });
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px Be Vietnam Pro';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < data.length; i += 2) {
        const point = points[i];
        ctx.fillText(data[i].date, point.x, height - 10);
    }
    
    ctx.textAlign = 'right';
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
        const value = minValue + (valueRange * i) / ySteps;
        const y = padding.top + chartHeight - (i * chartHeight) / ySteps;
        ctx.fillText(Math.round(value).toString(), padding.left - 10, y + 4);
        
        if (i > 0) {
            ctx.strokeStyle = '#f3f4f6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }
    }
}

function initializeTasks() {
    const taskItems = document.querySelectorAll('.task-item');
    taskItems.forEach(item => {
        const checkbox = item.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.addEventListener('click', () => toggleTask(item));
        }
    });
    
    const addTaskBtn = document.querySelector('.add-task-btn');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', showAddTaskModal);
    }
}

function toggleTask(taskItem) {
    taskItem.classList.toggle('completed');
    
    const taskTitle = taskItem.querySelector('.task-title');
    if (taskTitle) {
        const isCompleted = taskItem.classList.contains('completed');
        if (isCompleted) {
            showNotification('Tarea completada', 'success');
        } else {
            showNotification('Tarea marcada como pendiente', 'info');
        }
    }
}

function initializeTimeBlocks() {
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        block.addEventListener('click', () => {
            const eventTitle = block.querySelector('.event-title');
            if (eventTitle && eventTitle.textContent !== 'Libre') {
                showEventDetails(block);
            }
        });
    });
}

function showEventDetails(block) {
    const title = block.querySelector('.event-title')?.textContent;
    const client = block.querySelector('.event-client')?.textContent;
    const time = block.querySelector('.time-label')?.textContent;
    
    showNotification(`Evento: ${title}${client ? ` - ${client}` : ''} a las ${time}`, 'info');
}

function initializeTabSwitching() {
    const tabs = document.querySelectorAll('.section-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });
    
    const chartTabs = document.querySelectorAll('.chart-tab');
    chartTabs.forEach(tab => {
        tab.addEventListener('click', () => switchChartTab(tab));
    });
}

function switchTab(activeTab) {
    const tabs = document.querySelectorAll('.section-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
    
    showNotification(`Cambiando a: ${activeTab.textContent}`, 'info');
}

function switchChartTab(activeTab) {
    const tabs = document.querySelectorAll('.chart-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
    
    showNotification(`Período seleccionado: ${activeTab.textContent}`, 'info');
}

function loadDashboardData() {
    updateMetrics();
    updateTaskProgress();
    updateTimeStatus();
}

function updateMetrics() {
    const metrics = [
        { selector: '.revenue .metric-value', value: 'S/ 45,230' },
        { selector: '.customers .metric-value', value: '1,234' },
        { selector: '.accounts .metric-value', value: '45,678' },
        { selector: '.growth .metric-value', value: '4.5%' }
    ];
    
    metrics.forEach(metric => {
        const element = document.querySelector(metric.selector);
        if (element) {
            animateCounter(element, metric.value);
        }
    });
}

function animateCounter(element, finalValue) {
    const isPercentage = finalValue.includes('%');
    const isCurrency = finalValue.includes('S/');
    const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const duration = 1500;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(currentValue);
        if (isCurrency) {
            displayValue = `S/ ${displayValue.toLocaleString()}`;
        } else if (isPercentage) {
            displayValue = `${(currentValue / 1000).toFixed(1)}%`;
        } else {
            displayValue = displayValue.toLocaleString();
        }
        
        element.textContent = displayValue;
    }, stepTime);
}

function updateTaskProgress() {
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const totalTasks = document.querySelectorAll('.task-item').length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    
    console.log(`Progreso de tareas: ${Math.round(progress)}%`);
}

function updateTimeStatus() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    
    const timeBlocks = document.querySelectorAll('.time-block');
    timeBlocks.forEach(block => {
        const timeLabel = block.querySelector('.time-label');
        if (timeLabel) {
            const blockHour = parseInt(timeLabel.textContent.split(':')[0]);
            
            if (blockHour === currentHour) {
                block.classList.add('current');
            } else if (blockHour < currentHour) {
                block.classList.add('past');
            }
        }
    });
}

function showAddTaskModal() {
    const taskName = prompt('Ingrese el nombre de la nueva tarea:');
    if (taskName && taskName.trim()) {
        const taskTime = prompt('Ingrese el horario (ej: 09:00 - 10:00):');
        if (taskTime && taskTime.trim()) {
            addNewTask(taskName.trim(), taskTime.trim());
        }
    }
}

function addNewTask(title, time) {
    const tasksList = document.querySelector('.tasks-list');
    if (tasksList) {
        const newTask = document.createElement('div');
        newTask.className = 'task-item';
        
        newTask.innerHTML = `
            <div class="task-checkbox"></div>
            <div class="task-content">
                <span class="task-title">${title}</span>
                <span class="task-time">${time}</span>
            </div>
        `;
        
        const checkbox = newTask.querySelector('.task-checkbox');
        checkbox.addEventListener('click', () => toggleTask(newTask));
        
        tasksList.appendChild(newTask);
        showNotification('Nueva tarea agregada', 'success');
    }
}

function showNotifications() {
    const notifications = [
        'Nueva cita programada para mañana',
        'Pedido de María González completado',
        'Recordatorio: Entrega de álbum a las 14:00',
        'Nuevo mensaje de Carlos Pérez',
        'Reunión de equipo a las 16:00'
    ];
    
    showNotification(`Tienes ${notifications.length} notificaciones nuevas`, 'info');
}

function showNewOrderModal() {
    showNotification('Abriendo formulario de nuevo pedido...', 'info');
}

function showNotification(message, type = 'info') {
    if (window.FotoStudio && window.FotoStudio.showNotification) {
        window.FotoStudio.showNotification(message, type);
    } else {
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#7c3aed',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: '500',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
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
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('visitorsChart');
    if (canvas) {
        setTimeout(() => drawVisitorsChart(canvas), 100);
    }
});

setInterval(updateTimeStatus, 60000);