import fs from 'fs';
import {countRedistributions as countRedistributions1} from './task01';
import {countRedistributions as countRedistributions2} from './task02';

test('task 01 example', () => {
    const memoryBanks = [0, 2, 7, 0];
    expect(countRedistributions1(memoryBanks)).toBe(5);
});

test('task 01', () => {
    return expect(new Promise(resolve => {
        fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
            const memoryBanks = data.trim().split(/\s+/).map(n => Number.parseInt(n));
            resolve(countRedistributions1(memoryBanks));
        });
    })).resolves.toBe(14029);
});

test('task 02 example', () => {
    const memoryBanks = [0, 2, 7, 0];
    expect(countRedistributions2(memoryBanks)).toBe(4);
});

test('task 02', () => {
    return expect(new Promise(resolve => {
        fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
            const memoryBanks = data.trim().split(/\s+/).map(n => Number.parseInt(n));
            resolve(countRedistributions2(memoryBanks));
        });
    })).resolves.toBe(2765);
});
