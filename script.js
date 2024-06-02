const MAP_SIZE = 150;
const CELL_SIZE = 32;

const EMPTY = 0;
const CROSSROAD = 'crossroad';
const T_JUNCTION = 't_junction';
const TURN = 'turn';
const ROAD = 'road';
const TREE = 'tree';
const BIG_BUILDING = 'bangunan_besar';
const MEDIUM_BUILDING = 'bangunan_sedang';
const SMALL_BUILDING = 'bangunan_kecil';
const HOUSE = 'rumah';

const CROSSROAD_LIMIT = 8;
const T_JUNCTION_LIMIT = 10;
const TURN_LIMIT = 20;
const MIN_DISTANCE = 5;

const BUILDING_SIZES = {
    [BIG_BUILDING]: [7,3],
    [MEDIUM_BUILDING]: [5, 3],
    [SMALL_BUILDING]: [2, 2],
    [HOUSE]: [1, 1],
    [TREE]: [1, 1]
};

const BUILDING_MINIMUMS = {
    [BIG_BUILDING]: 21,
    [MEDIUM_BUILDING]: 15,
    [SMALL_BUILDING]: 4,
    [HOUSE]: 1,
    [TREE]: 1
};

function checkBuildingSizes(buildingSizes, buildingMinimums) {
    for (const [key, size] of Object.entries(buildingSizes)) {
        const area = size[0] * size[1];
        if (area >= buildingMinimums[key]) {
            console.log(`${key} meets the minimum size requirement with an area of ${area} cells.`);
        } else {
            console.log(`${key} does NOT meet the minimum size requirement. It has an area of ${area} cells, but needs at least ${buildingMinimums[key]} cells.`);
        }
    }
}

checkBuildingSizes(BUILDING_SIZES, BUILDING_MINIMUMS);

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

function generateMap() {
    map = Array.from({ length: MAP_SIZE }, () => Array(MAP_SIZE).fill(EMPTY));
    let crossroadCount = 0;
    let tJunctionCount = 0;
    let turnCount = 0;

    while (crossroadCount < CROSSROAD_LIMIT || tJunctionCount < T_JUNCTION_LIMIT || turnCount < TURN_LIMIT) {
        let x = Math.floor(Math.random() * (MAP_SIZE - 2)) + 1;
        let y = Math.floor(Math.random() * (MAP_SIZE - 2)) + 1;
        if (map[x][y] === EMPTY && isLocationValid(x, y)) {
            if (crossroadCount < CROSSROAD_LIMIT) {
                map[x][y] = CROSSROAD;
                extendRoad(x, y, 'up');
                extendRoad(x, y, 'down');
                extendRoad(x, y, 'left');
                extendRoad(x, y, 'right');
                crossroadCount++;
            } else if (tJunctionCount < T_JUNCTION_LIMIT) {
                const direction = ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
                switch (direction) {
                    case 'up':
                        map[x][y] = 'tjunction_up';
                        extendRoad(x, y, 'up');
                        extendRoad(x, y, 'left');
                        extendRoad(x, y, 'right');
                        break;
                    case 'down':
                        map[x][y] = 'tjunction_down';
                        extendRoad(x, y, 'down');
                        extendRoad(x, y, 'left');
                        extendRoad(x, y, 'right');
                        break;
                    case 'left':
                        map[x][y] = 'tjunction_left';
                        extendRoad(x, y, 'left');
                        extendRoad(x, y, 'up');
                        extendRoad(x, y, 'down');
                        break;
                    case 'right':
                        map[x][y] = 'tjunction_right';
                        extendRoad(x, y, 'right');
                        extendRoad(x, y, 'up');
                        extendRoad(x, y, 'down');
                        break;
                }
                tJunctionCount++;
            } else if (turnCount < TURN_LIMIT) {
                const direction = ['up-right', 'up-left', 'down-right', 'down-left'][Math.floor(Math.random() * 4)];
                switch (direction) {
                    case 'up-right':
                        map[x][y] = 'turn_right_up';
                        extendRoad(x, y, 'up');
                        extendRoad(x, y, 'right');
                        break;
                    case 'up-left':
                        map[x][y] = 'turn_left_up';
                        extendRoad(x, y, 'up');
                        extendRoad(x, y, 'left');
                        break;
                    case 'down-right':
                        map[x][y] = 'turn_right_down';
                        extendRoad(x, y, 'down');
                        extendRoad(x, y, 'right');
                        break;
                    case 'down-left':
                        map[x][y] = 'turn_left_down';
                        extendRoad(x, y, 'down');
                        extendRoad(x, y, 'left');
                        break;
                }
                turnCount++;
            }
        }
    }

    placeBuildings();
    placeTrees();
}

