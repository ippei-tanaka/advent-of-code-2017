export const getValueAfter2017 = (steps) =>
{
    const buffers = [0];
    const repeat = 2017;
    let currentPosition = 0;

    for (let number = 1; number <= repeat; number++)
    {
        currentPosition = ((currentPosition + steps) % buffers.length) + 1;
        buffers.splice(currentPosition, 0, number);
    }

    return buffers[buffers.indexOf(2017) + 1];
};
