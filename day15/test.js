import {countMatches} from './task01';
import {countMatches as countMatches2} from './task02';

test('task 01 example', () => {
    expect(countMatches(65, 8921)).toBe(588);
});

test('task 02 example', () => {
    expect(countMatches2(65, 8921)).toBe(309);
});