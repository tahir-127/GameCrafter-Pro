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

// Level editor functionality
const canvas = document.getElementById('level-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let elements = [];
let undoStack = [];

document.getElementById('add-obstacle-btn').addEventListener('click', () => {
    addElementToLevel('obstacle');
    adjustDifficultyBasedOnElements();
});

document.getElementById('add-challenge-btn').addEventListener('click', () => {
    addElementToLevel('challenge');
    adjustDifficultyBasedOnElements();
});

document.getElementById('add-reward-btn').addEventListener('click', () => {
    addElementToLevel('reward');
    adjustDifficultyBasedOnElements();
});

document.getElementById('save-level-btn').addEventListener('click', saveLevel);

document.getElementById('undo-btn').addEventListener('click', undoLastAction);

document.getElementById('delete-element-btn').addEventListener('click', deleteLastElement);

function addElementToLevel(type) {
    const element = {
        type: type,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
    };
    elements.push(element);
    undoStack.push({ action: 'add', element: element });
    drawElement(element);
}

function drawElement(element) {
    switch (element.type) {
        case 'obstacle':
            ctx.fillStyle = 'red';
            ctx.fillRect(element.x, element.y, 50, 50);
            break;
        case 'challenge':
            ctx.fillStyle = 'blue';
            ctx.fillRect(element.x, element.y, 50, 50);
            break;
        case 'reward':
            ctx.fillStyle = 'green';
            ctx.fillRect(element.x, element.y, 50, 50);
            break;
        default:
            console.error('Unknown element type:', element.type);
    }
}

function saveLevel() {
    const levelData = {
        elements: elements,
        timestamp: new Date().toISOString()
    };
    const user = firebase.auth().currentUser;
    if (user) {
        firebase.firestore().collection('levels').add({
            userId: user.uid,
            levelData: levelData
        }).then(() => {
            alert('Level saved successfully!');
        }).catch((error) => {
            console.error('Error saving level:', error);
        });
    } else {
        alert('Please sign in to save your level.');
    }
}

function undoLastAction() {
    const lastAction = undoStack.pop();
    if (lastAction) {
        switch (lastAction.action) {
            case 'add':
                elements.pop();
                redrawCanvas();
                break;
            default:
                console.error('Unknown action type:', lastAction.action);
        }
    }
}

function deleteLastElement() {
    elements.pop();
    undoStack.push({ action: 'delete' });
    redrawCanvas();
}

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach(drawElement);
}

function adjustDifficultyBasedOnElements() {
    const obstacleCount = elements.filter(el => el.type === 'obstacle').length;
    const challengeCount = elements.filter(el => el.type === 'challenge').length;
    const rewardCount = elements.filter(el => el.type === 'reward').length;

    if (obstacleCount + challengeCount > rewardCount) {
        increaseDifficulty();
    } else {
        decreaseDifficulty();
    }
}

function increaseDifficulty() {
    console.log('Difficulty increased based on level elements');
    // Implement difficulty increase logic
    // ...implementation...
}

function decreaseDifficulty() {
    console.log('Difficulty decreased based on level elements');
    // Implement difficulty decrease logic
    // ...implementation...
}
