import { getInput } from "../../helpers/read_file";

const input = await getInput();
const ranges = input.trim().split(',');

let invalid = 0;
for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);
    const windowSize = Math.floor(end!.toString().length / 2);

    for (let i = start!; i <= end!; i++) {
        let str = i.toString();
        if (str.length % 2 !== 0) {
            continue;
        }

        if (str.slice(0, windowSize) === str.slice(windowSize, str.length)) {
            console.log('INVALID:', i);
            invalid += i;
        }
    }
}

console.log('Part 1', invalid);

function findDivisors(num: number) {
    const divisors = [];
    const numLength = num.toString().length;
    for (let i = 1; i <= Math.floor(numLength / 2); i++) {
        if (numLength % i === 0) {
            divisors.push(i);
        }
    }

    return divisors;
}
function isRepeating(str: string, step: number) {
    if (str.length % step !== 0) return false;

    for (let i = step; i < str.length; i++) {
        if (str[i] !== str[i - step]) {
            return false;
        }
    }

    return true;
}

invalid = 0;
for (const range of ranges) {
    const [start, end] = range.split('-').map(Number);

    for (let i = start!; i <= end!; i++) {
        let str = i.toString();
        // "hacky" solution
        //let double = str + str;
        //
        //if (double.indexOf(str, 1) < str.length) {
        //    invalid += i;
        //}
        //
        // could be precomputed from start/end, maybe.
        let divisors = findDivisors(i);
        for (const divisor of divisors) {
            // kind of efficient solution
            if (isRepeating(str, divisor)) {
                invalid += i;
                break;
            }

            // inefficient solution
            //    let chunks = [];
            //    for (let j = 0; j < str.length; j += divisor) {
            //        chunks.push(str.slice(j, j + divisor));
            //    }
            //
            //    if (chunks.every((c) => c === chunks[0])) {
            //        invalid += i;
            //        break;
            //    }
        }
    }
}

console.log('Part 2', invalid);
