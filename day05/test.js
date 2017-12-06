import {countSteps as countSteps1} from './task01';
import {countSteps as countSteps2} from './task02';

test('task 01 example', () => {
    const offsets = [0, 3, 0, 1, -3];
    expect(countSteps1(offsets)).toBe(5);
});

test('task 02 example', () => {
    const offsets = [0, 3, 0, 1, -3];
    expect(countSteps2(offsets)).toBe(10);
});