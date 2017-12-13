import {getNumberOfConnectedPrograms} from './task01';
import {getNumberOfGroups} from './task02';

const input = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`;

test('task 01 example', () => {
    expect(getNumberOfConnectedPrograms(input)).toBe(6);
});

test('task 02 example', () => {
    expect(getNumberOfGroups(input)).toBe(2);
});
