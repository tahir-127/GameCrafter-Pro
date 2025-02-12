// Initialize Firebase
// ...existing Firebase initialization code...

// Function to request storage permissions
async function requestStoragePermissions() {
    if (navigator.storage && navigator.storage.persist) {
        const isPersisted = await navigator.storage.persist();
        if (isPersisted) {
            console.log('Storage will not be cleared except by explicit user action');
        } else {
            console.log('Storage may be cleared by the UA under storage pressure.');
        }
    }
}

// Function to handle file uploads
async function handleFileUpload(event) {
    const files = event.target.files;
    const user = firebase.auth().currentUser;
    if (user) {
        for (const file of files) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`users/${user.uid}/assets/${file.name}`);
            await fileRef.put(file);
            const fileURL = await fileRef.getDownloadURL();
            console.log(`File uploaded: ${fileURL}`);
            // Update user's asset list in Firestore
            await updateUserAssets(user.uid, file.name, fileURL, file.type);
            // Display uploaded file
            displayUploadedFile(file.name, fileURL, file.type);
        }
        alert('Files uploaded successfully!');
    } else {
        alert('Please sign in to upload files.');
    }
}

// Function to update user's asset list in Firestore
async function updateUserAssets(userId, fileName, fileURL, fileType) {
    const userRef = firebase.firestore().collection('users').doc(userId);
    await userRef.update({
        assets: firebase.firestore.FieldValue.arrayUnion({ fileName, fileURL, fileType })
    });
}

// Function to display uploaded file
function displayUploadedFile(fileName, fileURL, fileType) {
    const uploadedAssetsDiv = document.getElementById('uploaded-assets');
    const fileElement = document.createElement('div');
    fileElement.className = 'uploaded-file';
    let preview = '';
    if (fileType.startsWith('image/')) {
        preview = `<img src="${fileURL}" alt="${fileName}" class="file-preview">`;
    } else if (fileType.startsWith('audio/')) {
        preview = `<audio controls src="${fileURL}" class="file-preview"></audio>`;
    } else if (fileType.startsWith('video/')) {
        preview = `<video controls src="${fileURL}" class="file-preview"></video>`;
    }
    fileElement.innerHTML = `${preview}<a href="${fileURL}" target="_blank">${fileName}</a>`;
    uploadedAssetsDiv.appendChild(fileElement);
}

// Function to handle drag-and-drop file uploads
function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleFileUpload({ target: { files } });
}

// Function to prevent default drag behavior
function handleDragOver(event) {
    event.preventDefault();
}

// Event listener for file input
document.getElementById('asset-upload-input').addEventListener('change', handleFileUpload);

// Event listeners for drag-and-drop
const dropZone = document.getElementById('file-upload');
dropZone.addEventListener('dragover', handleDragOver);
dropZone.addEventListener('drop', handleDrop);

// Request storage permissions on page load
document.addEventListener('DOMContentLoaded', requestStoragePermissions);
