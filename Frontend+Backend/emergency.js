document.addEventListener('DOMContentLoaded', function() {
    // Emergency call button functionality
    const emergencyCallBtn = document.getElementById('emergency-call-btn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeBtn = document.querySelector('.close-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const confirmBtn = document.querySelector('.confirm-btn');

    // Open modal when emergency call button is clicked
    if (emergencyCallBtn) {
        emergencyCallBtn.addEventListener('click', function() {
            emergencyModal.style.display = 'flex';
        });
    }

    // Close modal functions
    function closeModal() {
        emergencyModal.style.display = 'none';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === emergencyModal) {
            closeModal();
        }
    });

    // Confirm emergency call
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            // In a real app, this would initiate an emergency call
            alert('Emergency call initiated. In a real application, this would connect to emergency services.');
            closeModal();
        });
    }

    // Caregiver alert button functionality
    const caregiverAlertBtn = document.getElementById('caregiver-alert-btn');
    
    if (caregiverAlertBtn) {
        caregiverAlertBtn.addEventListener('click', function() {
            const alertSent = confirm('Send alert to all caregivers?');
            
            if (alertSent) {
                showNotification('Alert sent to all caregivers. They will contact you shortly.');
                
                // In a real app, this would create a new log entry
                createNewLogEntry('Caregiver Alert', 'All caregivers notified');
            }
        });
    }

    // Medical info button functionality
    const medicalInfoBtn = document.getElementById('medical-info-btn');
    
    if (medicalInfoBtn) {
        medicalInfoBtn.addEventListener('click', function() {
            // In a real app, this would display medical information
            // For demo purposes, let's show an alert
            alert('Medical information displayed. In a real application, this would show your critical medical information for emergency personnel.');
        });
    }

    // Call buttons functionality
    const callBtns = document.querySelectorAll('.call-btn');
    
    callBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Get contact name from the closest contact card
            const contactName = this.closest('.contact-card').querySelector('h4').textContent;
            
            alert(`Calling ${contactName}... In a real application, this would initiate a phone call.`);
        });
    });

    // Add contact button functionality
    const addContactBtn = document.querySelector('.add-contact-btn');
    
    if (addContactBtn) {
        addContactBtn.addEventListener('click', function() {
            // In a real app, this would open a form to add a new contact
            alert('Add new emergency contact form would appear here. In a real application, this would allow you to add a new emergency contact.');
        });
    }

    // Show notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-bell"></i>
                <p>${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'rgba(29, 158, 163, 0.9)';
        notification.style.color = 'white';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '10px';
        notification.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        notification.style.zIndex = '1000';
        notification.style.display = 'flex';
        notification.style.justifyContent = 'space-between';
        notification.style.alignItems = 'center';
        notification.style.maxWidth = '400px';
        notification.style.animation = 'slideIn 0.5s forwards';
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
        
        // Close button functionality
        const closeNotification = notification.querySelector('.notification-close');
        closeNotification.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.5s forwards';
            setTimeout(() => {
                notification.remove();
            }, 500);
        });
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOut 0.5s forwards';
                setTimeout(() => {
                    notification.remove();
                }, 500);
            }
        }, 5000);
    }
    
    // Function to create a new log entry
    function createNewLogEntry(type, description) {
        const logEntriesList = document.querySelector('.log-entries');
        
        if (logEntriesList) {
            // Create new log entry element
            const newLogEntry = document.createElement('div');
            newLogEntry.className = 'log-entry';
            
            // Get current date and time
            const now = new Date();
            const date = now.toLocaleDateString();
            const time = now.toLocaleTimeString();
            
            // Create log entry content
            newLogEntry.innerHTML = `
                <div class="log-date">${date} - ${time}</div>
                <div class="log-type">${type}</div>
                <div class="log-description">${description}</div>
            `;
            
            // Add log entry to the list
            logEntriesList.insertBefore(newLogEntry, logEntriesList.firstChild);
        }
    }
    
    // Initial log entries for demonstration
    const demoLogEntries = [
        { type: 'Medical Check', description: 'Blood pressure checked: 120/80' },
        { type: 'Medication', description: 'Morning medication taken' },
        { type: 'Emergency', description: 'Fall detected - resolved' }
    ];
    
    // Add demo log entries
    const logEntriesList = document.querySelector('.log-entries');
    if (logEntriesList) {
        demoLogEntries.forEach(entry => {
            createNewLogEntry(entry.type, entry.description);
        });
    }
    
    // Medicine reminder functionality
    const medicineCheckboxes = document.querySelectorAll('.medicine-checkbox');
    
    medicineCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const medicineName = this.closest('.medicine-item').querySelector('.medicine-name').textContent;
            
            if (this.checked) {
                showNotification(`Medicine taken: ${medicineName}`);
                createNewLogEntry('Medication', `${medicineName} taken`);
            }
        });
    });
});