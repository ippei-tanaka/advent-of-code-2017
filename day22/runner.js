import fs from "fs";
import {countInfections} from './task01';
import {countInfections as countInfections2} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 22, Task 01: ${countInfections(data, 10000)}`);
    console.log(`Day 22, Task 02: ${countInfections2(data, 10000000)}`);
});