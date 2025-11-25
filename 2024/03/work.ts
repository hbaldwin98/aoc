import path from 'path';
import fs from 'node:fs/promises';
import { exit } from 'process';

const FILE_NAME = 'input.txt';

async function readFile(path: string) {
    try {
        const data = await fs.readFile(path, { encoding: 'utf8' });
        return data;
    } catch (err) {
        exit(1);
    }
}

const input = await readFile(path.join(path.dirname(''), FILE_NAME));

let i = 0;
let total = 0;

let isDo = true;

while (i < input.length) {
    if (input[i] === 'd' &&
        input[i + 1] === 'o' &&
        input[i + 2] === '(' &&
        input[i + 3] === ')') {
        isDo = true;
    }
    else if (input[i] === 'd' &&
        input[i + 1] === 'o' &&
        input[i + 2] === 'n' &&
        input[i + 3] === "'" &&
        input[i + 4] === 't' &&
        input[i + 5] === '(' &&
        input[i + 6] === ')') {
        isDo = false;
    }

    if (!isDo) {
        i++;
        continue;
    }

    if (input[i] === 'm' && input[i + 1] === 'u' && input[i + 2] === 'l' && input[i + 3] === '(') {
        i += 4;
        let a = 0;
        while (i < input.length && input[i]! >= '0' && input[i]! <= '9') {
            a = a * 10 + (input[i]!.charCodeAt(0)! - '0'.charCodeAt(0));
            i++;
        }

        if (i >= input.length || input[i] !== ',') {
            i++;
            continue;
        }
        i++;

        let b = 0;
        while (i < input.length && input[i]! >= '0' && input[i]! <= '9') {
            b = b * 10 + (input[i]!.charCodeAt(0)! - '0'.charCodeAt(0));
            i++;
        }

        if (i >= input.length || input[i] !== ')') {
            i++;
            continue;
        }

        total += a * b;
    }

    i++;
}

console.log(total);

