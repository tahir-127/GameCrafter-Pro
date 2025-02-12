// Initialize Firebase
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('create-game-btn').addEventListener('click', createNewGame);
document.getElementById('logout-btn').addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        window.location.href = 'index.html';
    });
});

function createNewGame() {
    const user = firebase.auth().currentUser;
    if (user) {
        const gameData = {
            userId: user.uid,
            title: 'New Game',
            createdAt: new Date().toISOString(),
            stats: {
                plays: 0,
                likes: 0,
                comments: 0
            }
        };
        db.collection('games').add(gameData).then(() => {
            alert('New game created successfully!');
            loadUserGames();
        }).catch((error) => {
            console.error('Error creating game:', error);
        });
    } else {
        alert('Please sign in to create a new game.');
    }
}

function loadUserGames() {
    const user = firebase.auth().currentUser;
    if (user) {
        db.collection('games').where('userId', '==', user.uid).get().then((querySnapshot) => {
            const gameList = document.getElementById('game-list');
            gameList.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const game = doc.data();
                const gameItem = document.createElement('div');
                gameItem.classList.add('game-item');
                gameItem.innerHTML = `
                    <h3>${game.title}</h3>
                    <p>Created At: ${new Date(game.createdAt).toLocaleString()}</p>
                    <p>Plays: ${game.stats.plays}</p>
                    <p>Likes: ${game.stats.likes}</p>
                    <p>Comments: ${game.stats.comments}</p>
                `;
                gameList.appendChild(gameItem);
            });
        }).catch((error) => {
            console.error('Error loading games:', error);
        });
    } else {
        alert('Please sign in to view your games.');
    }
}

// Load user games on page load
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        loadUserGames();
    } else {
        window.location.href = 'index.html';
    }
});
