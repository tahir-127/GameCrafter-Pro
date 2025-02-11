function openPreview() {
    const previewWindow = window.open('', 'Game Preview', 'width=800,height=600');
    previewWindow.document.write('<html><body><canvas id="preview-canvas"></canvas></body></html>');
    const previewCanvas = previewWindow.document.getElementById('preview-canvas');
    const previewContext = previewCanvas.getContext('2d');
    previewCanvas.width = canvas.width;
    previewCanvas.height = canvas.height;
    previewContext.drawImage(canvas, 0, 0);
}
