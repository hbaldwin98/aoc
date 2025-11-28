import { getInput } from '../../helpers/read_file'

const file = await getInput();

let seen = new Set();

function computeKey(x: number, y: number) {
    return `${x}:${y}`;
}

let x = 0;
let y = 0;

for (let char of file) {
    seen.add(computeKey(x, y));
    switch (char) {
        case '^':
            y--;
            continue;
        case 'v':
            y++;
            continue;
        case '>':
            x++;
            continue;
        case '<':
            x--;
            continue;
        default:
            continue;
    }
}


console.log('Part 1', seen.size);

let realX = 0;
let realY = 0;
let roboX = 0;
let roboY = 0;
let turn = true;

seen = new Set();

for (let char of file) {
    seen.add(computeKey(realX, realY));
    seen.add(computeKey(roboX, roboY));

    switch (char) {
        case '^':
            turn ? realY-- : roboY--;
            turn = !turn;
            continue;
        case 'v':
            turn ? realY++ : roboY++;
            turn = !turn;
            continue;
        case '>':
            turn ? realX++ : roboX++;
            turn = !turn;
            continue;
        case '<':
            turn ? realX-- : roboX--;

            turn = !turn;
            continue;
        default:
            continue;
    }
}

console.log('Part 2', seen.size);
