export const countNonCanceledChars = (input) =>
{
    const exclamationIgnored = input.trim().replace(/!./g, "");
    const pattern = /<([^>]*)>,?/g;

    let sum = 0;
    let result;
    while ((result = pattern.exec(exclamationIgnored)) !== null)
    {
        sum = sum + result[1].length;
    }

    return sum;
};