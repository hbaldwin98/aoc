import { getInput, getLines } from "../../helpers/read_file";
import { X, Y, I, S } from "../../helpers/grid";

const chunk = (arr, size) => {
    // Calculate the number of chunks needed (rounding up)
    const numChunks = Math.ceil(arr.length / size);

    return Array.from({ length: numChunks }, (v, i) => {
        const start = i * size;
        const end = start + size;
        return arr.slice(start, end); // Use slice to get a portion of the array
    });
};

const input = await getInput();
const lines = getLines(input);
const width = lines[0]!.length;

let grid = input.replace(/\r\n/g, '').split('');
const start = grid.indexOf('S');

let next: { x: number, y: number }[] = [{ x: X(start, width), y: Y(start, width) + 1 }];
grid[I(next[0]!.x, next[0]!.y, width)] = '|'
let splitCount = 0;
while (next.length) {
    let nextPos = next.pop();
    if (!nextPos) {
        break;
    }

    let nextIdx = I(nextPos.x, nextPos.y + 1, width);
    let futurePos = grid[nextIdx];
    switch (futurePos) {
        case '^':
            let right = { x: X(nextIdx, width) + 1, y: Y(nextIdx, width) };
            let left = { x: X(nextIdx, width) - 1, y: Y(nextIdx, width) };
            grid[I(right.x, right.y, width)] = '|'
            grid[I(left.x, left.y, width)] = '|'
            splitCount++;
            next.push(...[left, right]);
            break;
        case '.':
            let down = { x: X(nextIdx, width), y: Y(nextIdx, width) };
            grid[I(down.x, down.y, width)] = '|'
            next.push(down);
            break;
        case undefined:
            break;
    }
}

console.log(chunk(grid, width).map((r) => r.join('')).join('\r\n'));
console.log('Part 1', splitCount);

const makeKey = (input: { x: number, y: number }) => `${input.x},${input.y}`;
let seen = new Map<string, bigint>();
function countTimelines(input: { x: number, y: number }) {
    const key = makeKey(input);
    if (seen.has(key)) {
        return seen.get(key);
    }

    const x = input.x;
    const y = input.y;

    const nextY = y + 1;
    const next = grid[I(x, nextY, width)];
    let result = 0n;

    switch (next) {
        case undefined:
            result = 1n;
            break;
        case '^':
            let left = countTimelines({ x: x - 1, y: nextY })!;
            let right = countTimelines({ x: x + 1, y: nextY })!;
            result = left + right;
            break;
        default:
            result = countTimelines({ x, y: nextY })!;
            break;
    }

    seen.set(key, result);
    return result;
}

let timeLines = countTimelines({ x: X(start, width), y: Y(start, width) });
console.log('Part 2', timeLines);
