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

// store the pair with their positions

nices = 0;

for (let i = 0; i < strings.length; i++) {
    const string = strings[i]!;
    const pairs = new Map<string, number[]>();
    let hasSandwich = false;
    let hasPair = false;

    for (let j = 0; j < string.length - 1; j++) {
        if (string[j] === string[j + 2]) {
            hasSandwich = true;
        }

        let pair = string[j]! + string[j + 1];
        if (pairs.has(pair)) {
            let foundPair = pairs.get(pair);
            if (foundPair?.[1] !== j) {
                hasPair = true;
            }
        } else {
            pairs.set(pair, [j, j + 1]);
        }

        if (hasSandwich && hasPair) {
            nices++;
            break;
        }
    }
}

console.log("Part 2", nices);
