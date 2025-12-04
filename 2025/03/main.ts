import { getInput, getLines } from "../../helpers/read_file";

const input = await getInput();
const banks = getLines(input);

// Turn on two batteries

let voltage = 0;
for (const bank of banks) {
    let firstIdx = 0;
    let first = bank.at(0);
    let second = bank.at(-1);

    // rules
    // the first number being the largest number will ALWAYS
    // result in the largest number in the ones place
    for (let i = bank.length - 2; i >= 0; i--) {
        if (bank[i]! >= first!) {
            first = bank[i];
            firstIdx = i;
        }
    }

    // Move to the right to find the second largest number
    for (let i = firstIdx + 1; i < bank.length; i++) {
        if (bank[i]! >= second!) {
            second = bank[i];
        }
    }

    voltage += Number(`${first}${second}`);
}


console.log('Part 1', voltage);

voltage = 0;
for (const bank of banks) {
    const TARGET_LENGTH = 12;
    const stack: number[] = [];

    let remaining = bank.length - TARGET_LENGTH;

    for (let i = 0; i < bank.length; i++) {
        const num = +bank[i]!;
        while (
            remaining > 0 &&
            stack.length > 0 &&
            stack[stack.length - 1]! < num
        ) {
            stack.pop();
            remaining--;
        }

        stack.push(num);
    }

    while (stack.length > TARGET_LENGTH) {
        stack.pop();
    }

    console.log(stack.join(''));
    voltage += Number(stack.join(''));
}

console.log('Part 2', voltage);
