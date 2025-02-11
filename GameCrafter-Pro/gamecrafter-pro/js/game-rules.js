const gameSettings = {
    gravity: 9.8,
    speed: 5,
    difficulty: 'normal',
};

function updateGameSettings(newSettings) {
    Object.assign(gameSettings, newSettings);
    console.log('Updated game settings:', gameSettings);
}

function resetGameSettings() {
    gameSettings.gravity = 9.8;
    gameSettings.speed = 5;
    gameSettings.difficulty = 'normal';
    console.log('Game settings reset to default:', gameSettings);
}

document.addEventListener('DOMContentLoaded', () => {
    const ruleEditor = document.getElementById('rule-editor');
    const ruleTemplates = document.getElementById('rule-templates');
    const rules = [];

    // Drag & Drop functionality for rule editor
    ruleEditor.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    ruleEditor.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text');
        const rule = JSON.parse(data);
        rules.push(rule);
        displayRules();
    });

    function displayRules() {
        ruleEditor.innerHTML = '';
        rules.forEach(rule => {
            const ruleElement = document.createElement('div');
            ruleElement.classList.add('rule-item');
            ruleElement.innerHTML = `<strong>${rule.name}</strong><br>Settings: ${JSON.stringify(rule.settings)}`;
            ruleEditor.appendChild(ruleElement);
        });
    }

    // Load pre-made rule templates
    ruleTemplates.addEventListener('change', () => {
        const selectedTemplate = ruleTemplates.value;
        loadTemplate(selectedTemplate);
    });

    function loadTemplate(templateName) {
        // Fetch and apply the selected template (mock implementation)
        const template = { name: templateName, settings: {} };
        rules.push(template);
        displayRules();
    }

    // Save game mechanics settings
    document.getElementById('save-rules-btn').addEventListener('click', () => {
        const gameSettings = {
            speed: document.getElementById('speed-input').value,
            difficulty: document.getElementById('difficulty-input').value,
            rules: rules,
        };
        console.log('Game settings saved:', gameSettings);
    });

    // Reset game mechanics settings
    document.getElementById('reset-rules-btn').addEventListener('click', () => {
        resetGameSettings();
        document.getElementById('speed-input').value = gameSettings.speed;
        document.getElementById('difficulty-input').value = gameSettings.difficulty;
    });
});
