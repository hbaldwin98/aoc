import { getInput, getLines } from "../../helpers/read_file";

const input = await getInput();

let password = 0;
let current = 50;

for (const line of getLines(input)) {
    const rotation = line[0];
    const distance = Number(line.slice(1, line.length));
    const direction = rotation === 'R' ? 1 : -1;

    current = (current + (direction * distance)) % 100; 

    if (current === 0) {
        password++;
    }
}

console.log('Part 1: Password', password);
