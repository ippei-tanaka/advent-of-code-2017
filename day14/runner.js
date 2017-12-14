import fs from "fs";
import {countUsedSquare} from './task01';
import {countRegions} from "./task02";

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 14, Task 01: ${countUsedSquare(data.trim())}`);
    console.log(`Day 14, Task 02: ${countRegions(data)}`);
});