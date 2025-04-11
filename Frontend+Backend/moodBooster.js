// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mood tracker elements
    const moodOptions = document.querySelectorAll('.mood-option');
    const saveMoodBtn = document.querySelector('.save-mood-btn');
    const moodChart = document.getElementById('moodChart');
    
    // Quote elements
    const dailyQuote = document.getElementById('daily-quote');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.querySelector('.new-quote-btn');
    
    // Gratitude elements
    const gratitudeInput = document.getElementById('gratitude-input');
    const saveGratitudeBtn = document.querySelector('.save-gratitude-btn');
    const gratitudeList = document.getElementById('gratitude-list');
    
    // Initialize the app
    initMoodTracker();
    initQuoteGenerator();
    initGratitudeJournal();
    
    /**
     * Mood Tracker Functionality
     */
    function initMoodTracker() {
        // Sample mood data - would normally come from backend
        const moodData = {
            labels: ['Apr 5', 'Apr 6', 'Apr 7', 'Apr 8', 'Apr 9', 'Apr 10'],
            datasets: [{
                label: 'Your Mood',
                data: [3, 4, 2, 3, 4, 5],
                backgroundColor: 'rgba(29, 158, 163, 0.2)',
                borderColor: 'rgba(29, 158, 163, 1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: 'rgba(29, 158, 163, 1)',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        };
        
        // Create mood chart
        const moodCtx = moodChart.getContext('2d');
        const moodChartInstance = new Chart(moodCtx, {
            type: 'line',
            data: moodData,
            options: {
                scales: {
                    y: {
                        min: 1,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function(value) {
                                const labels = {
                                    1: 'Sad',
                                    2: 'Down',
                                    3: 'Neutral',
                                    4: 'Good',
                                    5: 'Great'
                                };
                                return labels[value];
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const labels = {
                                    1: 'Sad',
                                    2: 'Down',
                                    3: 'Neutral',
                                    4: 'Good',
                                    5: 'Great'
                                };
                                const value = context.parsed.y;
                                return `Mood: ${labels[value]}`;
                            }
                        }
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
        
        // Handle mood option selection
        let selectedMood = null;
        
        moodOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                moodOptions.forEach(item => item.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Store selected mood value
                selectedMood = parseInt(this.dataset.mood);
            });
        });
        
        // Handle save mood button click
        saveMoodBtn.addEventListener('click', function() {
            if (selectedMood) {
                // In a real app, this would send data to a backend
                // For demo purposes, we'll update the chart locally
                moodData.labels.shift();
                moodData.labels.push('Today');
                
                moodData.datasets[0].data.shift();
                moodData.datasets[0].data.push(selectedMood);
                
                moodChartInstance.update();
                
                // Reset selection
                moodOptions.forEach(item => item.classList.remove('selected'));
                selectedMood = null;
                
                // Show success message
                showNotification('Mood saved successfully!');
            } else {
                showNotification('Please select your mood first.', 'error');
            }
        });
    }
    
    /**
     * Quote Generator Functionality
     */
    function initQuoteGenerator() {
        const quotes = [
            {
                text: "Happiness is not something ready-made. It comes from your own actions.",
                author: "Dalai Lama"
            },
            {
                text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
                author: "Nelson Mandela"
            },
            {
                text: "Your time is limited, don't waste it living someone else's life.",
                author: "Steve Jobs"
            },
            {
                text: "The best way to predict the future is to create it.",
                author: "Peter Drucker"
            },
            {
                text: "It is during our darkest moments that we must focus to see the light.",
                author: "Aristotle"
            },
            {
                text: "Believe you can and you're halfway there.",
                author: "Theodore Roosevelt"
            },
            {
                text: "The purpose of our lives is to be happy.",
                author: "Dalai Lama"
            },
            {
                text: "Life is what happens when you're busy making other plans.",
                author: "John Lennon"
            }
        ];
        
        // Generate a random quote
        function getRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            return quotes[randomIndex];
        }
        
        // Update quote display
        function updateQuote() {
            const quote = getRandomQuote();
            dailyQuote.textContent = quote.text;
            quoteAuthor.textContent = `- ${quote.author}`;
            
            // Add a subtle animation
            dailyQuote.style.opacity = 0;
            quoteAuthor.style.opacity = 0;
            
            setTimeout(() => {
                dailyQuote.style.opacity = 1;
                quoteAuthor.style.opacity = 1;
            }, 300);
        }
        
        // Handle new quote button click
        newQuoteBtn.addEventListener('click', updateQuote);
    }
    
    /**
     * Gratitude Journal Functionality
     */
    function initGratitudeJournal() {
        // Sample gratitude entries - would normally come from backend
        const gratitudeEntries = [
            {
                date: "April 10, 2025",
                text: "I am grateful for the beautiful weather and the opportunity to walk in the park."
            },
            {
                date: "April 9, 2025",
                text: "I am grateful for my friend who called to check on me today."
            }
        ];
        
        // Display gratitude entries
        function displayGratitudeEntries() {
            gratitudeList.innerHTML = '';
            
            if (gratitudeEntries.length === 0) {
                const emptyMessage = document.createElement('p');
                emptyMessage.className = 'empty-message';
                emptyMessage.textContent = 'No gratitude entries yet. Start by adding one above!';
                gratitudeList.appendChild(emptyMessage);
                return;
            }
            
            gratitudeEntries.forEach(entry => {
                const entryItem = document.createElement('div');
                entryItem.className = 'gratitude-item';
                
                const dateElement = document.createElement('p');
                dateElement.className = 'gratitude-date';
                dateElement.textContent = entry.date;
                
                const textElement = document.createElement('p');
                textElement.className = 'gratitude-text';
                textElement.textContent = entry.text;
                
                entryItem.appendChild(dateElement);
                entryItem.appendChild(textElement);
                gratitudeList.appendChild(entryItem);
            });
        }
        
        // Handle save gratitude button click
        saveGratitudeBtn.addEventListener('click', function() {
            const gratitudeText = gratitudeInput.value.trim();
            
            if (gratitudeText) {
                // Get current date
                const now = new Date();
                const options = { month: 'long', day: 'numeric', year: 'numeric' };
                const dateString = now.toLocaleDateString('en-US', options);
                
                // Add to entries
                gratitudeEntries.unshift({
                    date: dateString,
                    text: gratitudeText
                });
                
                // Clear input
                gratitudeInput.value = '';
                
                // Update display
                displayGratitudeEntries();
                
                // Show success message
                showNotification('Gratitude saved successfully!');
            } else {
                showNotification('Please enter something you\'re grateful for.', 'error');
            }
        });
        
        // Initial display
        displayGratitudeEntries();
    }
    
    /**
     * Utility Functions
     */
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide and remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});