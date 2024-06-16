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
    [BIG_BUILDING]: [10, 5],
    [MEDIUM_BUILDING]: [5, 3],
    [SMALL_BUILDING]: [2, 2],
    [HOUSE]: [1, 2],
    [TREE]: [1, 1]
};

const BUILDING_MINIMUMS = {
    [BIG_BUILDING]: 50,
    [MEDIUM_BUILDING]: 100,
    [SMALL_BUILDING]: 250,
    [HOUSE]: 500,
    [TREE]: 500
};
