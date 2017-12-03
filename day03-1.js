const input = 325489;

const calculateStepsInSpiralArray = (inputNumber) =>
{
    let location = {x: 0, y: 0};
    let num = 1;
    let lengthOfSide = 1;
    let counterOfSide = 0;
    let direction = {x: 1, y: 0};

    for (;;)
    {
        num = num + lengthOfSide;
        counterOfSide = counterOfSide + 1;
        location.x = location.x + direction.x * lengthOfSide;
        location.y = location.y + direction.y * lengthOfSide;

        console.log(`${num} - x:${location.x} y:${location.y}`);

        if (num >= inputNumber)
        {
            break;
        }

        // Change the direction
        if (direction.x === 1)
        {
            direction.x = 0;
            direction.y = -1;
        } else if (direction.y === -1)
        {
            direction.x = -1;
            direction.y = 0;
        } else if (direction.x === -1)
        {
            direction.x = 0;
            direction.y = 1;
        } else if (direction.y === 1)
        {
            direction.x = 1;
            direction.y = 0;
        }

        // Increment the length of the side
        if (counterOfSide === 2)
        {
            counterOfSide = 0;
            lengthOfSide = lengthOfSide + 1;
        }
    }

    const gap = num - inputNumber;

    location.x = location.x + (-1 * direction.x * gap);
    location.y = location.y + (-1 * direction.y * gap);

    console.log(`${inputNumber} - x:${location.x} y:${location.y}`);

    return Math.abs(location.x) + Math.abs(location.y);
};

console.log(`Steps: ${calculateStepsInSpiralArray(input)}`);
