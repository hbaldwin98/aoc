import { getInput } from '../../helpers/read_file'

const file = await getInput();

let up = 0;
let down = 0;

for (let i = 0; i < file.length; i++) {
    const char = file[i];
    if (char === '(') up++;
    if (char === ')') down++;

    if (up - down === -1) console.log('pos', i + 1)
}

console.log(up - down)
