function drawMap() {
    const canvas = document.getElementById('mapCanvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < MAP_SIZE; i++) {
        for (let j = 0; j < MAP_SIZE; j++) {
            const cell = map[i][j];
            const image = images[cell] || images.empty;
            ctx.drawImage(image, j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

function redesignMap() {
    generateMap();
    drawMap();
}
