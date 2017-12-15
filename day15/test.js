import {countMatches} from './task01';
//import {countRegions, pan, getRegion} from './task02';

test('task 01 example', () => {
    expect(countMatches(65, 8921)).toBe(588);
});