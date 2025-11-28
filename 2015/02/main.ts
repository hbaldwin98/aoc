import { getInput } from '../../helpers/read_file'

const file = await getInput();

let dimensionsArr = file.split('\r\n');
let total = 0;

// Packing paper
for (const dimensions of dimensionsArr) {
    if (!dimensions?.length) continue;

    let [l, w, h] = dimensions.split('x').map((a) => + a).filter(Boolean);
    let [a1, a2, a3] = [l! * w!, w! * h!, h! * l!];

    total += 2 * (a1 + a2 + a3) + Math.min(a1, a2, a3);
}

console.log('Part 1', total);

let total2 = 0;
for (const dimensions of dimensionsArr) {
    if (!dimensions) continue;

    let [l, w, h] = dimensions.split('x').map(Number);
    if (!l || !w || !h) continue;
    const sides = [l, w, h].toSorted((a, b) => a - b);

    let bow = (l * w * h);
    let wrap = 2 * (sides[0]! + sides[1]!);
    total2 += bow + wrap;
}

console.log("Part 2", total2);


