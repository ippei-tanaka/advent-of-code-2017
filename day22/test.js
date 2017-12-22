import {countInfections} from './task01';
import {countInfections as countInfections2} from './task02';

const map = `
..#
#..
...
`;

test('task 01 example', () => {
    expect(countInfections(map, 7)).toBe(5);
    expect(countInfections(map, 70)).toBe(41);
    expect(countInfections(map, 10000)).toBe(5587);
});

test('task 02 example', () => {
    expect(countInfections2(map, 100)).toBe(26);
    expect(countInfections2(map, 10000000)).toBe(2511944);
});
