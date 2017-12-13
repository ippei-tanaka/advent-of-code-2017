import fs from "fs";
import {getNumberOfConnectedPrograms} from './task01';
import {getNumberOfGroups} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 12, Task 01: ${getNumberOfConnectedPrograms(data)}`);
    console.log(`Day 12, Task 02: ${getNumberOfGroups(data)}`);
});