import {
    getResultOfHash,
    createArray,
    sliceArray,
    reverseArray,
    mergeArrays,
    createHashedArray
} from './task01';

import {
    convertToASCIIs,
    finalizeLengths,
    createHashedArray as createHashedArray2,
    calculateXORValue,
    convertToHex,
    getHash
} from './task02';

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

test('task 02 unit tests', () => {
    expect(convertToASCIIs('1,2,3')).toEqual([49,44,50,44,51]);
    expect(finalizeLengths('1,2,3')).toEqual([49,44,50,44,51,17,31,73,47,23]);
    expect(createHashedArray2([0,1,2,3,4],[3,4,1,5])).toEqual([3,4,2,1,0]);
    expect(createHashedArray2([0,1,2,3,4],[1,0])).toEqual([0,1,2,3,4]);
    expect(calculateXORValue([65,27,9,1,4,3,40,50,91,7,6,0,2,5,68,22])).toBe(64);
    expect(convertToHex([64, 7, 255, 13])).toBe("4007ff0d");
});

test('task 02 examples', () => {
    expect(getHash('')).toBe("a2582a3a0e66e6e86e3812dcb672a272");
    expect(getHash('AoC 2017')).toBe("33efeb34ea91902bb2f59c9920caa6cd");
    expect(getHash('1,2,3')).toBe("3efbe78a8d82f29979031a4aa0b16a9d");
    expect(getHash('1,2,4')).toBe("63960835bcdc130f0b66d7ff4f6a5a8e");
});