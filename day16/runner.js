import fs from "fs";
import {letThemDance} from './task01';
import {letThemDance as letThemDance2} from './task02';

fs.readFile(__dirname + '/input.txt', 'utf8', (err, data) => {
    console.log(`Day 16, Task 01: ${letThemDance(16, data)}`);
    console.log(`Day 16, Task 02: ${letThemDance2(16, data, 1000000000)}`);
});