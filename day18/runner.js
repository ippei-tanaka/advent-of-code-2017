import fs from "fs";
import {getRecoveredFrequency} from './task01';
import {countSendings} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 18, Task 01: ${getRecoveredFrequency(data)}`);

    countSendings(data).then((value) => {
        console.log(`Day 18, Task 02: ${value}`);
    });
});