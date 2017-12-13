export const getFewestNumberOfStep = (input) =>
{
    const directions = input.trim().split(",").map(s => s.trim());
    let position = {x:0, y:0};

    for (let direction of directions)
    {
        const offset = getOffsetsFromDirection(direction);
        position = {
            x: position.x + offset.x,
            y: position.y + offset.y
        };
    }

    return getNumberOfSteps(position);
};

const getNumberOfSteps = (position) =>
{
    const stepsForX = Math.abs(position.x);
    const diffY = Math.abs(position.y);
    const restY = diffY - (stepsForX * 0.5);
    const stepsForY = restY > 0 ? restY : 0;
    return stepsForX + stepsForY;
};

const getOffsetsFromDirection = (direction) =>
{
    switch (direction)
    {
        case "n":
            return {x: 0, y: -1};
        case "ne":
            return {x: 1, y: -0.5};
        case "se":
            return {x: 1, y: 0.5};
        case "s":
            return {x: 0, y: 1};
        case "sw":
            return {x: -1, y: 0.5};
        case "nw":
            return {x: -1, y: -0.5};
    }

    throw new Error(`Direction:${direction} is not recognizable.`);
};