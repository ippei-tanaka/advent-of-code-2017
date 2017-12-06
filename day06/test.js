import {countRedistributions as countRedistributions1} from './task01';
import {countRedistributions as countRedistributions2} from './task02';

test('task 01 example', () => {
    const memoryBanks = [0, 2, 7, 0];
    expect(countRedistributions1(memoryBanks)).toBe(5);
});

test('task 02 example', () => {
    const memoryBanks = [0, 2, 7, 0];
    expect(countRedistributions2(memoryBanks)).toBe(4);
});
