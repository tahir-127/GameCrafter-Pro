// Initialize Firebase
// ...existing Firebase initialization code...

// Function to create a new challenge
async function createChallenge(challengeData) {
    const user = firebase.auth().currentUser;
    if (user) {
        const challengeRef = firebase.firestore().collection('challenges').doc();
        await challengeRef.set({
            ...challengeData,
            creator: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        alert('Challenge created successfully!');
    } else {
        alert('Please sign in to create a challenge.');
    }
}

// Function to share a challenge
async function shareChallenge(challengeId) {
    const challengeRef = firebase.firestore().collection('challenges').doc(challengeId);
    const challengeDoc = await challengeRef.get();
    if (challengeDoc.exists) {
        const challengeData = challengeDoc.data();
        // Implement sharing logic (e.g., generate a shareable link)
        const shareableLink = `https://yourapp.com/challenges/${challengeId}`;
        alert(`Share this link: ${shareableLink}`);
    } else {
        alert('Challenge not found.');
    }
}

// Function to rate a challenge
async function rateChallenge(challengeId, rating) {
    const user = firebase.auth().currentUser;
    if (user) {
        const ratingRef = firebase.firestore().collection('challenges').doc(challengeId).collection('ratings').doc(user.uid);
        await ratingRef.set({ rating });
        alert('Rating submitted successfully!');
    } else {
        alert('Please sign in to rate a challenge.');
    }
}

// Event listeners for challenge creation, sharing, and rating
document.getElementById('create-challenge-btn').addEventListener('click', () => {
    const challengeData = {
        title: document.getElementById('challenge-title').value,
        description: document.getElementById('challenge-description').value,
        type: document.getElementById('challenge-type').value,
        // ...other challenge data...
    };
    createChallenge(challengeData);
});

document.getElementById('share-challenge-btn').addEventListener('click', () => {
    const challengeId = document.getElementById('challenge-id').value;
    shareChallenge(challengeId);
});

document.getElementById('rate-challenge-btn').addEventListener('click', () => {
    const challengeId = document.getElementById('challenge-id').value;
    const rating = parseInt(document.getElementById('challenge-rating').value, 10);
    rateChallenge(challengeId, rating);
});
