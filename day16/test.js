import {letThemDance, createAlphabetList} from './task01';
import {letThemDance as letThemDance2} from './task02';

test('task 01 unit tests', () => {
    expect(createAlphabetList(3)).toEqual(["a","b","c"]);
    expect(createAlphabetList(5)).toEqual(["a","b","c","d","e"]);
});

test('task 01 example', () => {
    expect(letThemDance(5, "s1,x3/4,pe/b")).toEqual("baedc");
    expect(letThemDance(16, "s6")).toEqual("klmnopabcdefghij");
    expect(letThemDance(16, "s6,s2")).toEqual("ijklmnopabcdefgh");
    expect(letThemDance(16, "s6,s2,s14")).toEqual("klmnopabcdefghij");
    expect(letThemDance(16, "s6,s2,s14,x1/2")).toEqual("kmlnopabcdefghij");
    expect(letThemDance(16, "s6,s2,s14,x1/2,x10/15")).toEqual("kmlnopabcdjfghie");
});

test('task 02 example', () => {
    // expect(letThemDance2(16, "s6,s2,s14,x1/2", 1)).toEqual("kmlnopabcdefghij");
    // expect(letThemDance2(5, "s1,x3/4,pe/b", 1)).toEqual("baedc");
    expect(letThemDance2(5, "s1,x3/4,pe/b", 2)).toEqual("ceadb");
});
