export const getValueAfter0 = (steps) =>
{
    const repeat = 50000000;
    let currentPosition = 0;
    let targetNumber = null;

    for (let number = 1; number <= repeat; number++)
    {
        currentPosition = ((currentPosition + steps) % number) + 1;

        if (currentPosition === 1)
        {
            targetNumber = number;
        }
    }

    return targetNumber;
};
