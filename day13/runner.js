import fs from "fs";
import {getSeverity} from './task01';
import {getFewestDelay} from "./task02";

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 13, Task 01: ${getSeverity(data)}`);
    console.log(`Day 13, Task 02: ${getFewestDelay(data)}`);
});