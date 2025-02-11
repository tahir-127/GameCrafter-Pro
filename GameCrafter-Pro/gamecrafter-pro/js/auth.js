// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);

function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log(`User signed in: ${result.user.displayName}`);
            loadUserProfile(result.user);
        })
        .catch((error) => {
            console.error(`Error during sign-in: ${error.message}`);
        });
}

function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log(`User signed in with Google: ${result.user.displayName}`);
            loadUserProfile(result.user);
        })
        .catch((error) => {
            console.error(`Error during Google sign-in: ${error.message}`);
        });
}

function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log(`User signed in with Facebook: ${result.user.displayName}`);
            loadUserProfile(result.user);
        })
        .catch((error) => {
            console.error(`Error during Facebook sign-in: ${error.message}`);
        });
}

function loginWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            console.log(`User signed in with GitHub: ${result.user.displayName}`);
            loadUserProfile(result.user);
        })
        .catch((error) => {
            console.error(`Error during GitHub sign-in: ${error.message}`);
        });
}

function loadUserProfile(user) {
    const userProfile = document.getElementById('user-profile');
    userProfile.textContent = `Welcome, ${user.displayName}`;
    loadUserGameHistory(user.uid);
    loadUserMonetizationSettings(user.uid);
}

function loadUserGameHistory(userId) {
    const gameHistoryRef = firebase.firestore().collection('gameHistory').doc(userId);
    gameHistoryRef.get().then((doc) => {
        if (doc.exists) {
            const gameHistory = doc.data().games;
            displayGameHistory(gameHistory);
        } else {
            console.log('No game history found');
        }
    }).catch((error) => {
        console.error('Error getting game history:', error);
    });
}

function displayGameHistory(gameHistory) {
    const gameHistoryList = document.getElementById('game-history');
    gameHistoryList.innerHTML = '';
    gameHistory.forEach(game => {
        const listItem = document.createElement('li');
        listItem.textContent = game.name;
        gameHistoryList.appendChild(listItem);
    });
}

function saveGameToCloud(gameData) {
    const user = firebase.auth().currentUser;
    if (user) {
        const gameHistoryRef = firebase.firestore().collection('gameHistory').doc(user.uid);
        gameHistoryRef.set({
            games: firebase.firestore.FieldValue.arrayUnion(gameData)
        }, { merge: true }).then(() => {
            console.log('Game saved to cloud');
        }).catch((error) => {
            console.error('Error saving game to cloud:', error);
        });
    } else {
        console.log('User not signed in');
    }
}

function loadUserMonetizationSettings(userId) {
    const monetizationRef = firebase.firestore().collection('monetization').doc(userId);
    monetizationRef.get().then((doc) => {
        if (doc.exists) {
            const monetizationSettings = doc.data();
            displayMonetizationSettings(monetizationSettings);
        } else {
            console.log('No monetization settings found');
        }
    }).catch((error) => {
        console.error('Error getting monetization settings:', error);
    });
}

function displayMonetizationSettings(settings) {
    const monetizationElement = document.getElementById('monetization-settings');
    monetizationElement.innerHTML = `
        <p>Ads Enabled: ${settings.adsEnabled}</p>
        <p>In-App Purchases Enabled: ${settings.inAppPurchasesEnabled}</p>
    `;
}

function generateEmbedCode(gameId) {
    const embedCode = `<iframe src="https://yourgameplatform.com/games/${gameId}" width="800" height="600"></iframe>`;
    console.log('Embed code generated:', embedCode);
    return embedCode;
}
