import { getInput } from '../../helpers/read_file'
import { createHash } from 'crypto'

function generateMD5Hash(input: string) {
    return createHash('md5').update(input).digest('hex');
}

function isFiveZeroes(input: string) {
    //return Number(input.slice(0, 5)) === 0;
    return input[0] == 0 &&
        input[1] == 0 &&
        input[2] == 0 &&
        input[3] == 0 &&
        input[4] == 0 &&
        input[5] == 0;
}

const secret = await getInput();

let number = 0;
let hash = generateMD5Hash(`${secret}${number}`);
while (!isFiveZeroes(hash)) {
    number++;
    hash = generateMD5Hash(`${secret}${number}`);
}
console.log(hash, number);

