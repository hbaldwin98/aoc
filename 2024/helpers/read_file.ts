import path from 'path';
import fs from 'node:fs/promises';
import { exit } from 'process';

const FILE_NAME = 'input.txt';

export async function readFile(path: string) {
    try {
        const data = await fs.readFile(path, { encoding: 'utf8' });
        return data;
    } catch (err) {
        exit(1);
    }
}

export async function getInput() {
    return await readFile(path.join(path.dirname(''), FILE_NAME));
}