function isLocationValid(x, y, width = 1, height = 1) {
    for (let i = Math.max(0, x - MIN_DISTANCE); i < Math.min(MAP_SIZE, x + width + MIN_DISTANCE); i++) {
        for (let j = Math.max(0, y - MIN_DISTANCE); j < Math.min(MAP_SIZE, y + height + MIN_DISTANCE); j++) {
            if (map[i][j] !== EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function extendRoad(x, y, direction) {
    if (direction === 'up') {
        for (let i = x - 1; i >= 0; i--) {
            if (map[i][y] !== EMPTY) break;
            map[i][y] = 'vertical_road';
        }
    } else if (direction === 'down') {
        for (let i = x + 1; i < MAP_SIZE; i++) {
            if (map[i][y] !== EMPTY) break;
            map[i][y] = 'vertical_road';
        }
    } else if (direction === 'left') {
        for (let j = y - 1; j >= 0; j--) {
            if (map[x][j] !== EMPTY) break;
            map[x][j] = 'horizontal_road';
        }
    } else if (direction === 'right') {
        for (let j = y + 1; j < MAP_SIZE; j++) {
            if (map[x][j] !== EMPTY) break;
            map[x][j] = 'horizontal_road';
        }
    }
}

function placeBuildings() {
    for (const building in BUILDING_MINIMUMS) {
        if (building === TREE) continue;
        let count = 0;
        while (count < BUILDING_MINIMUMS[building]) {
            let x = Math.floor(Math.random() * (MAP_SIZE - BUILDING_SIZES[building][0]));
            let y = Math.floor(Math.random() * (MAP_SIZE - BUILDING_SIZES[building][1]));
            if (isLocationValidForBuilding(x, y, BUILDING_SIZES[building][0], BUILDING_SIZES[building][1])) {
                for (let i = x; i < x + BUILDING_SIZES[building][0]; i++) {
                    for (let j = y; j < y + BUILDING_SIZES[building][1]; j++) {
                        map[i][j] = building;
                    }
                }
                count++;
            }
        }
    }
}

function placeTrees() {
    let count = 0;
    while (count < BUILDING_MINIMUMS[TREE]) {
        let x = Math.floor(Math.random() * MAP_SIZE);
        let y = Math.floor(Math.random() * MAP_SIZE);
        if (map[x][y] === EMPTY) {
            map[x][y] = TREE;
            count++;
        }
    }
}

function isLocationValidForBuilding(x, y, width, height) {
    for (let i = x; i < x + width; i++) {
        for (let j = y; j < y + height; j++) {
            if (i >= 0 && i < MAP_SIZE && j >= 0 && j < MAP_SIZE) {
                if (map[i][j] !== EMPTY) {
                    return false;
                }
            }
        }
    }
    let roadFound = false;
    for (let i = Math.max(0, x - 1); i < Math.min(MAP_SIZE, x + width + 1); i++) {
        for (let j = Math.max(0, y - 1); j < Math.min(MAP_SIZE, y + height + 1); j++) {
            if (['vertical_road', 'horizontal_road', CROSSROAD, 'tjunction_up', 'tjunction_down', 'tjunction_left', 'tjunction_right', 'turn_right_up', 'turn_left_up', 'turn_right_down', 'turn_left_down'].includes(map[i][j])) {
                roadFound = true;
            }
            if (i in Array.from({ length: width }, (_, k) => x + k) && j in Array.from({ length: height }, (_, k) => y + k)) continue;
            if (Object.keys(BUILDING_SIZES).includes(map[i][j])) {
                return false;
            }
        }
    }
    return roadFound;
}

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

window.onload = () => {
    preloadImages();
    generateMap();
    drawMap();
};
