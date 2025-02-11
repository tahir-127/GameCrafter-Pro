// Fetch and display user list
function loadUserList() {
    const userListRef = firebase.firestore().collection('users');
    userListRef.get().then((querySnapshot) => {
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `${user.displayName} (${user.email})`;
            userList.appendChild(listItem);
        });
    }).catch((error) => {
        console.error('Error getting user list:', error);
    });
}

// Fetch and display game list
function loadGameList() {
    const gameListRef = firebase.firestore().collection('games');
    gameListRef.get().then((querySnapshot) => {
        const gameList = document.getElementById('game-list');
        gameList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const game = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `${game.name} - Downloads: ${game.downloads}, Earnings: ${game.earnings}`;
            gameList.appendChild(listItem);
        });
    }).catch((error) => {
        console.error('Error getting game list:', error);
    });
}

// Fetch and display website performance analytics
function loadPerformanceAnalytics() {
    const analyticsRef = firebase.firestore().collection('analytics').doc('performance');
    analyticsRef.get().then((doc) => {
        if (doc.exists) {
            const analytics = doc.data();
            displayPerformanceAnalytics(analytics);
        } else {
            console.log('No performance analytics found');
        }
    }).catch((error) => {
        console.error('Error getting performance analytics:', error);
    });
}

// Display performance analytics
function displayPerformanceAnalytics(analytics) {
    const analyticsElement = document.getElementById('performance-analytics');
    analyticsElement.innerHTML = `
        <p>Page Views: ${analytics.pageViews}</p>
        <p>Unique Visitors: ${analytics.uniqueVisitors}</p>
        <p>Average Session Duration: ${analytics.avgSessionDuration}</p>
    `;
}

// Fetch and display monetization settings
function loadMonetizationSettings() {
    const monetizationRef = firebase.firestore().collection('monetization');
    monetizationRef.get().then((querySnapshot) => {
        const monetizationList = document.getElementById('monetization-list');
        monetizationList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const settings = doc.data();
            const listItem = document.createElement('li');
            listItem.textContent = `User: ${doc.id}, Ads Enabled: ${settings.adsEnabled}, In-App Purchases Enabled: ${settings.inAppPurchasesEnabled}`;
            monetizationList.appendChild(listItem);
        });
    }).catch((error) => {
        console.error('Error getting monetization settings:', error);
    });
}

// Initialize admin panel on page load
window.onload = function() {
    loadUserList();
    loadGameList();
    loadPerformanceAnalytics();
    loadMonetizationSettings();
};
