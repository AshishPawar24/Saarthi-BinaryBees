document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            
            // Toggle eye icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Registration modal functionality
    const modal = document.getElementById('registrationModal');
    const registerLink = document.getElementById('registerLink');
    const closeBtn = document.querySelector('.close-btn');
    const signInLink = document.getElementById('signInLink');
    
    // Open modal
    if (registerLink && modal) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }
    
    // Close modal
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Switch back to sign in
    if (signInLink && modal) {
        signInLink.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Multi-step form functionality
    const nextButtons = document.querySelectorAll('.btn-next');
    const backButtons = document.querySelectorAll('.btn-back');
    const formSteps = document.querySelectorAll('.form-step');
    const progressBar = document.getElementById('formProgress');
    const steps = document.querySelectorAll('.step');
    
    // Next step buttons - FIXED this section to ensure it works correctly
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the current step number from the button's data attribute
            const nextStep = parseInt(this.getAttribute('data-next'));
            const currentStep = nextStep - 1;
            
            console.log(`Attempting to move from step ${currentStep} to step ${nextStep}`);
            
            // Skip validation for now to debug navigation
            // Comment out validation for testing purposes
            // if (validateStep(currentStep)) {
                // Hide all steps first
                formSteps.forEach(step => {
                    step.style.display = 'none';
                });
                
                // Show next step
                if (formSteps[nextStep-1]) {
                    formSteps[nextStep-1].style.display = 'block';
                    
                    // Update progress bar
                    if (progressBar) {
                        progressBar.style.width = (nextStep / formSteps.length * 100) + '%';
                    }
                    
                    // Update step indicators
                    steps.forEach(step => {
                        const stepNum = parseInt(step.getAttribute('data-step'));
                        step.classList.remove('active');
                        
                        if (stepNum === nextStep) {
                            step.classList.add('active');
                        } else if (stepNum < nextStep) {
                            step.classList.add('completed');
                        }
                    });
                    
                    // Scroll to top of form
                    if (modal) {
                        modal.scrollTo(0, 0);
                    }
                } else {
                    console.error(`Step ${nextStep} not found`);
                }
            // } else {
            //     console.log(`Validation failed for step ${currentStep}`);
            // }
        });
    });
    
    // Back buttons
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-back'));
            const currentStep = prevStep + 1;
            
            console.log(`Moving back from step ${currentStep} to step ${prevStep}`);
            
            // Hide all steps first
            formSteps.forEach(step => {
                step.style.display = 'none';
            });
            
            // Show previous step
            if (formSteps[prevStep-1]) {
                formSteps[prevStep-1].style.display = 'block';
                
                // Update progress bar
                if (progressBar) {
                    progressBar.style.width = (prevStep / formSteps.length * 100) + '%';
                }
                
                // Update step indicators
                steps.forEach(step => {
                    const stepNum = parseInt(step.getAttribute('data-step'));
                    step.classList.remove('active', 'completed');
                    
                    if (stepNum === prevStep) {
                        step.classList.add('active');
                    } else if (stepNum < prevStep) {
                        step.classList.add('completed');
                    }
                });
                
                // Scroll to top of form
                if (modal) {
                    modal.scrollTo(0, 0);
                }
            } else {
                console.error(`Step ${prevStep} not found`);
            }
        });
    });
    
    // Re-enable and fix validation function after navigation is working
    function validateStep(stepIndex) {
        const currentStep = formSteps[stepIndex];
        if (!currentStep) {
            console.error(`Step at index ${stepIndex} not found`);
            return false; 
        }
        
        const requiredFields = currentStep.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                highlightError(field);
                console.log(`Field ${field.id || 'unknown'} is empty`);
            } else {
                removeError(field);
            }
        });
        
        // Step-specific validation
        if (stepIndex === 0) {
            // Password match validation
            const password = document.getElementById('regPassword');
            const confirmPassword = document.getElementById('regConfirmPassword');
            
            if (password && confirmPassword && password.value !== confirmPassword.value) {
                isValid = false;
                highlightError(confirmPassword);
                showMessage('Passwords do not match', 'error');
                console.log('Passwords do not match');
            }
            
            // Email validation
            const email = document.getElementById('regEmail');
            if (email && !validateEmail(email.value) && email.value.trim()) {
                isValid = false;
                highlightError(email);
                showMessage('Please enter a valid email address', 'error');
                console.log('Invalid email format');
            }
        }
        
        return isValid;
    }
    
    // Highlight error field
    function highlightError(field) {
        field.style.borderColor = 'var(--error-color)';
        field.addEventListener('input', function() {
            removeError(field);
        }, { once: true });
    }
    
    // Remove error highlight
    function removeError(field) {
        field.style.borderColor = 'var(--border-color)';
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Show message helper
    function showMessage(message, type) {
        const messageContainer = document.createElement('div');
        messageContainer.className = `message ${type}`;
        messageContainer.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Find where to insert message
        const currentStep = document.querySelector('.form-step[style="display: block"]') || formSteps[0];
        const heading = currentStep.querySelector('h2');
        
        if (heading) {
            // Remove any existing messages
            const existingMessage = currentStep.querySelector('.message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Insert after heading
            heading.insertAdjacentElement('afterend', messageContainer);
            
            // Remove after 5 seconds
            setTimeout(() => {
                messageContainer.remove();
            }, 5000);
        }
    }
    
    // Add medication functionality
    const addMedicationBtn = document.getElementById('add-medication');
    const medicationsContainer = document.getElementById('medications-container');
    
    if (addMedicationBtn && medicationsContainer) {
        addMedicationBtn.addEventListener('click', function() {
            const newMedicationEntry = document.createElement('div');
            newMedicationEntry.className = 'medication-entry';
            newMedicationEntry.innerHTML = `
                <div class="form-row">
                    <div class="form-group half">
                        <input type="text" class="med-name" placeholder="Medication name" required>
                    </div>
                    <div class="form-group quarter">
                        <input type="text" class="med-dosage" placeholder="Dosage">
                    </div>
                    <div class="form-group quarter">
                        <select class="med-frequency">
                            <option value="daily">Daily</option>
                            <option value="twice">Twice daily</option>
                            <option value="morning">Morning</option>
                            <option value="evening">Evening</option>
                            <option value="weekly">Weekly</option>
                            <option value="as-needed">As needed</option>
                        </select>
                    </div>
                </div>
                <button type="button" class="remove-medication btn-link">
                    <i class="fas fa-times"></i> Remove
                </button>
            `;
            
            medicationsContainer.appendChild(newMedicationEntry);
            
            // Add remove functionality
            const removeBtn = newMedicationEntry.querySelector('.remove-medication');
            removeBtn.addEventListener('click', function() {
                newMedicationEntry.remove();
            });
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Basic validation
            if (!email || !password) {
                showLoginMessage('Please fill in all required fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showLoginMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate login success - in a real application, this would be an API call
            showLoginMessage('Login successful! Redirecting...', 'success');
            
            // Redirect after brief delay - in a real application this would go to the dashboard
            setTimeout(() => {
                // window.location.href = '/dashboard.html';
                console.log('Login successful with:', { email, password });
            }, 1500);
        });
    }
    
    // Show login message
    function showLoginMessage(message, type) {
        // Remove any existing messages
        const existingMessage = document.querySelector('.login-form-container .message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageContainer = document.createElement('div');
        messageContainer.className = `message ${type}`;
        messageContainer.innerHTML = `
            <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Insert at top of form
        const formContainer = document.querySelector('.login-form-container');
        if (formContainer) {
            formContainer.insertBefore(messageContainer, formContainer.firstChild);
            
            // Remove after 5 seconds if it's an error
            if (type === 'error') {
                setTimeout(() => {
                    messageContainer.remove();
                }, 5000);
            }
        }
    }
    
    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Final validation before submission
            if (!validateStep(3)) { // Validate the last step
                return;
            }
            
            // Collect all form data
            const formData = {
                // Step 1: Account Information
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                phone: document.getElementById('regPhone').value,
                password: document.getElementById('regPassword').value,
                
                // Step 2: Personal Information
                careRecipient: {
                    name: document.getElementById('careRecipientName').value,
                    dob: document.getElementById('dob').value,
                    gender: document.getElementById('gender').value,
                    address: document.getElementById('address').value,
                    livingArrangement: document.getElementById('livingArrangement').value,
                    primaryLanguage: document.getElementById('primaryLanguage').value,
                    emergencyContact: document.getElementById('emergencyContact').value
                },
                
                // Step 3: Medical History
                medicalHistory: {
                    conditions: Array.from(document.querySelectorAll('input[name="conditions"]:checked')).map(el => el.value),
                    otherConditions: document.getElementById('otherConditions').value,
                    allergies: document.getElementById('allergies').value,
                    medications: collectMedications(),
                    mobility: document.getElementById('mobility').value
                },
                
                // Step 4: Care Details
                careDetails: {
                    primaryDoctor: document.getElementById('primaryDoctor').value,
                    doctorContact: document.getElementById('doctorContact').value,
                    hospital: document.getElementById('hospital').value,
                    insurance: document.getElementById('insurance').value,
                    assistanceNeeded: Array.from(document.querySelectorAll('input[name="assistance"]:checked')).map(el => el.value),
                    hobbies: document.getElementById('hobbies').value
                }
            };
            
            // In a real application, this would be sent to an API
            console.log('Registration data:', formData);
            
            // Show success message
            showMessage('Registration successful! Redirecting to your dashboard...', 'success');
            
            // Redirect after brief delay - in a real application this would go to the dashboard
            setTimeout(() => {
                // window.location.href = '/dashboard.html';
                console.log('Registration completed successfully');
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 2000);
        });
    }
    
    // Helper function to collect medication data
    function collectMedications() {
        const medications = [];
        const medicationEntries = document.querySelectorAll('.medication-entry');
        
        medicationEntries.forEach(entry => {
            const name = entry.querySelector('.med-name').value;
            if (name && name.trim()) { // Only include if there's a name
                medications.push({
                    name: name,
                    dosage: entry.querySelector('.med-dosage').value,
                    frequency: entry.querySelector('.med-frequency').value
                });
            }
        });
        
        return medications;
    }

    // Add console log to check if script is loaded properly
    console.log('Saarthi registration script loaded successfully');
});