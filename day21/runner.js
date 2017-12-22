import fs from "fs";
import {countPixels} from './task01';
import {countPixels as countPixels2} from './task02';

const pattern = `
.#.
..#
###
`;

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 21, Task 01: ${countPixels(pattern, data, 5)}`);
    console.log(`Day 21, Task 02: ${countPixels2(pattern, data, 18)}`);
});