// Fetch and display global leaderboard
function loadGlobalLeaderboard() {
    const globalLeaderboardRef = firebase.firestore().collection('leaderboards').doc('global');
    globalLeaderboardRef.get().then((doc) => {
        if (doc.exists) {
            const leaderboard = doc.data().players;
            displayLeaderboard(leaderboard, 'global-leaderboard');
        } else {
            console.log('No global leaderboard found');
        }
    }).catch((error) => {
        console.error('Error getting global leaderboard:', error);
    });
}

// Fetch and display local leaderboard
function loadLocalLeaderboard() {
    const user = firebase.auth().currentUser;
    if (user) {
        const localLeaderboardRef = firebase.firestore().collection('leaderboards').doc(user.uid);
        localLeaderboardRef.get().then((doc) => {
            if (doc.exists) {
                const leaderboard = doc.data().players;
                displayLeaderboard(leaderboard, 'local-leaderboard');
            } else {
                console.log('No local leaderboard found');
            }
        }).catch((error) => {
            console.error('Error getting local leaderboard:', error);
        });
    } else {
        console.log('User not signed in');
    }
}

// Display leaderboard
function displayLeaderboard(leaderboard, elementId) {
    const leaderboardList = document.getElementById(elementId);
    leaderboardList.innerHTML = '';
    leaderboard.forEach(player => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name}: ${player.score}`;
        leaderboardList.appendChild(listItem);
    });
}

// Real-time score updates
function subscribeToScoreUpdates() {
    const globalLeaderboardRef = firebase.firestore().collection('leaderboards').doc('global');
    globalLeaderboardRef.onSnapshot((doc) => {
        if (doc.exists) {
            const leaderboard = doc.data().players;
            displayLeaderboard(leaderboard, 'global-leaderboard');
        }
    });

    const user = firebase.auth().currentUser;
    if (user) {
        const localLeaderboardRef = firebase.firestore().collection('leaderboards').doc(user.uid);
        localLeaderboardRef.onSnapshot((doc) => {
            if (doc.exists) {
                const leaderboard = doc.data().players;
                displayLeaderboard(leaderboard, 'local-leaderboard');
            }
        });
    }
}

// Initialize leaderboards on page load
window.onload = function() {
    loadGlobalLeaderboard();
    loadLocalLeaderboard();
    subscribeToScoreUpdates();
};
