import {getStrengthOfStrongestBridge} from './task01';
import {getStrengthOfLongestBridge} from './task02';

const input = `
0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`;

test('task 01 example', () => {
    expect(getStrengthOfStrongestBridge(input)).toBe(31);
});

test('task 02 example', () => {
    expect(getStrengthOfLongestBridge(input)).toBe(19);
});