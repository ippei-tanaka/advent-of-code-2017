import {generate} from './knot-hash-generator';

export const countUsedSquare = (input) =>
{
    let result = "";
    for (let i = 0; i < 128; i++)
    {
        const hash = generate(`${input}-${i}`);

        for (let j = 0; j < hash.length; j++)
        {
            const char = hash.charAt(j);
            const number = Number.parseInt(char, 16).toString(2);
            result += number;
        }
    }

    let counter = 0;
    for (let i = 0; i < result.length; i++)
    {
        if(result.charAt(i) === "1")
        {
            counter += 1;
        }
    }
    return counter;
};