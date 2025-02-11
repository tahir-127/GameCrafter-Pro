// Toggle between light and dark mode
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Load the saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

// Change language
function changeLanguage(language) {
    // Mock implementation of changing language
    console.log(`Language changed to: ${language}`);
    loadLanguageResources(language);
    localStorage.setItem('language', language);
}

// Load the saved language on page load
function loadLanguage() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        changeLanguage(savedLanguage);
    }
}

// Update user account settings
function updateUserSettings(settings) {
    const user = firebase.auth().currentUser;
    if (user) {
        const userSettingsRef = firebase.firestore().collection('userSettings').doc(user.uid);
        userSettingsRef.set(settings, { merge: true }).then(() => {
            console.log('User settings updated');
        }).catch((error) => {
            console.error('Error updating user settings:', error);
        });
    } else {
        console.log('User not signed in');
    }
}

// Enable or disable real-time preview
function toggleRealTimePreview(enabled) {
    localStorage.setItem('real-time-preview', enabled);
    console.log(`Real-Time Preview: ${enabled}`);
}

// Enable or disable snap-to-grid alignment
function toggleSnapToGrid(enabled) {
    localStorage.setItem('snap-to-grid', enabled);
    console.log(`Snap-to-Grid: ${enabled}`);
}

// Add a new layer
function addLayer() {
    // Mock implementation of adding a layer
    console.log('Layer added');
}

// Remove an existing layer
function removeLayer() {
    // Mock implementation of removing a layer
    console.log('Layer removed');
}

// Start tutorial
function startTutorial() {
    alert('Welcome to the tutorial! Follow the steps to learn how to use the platform.');
    // Implement tutorial steps here
}

// Submit feedback
function submitFeedback(feedback) {
    const feedbackRef = firebase.firestore().collection('feedback');
    feedbackRef.add(feedback).then(() => {
        alert('Thank you for your feedback!');
    }).catch(error => {
        console.error('Error submitting feedback:', error);
    });
}

// Generate AI graphics
function generateAIGraphics(type) {
    // Mock implementation of AI-generated graphics
    console.log(`AI-generated ${type} created`);
    alert(`AI-generated ${type} created`);
}

// Initialize settings on page load
window.onload = function() {
    loadTheme();
    loadLanguage();
};
