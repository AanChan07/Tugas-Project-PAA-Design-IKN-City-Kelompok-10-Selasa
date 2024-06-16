let map = [];
let images = {};

function preloadImages() {
    const imageSources = {
        crossroad: 'images/crossroad.png',
        tjunction_up: 'images/tjunction_up.png',
        tjunction_down: 'images/tjunction_down.png',
        tjunction_left: 'images/tjunction_left.png',
        tjunction_right: 'images/tjunction_right.png',
        turn_right_up: 'images/turn_right_up.png',
        turn_left_up: 'images/turn_left_up.png',
        turn_right_down: 'images/turn_right_down.png',
        turn_left_down: 'images/turn_left_down.png',
        vertical_road: 'images/vertical_road.png',
        horizontal_road: 'images/horizontal_road.png',
        tree: 'images/pohon.png',
        bangunan_besar: 'images/bangunan_besar.png',
        bangunan_sedang: 'images/bangunan_sedang.png',
        bangunan_kecil: 'images/bangunan_kecil.png',
        rumah: 'images/rumah.png',
        empty: 'images/rumput.png'
    };

    for (const key in imageSources) {
        const img = new Image();
        img.src = imageSources[key];
        images[key] = img;
    }
}

function initializeMap() {
    map = Array.from({ length: MAP_SIZE }, () => Array(MAP_SIZE).fill(EMPTY));
}

window.onload = () => {
    preloadImages();
    generateMap();
    drawMap();
};
