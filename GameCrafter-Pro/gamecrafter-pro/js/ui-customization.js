document.addEventListener('DOMContentLoaded', () => {
    const colorInput = document.getElementById('color-input');
    const fontInput = document.getElementById('font-input');
    const previewArea = document.getElementById('ui-preview');

    colorInput.addEventListener('input', () => {
        previewArea.style.backgroundColor = colorInput.value;
    });

    fontInput.addEventListener('input', () => {
        previewArea.style.fontFamily = fontInput.value;
    });

    document.getElementById('save-ui-settings-btn').addEventListener('click', () => {
        const uiSettings = {
            color: colorInput.value,
            font: fontInput.value,
        };
        console.log('UI settings saved:', uiSettings);
    });
});
