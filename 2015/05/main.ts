import { getInput } from '../../helpers/read_file'

const input = await getInput();

// Rules for a 'Nice' string
// at least three vowels
// One letter that appears twice in a row
// Does not contain 'ab', 'cd', 'pq', or 'xy'

// two-character sliding window

const strings = input.split('\r\n');
const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
const invalids = new Set(['ab', 'cd', 'pq', 'xy'])
let nices = 0;

for (let i = 0; i < strings.length; i++) {
    let numVowels = 0;
    let double = false;
    let invalid = false;
    let string = strings[i]!;

    for (let j = 0; j < string.length; j++) {
        let currentChar = string[j];
        let nextChar = string[j + 1];

        if (nextChar && invalids.has(`${currentChar}${nextChar}`)) {
            invalid = true;
            break;
        }

        if (nextChar && currentChar === nextChar) {
            double = true;
        }

        if (vowels.has(currentChar!)) {
            numVowels++;
        }
    }

    if (!invalid && double && numVowels >= 3) {
        nices++;
    }
}

console.log("Part 1", nices);
