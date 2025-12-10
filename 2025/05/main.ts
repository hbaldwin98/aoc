import { getInput, getLines } from "../../helpers/read_file";

const input = await getInput();
const lines = getLines(input);

const breakIdx = lines.indexOf("");
const ranges = lines.slice(0, breakIdx).map((r) => {
    const delimiter = r.indexOf('-');
    const start = +r.slice(0, delimiter)!;
    const end = +r.slice(delimiter + 1)!;
    return { start, end };
});

const ingredients = lines.slice(breakIdx + 1);

let fresh = 0;
for (const ingredient of ingredients) {
    for (const range of ranges) {
        if (+ingredient >= range.start && +ingredient <= range.end) {
            fresh++;
            break;
        }
    }
}

console.log('Part 1', fresh);


let sortedRanges = ranges.toSorted((a, b) => a.start - b.start);
let previousRange: { start: number, end: number } | undefined = undefined;
let newRanges = [];
for (let i = 0; i < sortedRanges.length; i++) {
    let range = sortedRanges[i]!;
    if (!previousRange) {
        previousRange = { ...range };
        continue;
    }

    if (range.start <= previousRange.end + 1) {
        previousRange = {
            start: Math.min(previousRange.start, range.start),
            end: Math.max(previousRange.end, range.end)
        };
    } else {
        newRanges.push(previousRange);
        previousRange = { ...range };
    }
}

if (previousRange) {
    newRanges.push(previousRange);
}

let totalFresh = 0;

for (const range of newRanges) {
    totalFresh += (range.end - range.start) + 1;
}

console.log('Part 2', totalFresh);
