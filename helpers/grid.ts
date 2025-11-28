export function X(index: number, width: number) {
    return index % width;
}

export function Y(index: number, width: number) {
    return Math.trunc(index / width);
}

export function I(x: number, y: number, width: number) {
    return y * width + x;
}

export function S(data: string, x: number, y: number, width: number) {
    if (x < 0 || x >= width || y < 0 || y >= data.length) {
        return undefined;
    }

    return data[I(x, y, width)];
}
