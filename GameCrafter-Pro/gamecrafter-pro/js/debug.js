document.addEventListener('DOMContentLoaded', () => {
    const debugLog = document.getElementById('debug-log');

    function logDebugMessage(message, type = 'info') {
        const logEntry = document.createElement('div');
        logEntry.className = `log-entry ${type}`;
        logEntry.textContent = message;
        debugLog.appendChild(logEntry);
    }

    window.addEventListener('error', (event) => {
        logDebugMessage(`Error: ${event.message}`, 'error');
    });

    window.addEventListener('unhandledrejection', (event) => {
        logDebugMessage(`Unhandled Promise Rejection: ${event.reason}`, 'error');
    });

    // Example usage
    logDebugMessage('Debugging initialized');

    // Function to clear the debug log
    function clearDebugLog() {
        debugLog.innerHTML = '';
    }

    // Add a button to clear the debug log
    const clearLogBtn = document.createElement('button');
    clearLogBtn.textContent = 'Clear Log';
    clearLogBtn.addEventListener('click', clearDebugLog);
    document.body.appendChild(clearLogBtn);
});
