export const countMatches = (firstValueOfA, firstValueOfB) =>
{
    let valueOfA = firstValueOfA;
    let valueOfB = firstValueOfB;
    const FACTOR_OF_A = 16807;
    const FACTOR_OF_B = 48271;
    const LIMIT = 2147483647;
    const REPEAT = 5000000;
    let counter = 0;

    for (let i = 0; i < REPEAT; i++)
    {
        for (;;)
        {
            valueOfA = (valueOfA * FACTOR_OF_A) % LIMIT;
            if (valueOfA % 4 === 0) break;
        }

        for (;;)
        {
            valueOfB = (valueOfB * FACTOR_OF_B) % LIMIT;
            if (valueOfB % 8 === 0) break;
        }

        const binaryA = getBinaryValue(valueOfA, 32);
        const binaryB = getBinaryValue(valueOfB, 32);

        if (binaryA.slice(16) === binaryB.slice(16))
        {
            counter = counter + 1;
        }
    }

    return counter;
};

const getBinaryValue = (number, length) =>
{
    return pan(String(Number(number).toString(2)), length);
};

const pan = (str, length) =>
{
    const room = length - str.length;
    for (let i = 0; i < room; i++)
    {
        str = '0' + str;
    }
    return str;
};
