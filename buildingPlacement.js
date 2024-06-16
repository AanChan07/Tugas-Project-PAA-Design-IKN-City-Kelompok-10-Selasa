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
