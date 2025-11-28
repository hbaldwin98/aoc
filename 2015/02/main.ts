import { getInput } from '../../helpers/read_file'

const file = await getInput();

let dimensionsArr = file.split('\r\n');
let total = 0;

for (const dimensions of dimensionsArr) {
    if (!dimensions?.length) continue;

    let [l, w, h] = dimensions.split('x').map((a) => + a).filter(Boolean);
    let [a1, a2, a3] = [l! * w!, w! * h!, h! * l!];

    total += 2 * (a1 + a2 + a3) + Math.min(a1, a2, a3);
}

console.log(total);
