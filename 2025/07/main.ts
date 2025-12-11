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

const flat = input.replace(/\r\n/g, '').split('');
const start = flat.indexOf('S');

let next: { x: number, y: number }[] = [{ x: X(start, width), y: Y(start, width) + 1 }];
flat[I(next[0]!.x, next[0]!.y, width)] = '|'
let splitCount = 0;
while (next.length) {
    let nextPos = next.pop();
    if (!nextPos) {
        break;
    }

    let nextIdx = I(nextPos.x, nextPos.y + 1, width);
    let futurePos = flat[nextIdx];
    switch (futurePos) {
        case '^':
            let right = { x: X(nextIdx, width) + 1, y: Y(nextIdx, width) };
            let left = { x: X(nextIdx, width) - 1, y: Y(nextIdx, width) };
            flat[I(right.x, right.y, width)] = '|'
            flat[I(left.x, left.y, width)] = '|'
            splitCount++;
            next.push(...[left, right]);
            break;
        case '.':
            let down = { x: X(nextIdx, width), y: Y(nextIdx, width) };
            flat[I(down.x, down.y, width)] = '|'
            next.push(down);
            break;
        case undefined:
            break;
    }

}


console.log(chunk(flat, width).map((r) => r.join('')).join('\r\n'));
console.log('Part 1', splitCount);
