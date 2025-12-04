import { getInput, getLines } from "../../helpers/read_file";
import { S, X, Y } from "../../helpers/grid";

const input = await getInput();
const lines = getLines(input);

const width = lines[0]!.length;
const grid = lines.join('').split('');

const ROLL = "@";
const PERIOD = ".";
const DONE = "x";
let totalCount = 0;

for (let pos = 0; pos < grid.length; pos++) {
    if (grid[pos] === PERIOD) continue;

    let x = X(pos, width);
    let y = Y(pos, width);

    const l = S(grid, x - 1, y, width);
    const tl = S(grid, x - 1, y - 1, width);
    const up = S(grid, x, y - 1, width);
    const tr = S(grid, x + 1, y - 1, width);
    const r = S(grid, x + 1, y, width);
    const br = S(grid, x + 1, y + 1, width);
    const down = S(grid, x, y + 1, width);
    const bl = S(grid, x - 1, y + 1, width);

    let count = [l, tl, up, tr, r, br, down, bl].filter((v) => v === ROLL).length;
    if (count < 4) {
        totalCount++;
    }
}

console.log('Part 1', totalCount);

let hasChange = true;
while (hasChange) {
    let changed = false;
    for (let pos = 0; pos < grid.length; pos++) {
        if (grid[pos] === PERIOD || grid[pos] === DONE) continue;

        let x = X(pos, width);
        let y = Y(pos, width);

        const l = S(grid, x - 1, y, width);
        const tl = S(grid, x - 1, y - 1, width);
        const up = S(grid, x, y - 1, width);
        const tr = S(grid, x + 1, y - 1, width);
        const r = S(grid, x + 1, y, width);
        const br = S(grid, x + 1, y + 1, width);
        const down = S(grid, x, y + 1, width);
        const bl = S(grid, x - 1, y + 1, width);

        let neighborCount = [l, tl, up, tr, r, br, down, bl].filter((v) => v === ROLL).length;
        if (neighborCount < 4) {
            changed = true;
            grid[pos] = DONE;
        }
    }

    hasChange = changed;
}

console.log('Part 2', grid.filter((g) => g === DONE).length);
