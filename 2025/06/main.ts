import { getInput, getLines } from "../../helpers/read_file";

const input = await getInput();

const cleaned = getLines(input).map((l) => l.replace(/\s+/g, ' ').trim().split(' '));
const width = cleaned[0]!.length;
const height = cleaned.length;
let sum = 0;

for (let i = 0; i < width; i++) {
    let numbers: number[] = [];
    let operator = '';
    for (let j = 0; j < height; j++) {
        if (j === height - 1) {
            operator = cleaned[j]![i]!;
            break;
        }

        numbers.push(+cleaned[j]![i]!);
    }

    switch (operator) {
        case '*':
            sum += numbers.reduce((prev, val) => prev * val);
            break;
        case '+':
            sum += numbers.reduce((prev, val) => prev + val);
            break;
    }
}

console.log('Part 1', sum);

const cleaned2 = getLines(input);
const rows = cleaned2.length;
const columns = cleaned2[0]!.length;
sum = 0;

let lastValues = [];
for (let c = columns - 1; c >= 0; c--) {
    let value = '';
    let operator = '';
    for (let r = 0; r < rows; r++) {
        let column = cleaned2[r]![c]!;
        if (column >= '0' && column <= '9') {
            value += column;
        } else if (column === '*' || column === '+') {
            operator = column;
        }
    }

    if (value?.length) {
        lastValues.push(+value);
    }

    if (operator.length) {
        switch (operator) {
            case '*':
                sum += lastValues.reduce((prev, val) => prev * val);
                break;
            case '+':
                sum += lastValues.reduce((prev, val) => prev + val);
                break;
        }

        lastValues = [];
    }
}

console.log('Part 2', sum);
