import {getFewestNumberOfStep} from './task01';
import {getNumberOfStepForFurthest} from './task02';

test('task 01 example', () => {
    expect(getFewestNumberOfStep('ne,ne,ne')).toBe(3);
    expect(getFewestNumberOfStep('ne,ne,sw,sw')).toBe(0);
    expect(getFewestNumberOfStep('ne,ne,s,s')).toBe(2);
    expect(getFewestNumberOfStep('se,sw,se,sw,sw')).toBe(3);
});

test('task 02 example', () => {
    expect(getNumberOfStepForFurthest('ne,ne,ne')).toBe(3);
    expect(getNumberOfStepForFurthest('ne,ne,sw,sw')).toBe(2);
    expect(getNumberOfStepForFurthest('ne,ne,s,s')).toBe(2);
    expect(getNumberOfStepForFurthest('se,sw,se,sw,sw')).toBe(3);
});