import fs from "fs";
import {getClosestToCenter} from './task01';
import {countParticlesLeft} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 20, Task 01: ${getClosestToCenter(data)}`);
    console.log(`Day 20, Task 02: ${countParticlesLeft(data)}`);
});