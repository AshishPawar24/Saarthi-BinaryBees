// Main JavaScript file for Caregiver Connect page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize FAQ accordions
    initFaqAccordions();
    
    // Initialize modals
    initModals();
    
    // Simulate search functionality
    initSearchForm();
    
    // Interview form handling
    initInterviewForm();
    
    // Consultation form handling
    initConsultationForm();
    
    // View more functionality
    initViewMoreButton();
});

// Handle FAQ accordions
function initFaqAccordions() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentNode;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If clicked item wasn't active, make it active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Initialize modal functionality
function initModals() {
    // Modal trigger buttons
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalOverlays = document.querySelectorAll('.modal-overlay');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const cancelButtons = document.querySelectorAll('#cancelInterview, #cancelConsultation');
    
    // Open modal when trigger is clicked
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when X button is clicked
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });
    
    // Close modal when cancel button is clicked
    cancelButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside of modal content
    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });
    
    // Close modal when ESC key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
}

// Close modal helper function
function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Initialize search form functionality
function initSearchForm() {
    const searchForm = document.querySelector('.search-box form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const location = document.getElementById('location').value;
            const specialization = document.getElementById('specialization').value;
            const availability = document.getElementById('availability').value;
            
            // Normally, this would trigger an AJAX request to search for caregivers
            // For demo purposes, simulate search with an alert
            showNotification(`Searching for ${specialization || 'all'} caregivers in ${location || 'your area'} with ${availability || 'any'} availability`);
            
            // In a real application, you'd send this data to your backend and display the results
        });
    }
}

// Initialize interview scheduling form
function initInterviewForm() {
    const interviewForm = document.getElementById('interviewForm');
    const confirmInterviewBtn = document.getElementById('confirmInterview');
    
    if (confirmInterviewBtn) {
        confirmInterviewBtn.addEventListener('click', () => {
            // Get form values
            const date = document.getElementById('interviewDate').value;
            const time = document.getElementById('interviewTime').value;
            const method = document.getElementById('interviewMethod').value;
            
            // Validate form
            if (!date || !time || !method) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // In a real application, you'd send this data to your backend
            showNotification('Interview scheduled successfully!', 'success');
            
            // Close the modal after successful submission
            const modal = confirmInterviewBtn.closest('.modal-overlay');
            closeModal(modal);
            
            // Reset form
            interviewForm.reset();
        });
    }
}

// Initialize consultation request form
function initConsultationForm() {
    const consultationForm = document.getElementById('consultationForm');
    const confirmConsultationBtn = document.getElementById('confirmConsultation');
    
    if (confirmConsultationBtn) {
        confirmConsultationBtn.addEventListener('click', () => {
            // Get form values
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const careType = document.getElementById('careType').value;
            const date = document.getElementById('consultationDate').value;
            
            // Validate form
            if (!name || !email || !phone || !careType || !date) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Phone validation
            if (!validatePhone(phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // In a real application, you'd send this data to your backend
            showNotification('Consultation request submitted successfully!', 'success');
            
            // Close the modal after successful submission
            const modal = confirmConsultationBtn.closest('.modal-overlay');
            closeModal(modal);
        

            // Reset form
            consultationForm.reset();
        });
    }
}

// Initialize "View More" button functionality
function initViewMoreButton() {
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const hiddenCaregivers = document.querySelectorAll('.caregiver-card.hidden');
    
    if (viewMoreBtn && hiddenCaregivers.length > 0) {
        viewMoreBtn.addEventListener('click', () => {
            // Show hidden caregiver cards
            hiddenCaregivers.forEach(card => {
                card.classList.remove('hidden');
            });
            
            // Hide the "View More" button after all cards are shown
            viewMoreBtn.style.display = 'none';
        });
    }
}

// Email validation helper function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation helper function
function validatePhone(phone) {
    // Accept formats like (123) 456-7890, 123-456-7890, 1234567890
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
    return re.test(String(phone));
}

// Show notification helper function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300); // Wait for fade out animation
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300); // Wait for fade out animation
    });
}