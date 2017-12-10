import {getScoreOf} from './task01';
import {countNonCanceledChars} from './task02';

test('task 01 example', () => {
    expect(getScoreOf("{}")).toBe(1);
    expect(getScoreOf("{{{}}}")).toBe(6);
    expect(getScoreOf("{{},{}}")).toBe(5);
    expect(getScoreOf("{{{},{},{{}}}}")).toBe(16);
    expect(getScoreOf("{<a>,<a>,<a>,<a>}")).toBe(1);
    expect(getScoreOf("{{<ab>},{<ab>},{<ab>},{<ab>}}")).toBe(9);
    expect(getScoreOf("{{<!!>},{<!!>},{<!!>},{<!!>}}")).toBe(9);
    expect(getScoreOf("{{<a!>},{<a!>},{<a!>},{<ab>}}")).toBe(3);
});

test('task 02 example', () => {
    expect(countNonCanceledChars("<>")).toBe(0);
    expect(countNonCanceledChars("<random characters>")).toBe(17);
    expect(countNonCanceledChars("<<<<>")).toBe(3);
    expect(countNonCanceledChars("<{!>}>")).toBe(2);
    expect(countNonCanceledChars("<!!>")).toBe(0);
    expect(countNonCanceledChars("<!!!>>")).toBe(0);
    expect(countNonCanceledChars("<{o\"i!a,<{i<a>")).toBe(10);
    expect(countNonCanceledChars("{<a>,<a>,<a>,<a>}")).toBe(4);
});
