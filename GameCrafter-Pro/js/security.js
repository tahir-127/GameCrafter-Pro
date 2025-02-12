// Secure data access
function handleSecureAssetUpload(event) {
    const permission = localStorage.getItem('file-access-permission') || sessionStorage.getItem('file-access-permission');
    if (!permission) {
        alert('File access permission is required.');
        return;
    }

    const files = event.target.files;
    const assetContainer = document.getElementById('uploaded-assets');
    assetContainer.innerHTML = '';

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const encryptedData = encryptData(e.target.result);
            const assetElement = document.createElement('div');
            assetElement.classList.add('asset-item');
            assetElement.innerHTML = `
                <p>${file.name}</p>
                <button onclick="useAsset('${encryptedData}', '${file.type}')">Use in Game</button>
                <button onclick="downloadAsset('${encryptedData}', '${file.name}', '${file.type}')">Download</button>
                <button onclick="deleteAsset(this)">Delete</button>
            `;
            assetContainer.appendChild(assetElement);
        };
        reader.readAsDataURL(file);
    });
}

// Encrypt data
function encryptData(data) {
    // Simple encryption for demonstration purposes
    return btoa(data);
}

// Decrypt data
function decryptData(data) {
    return atob(data);
}

// Permission revocation
function revokePermissions() {
    if (confirm('Are you sure you want to revoke all permissions?')) {
        localStorage.clear();
        sessionStorage.clear();
        alert('Permissions revoked. Please reload the page.');
    }
}

// Example usage of decryptData function
function useAsset(encryptedData, assetType) {
    const data = decryptData(encryptedData);
    switch (assetType) {
        case 'image/png':
        case 'image/jpeg':
            addImageToGame(data);
            break;
        case 'audio/mpeg':
        case 'audio/wav':
            addSoundToGame(data);
            break;
        case 'video/mp4':
            addVideoToGame(data);
            break;
        default:
            console.error('Unsupported asset type:', assetType);
    }
}

// Download asset
function downloadAsset(encryptedData, fileName, fileType) {
    const data = decryptData(encryptedData);
    const link = document.createElement('a');
    link.href = data;
    link.download = fileName;
    link.click();
}

// Delete asset
function deleteAsset(button) {
    const assetElement = button.parentElement;
    assetElement.remove();
}

// ...existing code...
