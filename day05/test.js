import fs from 'fs';
import {countSteps as countSteps1} from './task01';
import {countSteps as countSteps2} from './task02';

test('task 01 example', () => {
    const offsets = [0, 3, 0, 1, -3];
    expect(countSteps1(offsets)).toBe(5);
});

test('task 01', () => {
    return expect(new Promise(resolve => {
        fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
            const offsets = data.trim().split('\n').map(n => Number.parseInt(n));
            resolve(countSteps1(offsets));
        });
    })).resolves.toBe(343467);
});

test('task 02 example', () => {
    const offsets = [0, 3, 0, 1, -3];
    expect(countSteps2(offsets)).toBe(10);
});

test('task 02', () => {
    return expect(new Promise(resolve => {
        fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
            const offsets = data.trim().split('\n').map(n => Number.parseInt(n));
            resolve(countSteps2(offsets));
        });
    })).resolves.toBe(24774780);
});