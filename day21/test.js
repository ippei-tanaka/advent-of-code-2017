import {countPixels, enhanceArray, margeArrays, rotateClockwise, flipHorizontally} from './task01';
// import {countParticlesLeft} from './task02';

test('task 01 unit tests', () => {

    expect(margeArrays([
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,1,2,3,4]
    ], [
        [8,9],
        [7,6],
        [5,4]
    ], 1, 2)).toEqual([
        [0,1,2,3,4],
        [0,1,2,3,4],
        [0,8,9,3,4],
        [0,7,6,3,4],
        [0,5,4,3,4]
    ]);

    expect(rotateClockwise([
        ['@', '-'],
        ['$', '%']
    ])).toEqual([
        ['$', '@'],
        ['%', '-']
    ]);

    expect(rotateClockwise([
        ['@', '-', '*'],
        ['+', '&', '?'],
        ['$', '%', '!']
    ])).toEqual([
        ['$', '+', '@'],
        ['%', '&', '-'],
        ['!', '?', '*']
    ]);

    expect(flipHorizontally([
        ['@', '-'],
        ['$', '%']
    ])).toEqual([
        ['-', '@'],
        ['%', '$']
    ]);

    expect(flipHorizontally([
        ['@', '-', '*'],
        ['+', '&', '?'],
        ['$', '%', '!']
    ])).toEqual([
        ['*', '-', '@'],
        ['?', '&', '+'],
        ['!', '%', '$']
    ]);

    expect(enhanceArray([
        ['@', '-', '@', '-'],
        ['@', '-', '@', '-'],
        ['@', '-', '@', '-'],
        ['$', '%', '@', '-']
    ], (partial, x, y) => {
        return [
            [`${y}${x}`, `${y}${x+1}`, `${y}${x+2}`],
            [`${y+1}${x}`, `${y+1}${x+1}`, `${y+1}${x+2}`],
            [`${y+2}${x}`, `${y+2}${x+1}`, `${y+2}${x+2}`]
        ]
    })).toEqual([
        ['00', '01', '02', '02', '03', '04'],
        ['10', '11', '12', '12', '13', '14'],
        ['20', '21', '22', '22', '23', '24'],
        ['20', '21', '22', '22', '23', '24'],
        ['30', '31', '32', '32', '33', '34'],
        ['40', '41', '42', '42', '43', '44'],
    ]);

    expect(enhanceArray([
        ['@', '-', '@'],
        ['@', '-', '@'],
        ['$', '%', '@']
    ], (partial, x, y) => {
        return [
            [0,1,2,3],
            [0,1,2,3],
            [0,1,2,3],
            [0,1,2,3]
        ]
    })).toEqual([
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3],
        [0,1,2,3]
    ]);
});

const pattern = `
.#.
..#
###
`;

const rules = `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`;

test('task 01 example', () => {
    expect(countPixels(pattern, rules, 2)).toBe(12);
});
