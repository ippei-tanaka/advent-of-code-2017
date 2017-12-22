import {countInfections} from './task01';
// import {countParticlesLeft} from './task02';

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
