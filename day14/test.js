import {countUsedSquare} from './task01';
import {countRegions, pan, getRegion} from './task02';

const input = "flqrgnkx";

test('task 01 example', () => {
    expect(countUsedSquare(input)).toBe(8108);
});

const sample = `
        0, 1, 1, 0, 1
        1, 1, 0, 1, 1
        0, 0, 0, 1, 1
        0, 0, 1, 0, 1
        0, 0, 1, 0, 1
    `.replace(/[,\s]+/g, "");

test('task 02 unit tests', () => {
    expect(pan('a', 3)).toBe('00a');
    expect(pan('11')).toBe('0011');
    expect(pan('011')).toBe('0011');
    expect(pan('1011')).toBe('1011');
    expect(getRegion(sample, 0, 5)).toEqual([]);
    expect(getRegion(sample, 1, 5)).toEqual([1,2,5,6]);
    expect(getRegion(sample, 2, 5)).toEqual([1,2,5,6]);
    expect(getRegion(sample, 3, 5)).toEqual([]);
    expect(getRegion(sample, 4, 5)).toEqual([4,8,9,13,14,19,24]);
    expect(getRegion(sample, 17, 5)).toEqual([17,22]);
});

test('task 02 example', () => {
    expect(countRegions(input)).toBe(1242);
});
