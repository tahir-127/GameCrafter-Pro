// Initialize Firebase
// ...existing Firebase initialization code...

// Function to send notifications
function sendNotification(title, message) {
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: message,
            icon: '/images/notification-icon.png'
        });
        notification.onclick = () => {
            window.open('/notifications.html');
        };
    } else {
        console.log('Notifications are not enabled.');
    }
}

// Request notification permission on page load
document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        });
    }
});
