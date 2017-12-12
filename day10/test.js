import {
    getResultOfHash,
    createArray,
    sliceArray,
    reverseArray,
    mergeArrays,
    createHashedArray
} from './task01';
//import {countNonCanceledChars} from './task02';

test('task 01 unit tests', () => {
    expect(createArray(100).length).toBe(100);
    expect(createArray(100)[99]).toBe(99);
    expect(createArray(256)[0]).toBe(0);
    expect(sliceArray([0,1,2,3,4,5], 1, 4)).toEqual([1,2,3,4]);
    expect(sliceArray([0,1,2,3,4,5], 0, 0)).toEqual([0]);
    expect(sliceArray([0,1,2,3,4,5], 0, 5)).toEqual([0,1,2,3,4,5]);
    expect(sliceArray([0,1,2,3,4,5], 0, 7)).toEqual([0,1,2,3,4,5,0,1]);
    expect(reverseArray([0])).toEqual([0]);
    expect(reverseArray([0,1,2])).toEqual([2,1,0]);
    expect(reverseArray(["a","b","c","d"])).toEqual(["d","c","b","a"]);
    expect(mergeArrays([0,1,2,3,4],['a','b'], 1)).toEqual([0,'a','b',3,4]);
    expect(mergeArrays([0,1,2,3,4],['a','b'], 4)).toEqual(['b',1,2,3,'a']);
    expect(createHashedArray([0,1,2,3,4],[3,4,1,5])).toEqual([3,4,2,1,0]);
    expect(createHashedArray([0,1,2,3,4],[1,0])).toEqual([0,1,2,3,4]);
});

test('task 01 example', () => {
    expect(getResultOfHash(5, [3, 4, 1, 5])).toBe(12);
});