import {getClosestToCenter} from './task01';
import {countParticlesLeft} from './task02';

const input = `
p=< 3,0,0>, v=< 2,0,0>, a=<-1,0,0>
p=< 4,0,0>, v=< 0,0,0>, a=<-2,0,0>
`;

test('task 01 example', () => {
    expect(getClosestToCenter(input)).toBe(0);
});

const input2 = `
p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
`;

test('task 02 example', () => {
    expect(countParticlesLeft(input2)).toBe(1);
});
