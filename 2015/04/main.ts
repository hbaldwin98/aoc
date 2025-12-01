import { getInput } from '../../helpers/read_file'
import { createHash } from 'crypto'

function generateMD5Hash(input: string) {
    return createHash('md5').update(input).digest('hex');
}

function isFiveZeroes(input: string) {
    return input.slice(0, 5) === '00000';
}

function isSixZeroes(input: string) {
    return input.slice(0, 6) === '000000';
}

const secret = await getInput();

let number = 0;
let hash = generateMD5Hash(`${secret}${number}`);
while (!isFiveZeroes(hash)) {
    number++;
    hash = generateMD5Hash(`${secret}${number}`);
}

console.log('Part 1', hash, number);

number = 0;
hash = generateMD5Hash(`${secret}${number}`);
while (!isSixZeroes(hash)) {
    number++;
    hash = generateMD5Hash(`${secret}${number}`);
}

console.log('Part 2', hash, number);
