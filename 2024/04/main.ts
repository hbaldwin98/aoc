import { getInput } from '../helpers/read_file'

const input = await getInput();


// 1D array - use as a 2D grid
// Loop through ONCE
// When we see an X, we will:
// Look in each direction

// what's the width?'

function cleanInput(input: string) {
    return input.replace(/\r/g, '').trim();
}

function calculateWidthFromInput(input: string) {
    return input.indexOf('\n');
}

function X(index: number, width: number) {
    return index % width;
}

function Y(index: number, width: number) {
    return Math.trunc(index / width);
}

function I(x: number, y: number, width: number) {
    return y * width + x;
}

function S(data: string, x: number, y: number, width: number) {
    if (x < 0 || x >= width || y < 0 || y >= data.length) {
        return undefined;
    }

    return data[I(x, y, width)];
}

let data = cleanInput(input);
let width = calculateWidthFromInput(data);
data = data.replace(/\n/g, '');

let count = 0;

for (let i = 0; i < data.length; i++) {
    let char = data[i];
    let x = X(i, width);
    let y = Y(i, width);

    // Left
    if (char === 'X' &&
        S(data, x - 1, y, width) === 'M' &&
        S(data, x - 2, y, width) === 'A' &&
        S(data, x - 3, y, width) === 'S'
    ) {
        count++;
    }

    // Right
    if (char === 'X' &&
        S(data, x + 1, y, width) === 'M' &&
        S(data, x + 2, y, width) === 'A' &&
        S(data, x + 3, y, width) === 'S'
    ) {
        count++;
    }

    // Up
    if (char === 'X' &&
        S(data, x, y - 1, width) === 'M' &&
        S(data, x, y - 2, width) === 'A' &&
        S(data, x, y - 3, width) === 'S'
    ) {
        count++;
    }

    // Down
    if (char === 'X' &&
        S(data, x, y + 1, width) === 'M' &&
        S(data, x, y + 2, width) === 'A' &&
        S(data, x, y + 3, width) === 'S'
    ) {
        count++;
    }

    // Towards Bottom Right
    if (char === 'X' &&
        S(data, x + 1, y + 1, width) === 'M' &&
        S(data, x + 2, y + 2, width) === 'A' &&
        S(data, x + 3, y + 3, width) === 'S'
    ) {
        count++;
    }

    // Towards the Top Left
    if (char === 'X' &&
        S(data, x - 1, y - 1, width) === 'M' &&
        S(data, x - 2, y - 2, width) === 'A' &&
        S(data, x - 3, y - 3, width) === 'S'
    ) {
        count++;
    }

    // Towards the Bottom Left
    if (char === 'X' &&
        S(data, x - 1, y + 1, width) === 'M' &&
        S(data, x - 2, y + 2, width) === 'A' &&
        S(data, x - 3, y + 3, width) === 'S'
    ) {
        count++;
    }

    // Towards the Top Right
    if (char === 'X' &&
        S(data, x + 1, y - 1, width) === 'M' &&
        S(data, x + 2, y - 2, width) === 'A' &&
        S(data, x + 3, y - 3, width) === 'S'
    ) {
        count++;
    }
}

console.log("FOUND:", count);
