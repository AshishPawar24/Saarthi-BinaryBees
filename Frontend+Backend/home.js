// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize charts
    renderHealthCharts();
    
    // Initialize cards animation
    animateContent();
    
    // Setup modal functionality
    setupModals();
    
    // Setup appointment actions
    setupAppointmentActions();
    
    // Setup emergency button
    setupEmergencyButton();
    
    // Setup mood tracker
    setupMoodTracker();
});

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Prevent default behavior if it's just a tab
            if(this.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });
}

// Animation on scroll
function animateContent() {
    const cards = document.querySelectorAll('.card, .dashboard-card');
    
    // Add fade-in class to all cards
    cards.forEach(card => {
        card.classList.add('fade-in');
    });
    
    // Check if IntersectionObserver is supported
    if('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('slide-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(card => {
            observer.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        cards.forEach(card => {
            card.classList.add('slide-up');
        });
    }
}

// Health Charts
function renderHealthCharts() {
    // Example chart data - would normally come from an API
    const healthData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Blood Pressure',
                data: [120, 118, 125, 119, 116, 122],
                borderColor: 'rgba(29, 158, 163, 1)',
                backgroundColor: 'rgba(29, 158, 163, 0.2)',
                fill: true
            },
            {
                label: 'Heart Rate',
                data: [75, 73, 77, 74, 72, 76],
                borderColor: 'rgba(255, 112, 67, 1)',
                backgroundColor: 'rgba(255, 112, 67, 0.2)',
                fill: true
            }
        ]
    };
    
    // Get chart container if it exists
    const chartContainer = document.getElementById('healthChart');
    
    if(chartContainer && typeof Chart !== 'undefined') {
        const ctx = chartContainer.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: healthData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }
}

// Modal functionality
function setupModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    
    // Open modal
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if(modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });
    
    // Close modal with close button
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            if(modal) {
                modal.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    });
    
    // Close modal when clicking outside
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if(e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if(e.key === 'Escape') {
            modalOverlays.forEach(overlay => {
                if(overlay.classList.contains('active')) {
                    overlay.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
            });
        }
    });
}

// Appointment Actions
function setupAppointmentActions() {
    const rescheduleButtons = document.querySelectorAll('.reschedule-btn');
    const cancelButtons = document.querySelectorAll('.cancel-btn');
    
    rescheduleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const appointmentId = this.closest('.appointment-item').getAttribute('data-id');
            
            // Show reschedule modal or form
            // This is a placeholder - you would implement actual functionality
            alert(`Reschedule appointment ${appointmentId}`);
        });
    });
    
    cancelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const appointmentItem = this.closest('.appointment-item');
            const appointmentId = appointmentItem.getAttribute('data-id');
            
            // Confirm before cancellation
            if(confirm('Are you sure you want to cancel this appointment?')) {
                // This is a placeholder - you would implement actual cancellation
                appointmentItem.style.opacity = '0.5';
                appointmentItem.style.pointerEvents = 'none';
                alert(`Appointment ${appointmentId} cancelled`);
            }
        });
    });
}

// Emergency Button
function setupEmergencyButton() {
    const emergencyButton = document.querySelector('.emergency-button');
    
    if(emergencyButton) {
        emergencyButton.addEventListener('click', function() {
            // This is a placeholder - you would implement actual emergency protocol
            alert('Emergency assistance requested. Help is on the way.');
            
            // Simulate emergency call
            const emergencyModal = document.getElementById('emergencyModal');
            if(emergencyModal) {
                emergencyModal.classList.add('active');
            }
        });
    }
}

// Mood Tracker
function setupMoodTracker() {
    const moodOptions = document.querySelectorAll('.mood-option');
    const moodSubmit = document.querySelector('.mood-submit');
    
    let selectedMood = null;
    
    if(moodOptions.length) {
        moodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                moodOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store selected mood
                selectedMood = this.getAttribute('data-mood');
            });
        });
    }
    
    if(moodSubmit) {
        moodSubmit.addEventListener('click', function() {
            if(selectedMood) {
                // This is a placeholder - you would save the mood data
                alert(`Mood "${selectedMood}" recorded for today. Thank you!`);
                
                // Close the modal if it's in one
                const modal = this.closest('.modal-overlay');
                if(modal) {
                    modal.classList.remove('active');
                }
            } else {
                alert('Please select a mood before submitting.');
            }
        });
    }
}

// Update Health Metrics
function updateHealthMetrics() {
    // This function would fetch the latest health data from an API
    // and update the dashboard metrics
    
    // For demonstration, we'll just set some random values
    const metrics = [
        { id: 'bloodPressure', value: `${Math.floor(110 + Math.random() * 20)}/${Math.floor(70 + Math.random() * 15)}`, change: Math.floor(Math.random() * 10) - 5 },
        { id: 'heartRate', value: Math.floor(65 + Math.random() * 15), change: Math.floor(Math.random() * 6) - 3 },
        { id: 'sleepHours', value: (6 + Math.random() * 2).toFixed(1), change: (Math.random() * 1.5 - 0.7).toFixed(1) },
        { id: 'steps', value: Math.floor(5000 + Math.random() * 5000), change: Math.floor(Math.random() * 1000) - 500 }
    ];
    
    metrics.forEach(metric => {
        const valueElement = document.getElementById(`${metric.id}Value`);
        const changeElement = document.getElementById(`${metric.id}Change`);
        
        if(valueElement) {
            valueElement.textContent = metric.value;
        }
        
        if(changeElement) {
            // Set positive or negative class and icon
            if(metric.change > 0) {
                changeElement.classList.remove('negative');
                changeElement.classList.add('positive');
                changeElement.innerHTML = `<i class="fas fa-arrow-up"></i> +${metric.change}`;
            } else {
                changeElement.classList.remove('positive');
                changeElement.classList.add('negative');
                changeElement.innerHTML = `<i class="fas fa-arrow-down"></i> ${metric.change}`;
            }
        }
    });
}

// Call updateHealthMetrics initially
setTimeout(updateHealthMetrics, 1000);

// Update metrics periodically (in a real app this would be from API)
setInterval(updateHealthMetrics, 30000);

// Handle Reminders
function setupReminders() {
    const reminderForm = document.getElementById('reminderForm');
    
    if(reminderForm) {
        reminderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = this.querySelector('#reminderTitle').value;
            const date = this.querySelector('#reminderDate').value;
            const time = this.querySelector('#reminderTime').value;
            
            if(title && date && time) {
                // This is a placeholder - you would save the reminder
                alert(`Reminder "${title}" set for ${date} at ${time}`);
                
                // Close the modal
                const modal = this.closest('.modal-overlay');
                if(modal) {
                    modal.classList.remove('active');
                }
                
                // Reset form
                this.reset();
            } else {
                alert('Please fill in all fields');
            }
        });
    }
}

// Initialize reminders when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupReminders();
});

// Handle Connect Requests
function setupConnectRequests() {
    const connectForm = document.getElementById('connectForm');
    
    if(connectForm) {
        connectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const supportType = this.querySelector('#supportType').value;
            const message = this.querySelector('#connectMessage').value;
            
            if(supportType && message) {
                // This is a placeholder - you would send the request
                alert(`Support request of type "${supportType}" has been sent. Someone will reach out to you soon.`);
                
                // Close the modal
                const modal = this.closest('.modal-overlay');
                if(modal) {
                    modal.classList.remove('active');
                }
                
                // Reset form
                this.reset();
            } else {
                alert('Please fill in all fields');
            }
        });
    }
}

// Initialize connect requests when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupConnectRequests();
});