function generateMap() {
    initializeMap();
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
