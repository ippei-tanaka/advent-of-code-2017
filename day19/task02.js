export const countSteps = (input) =>
{
    const map = input.replace(/^\n+/, "").replace(/\n+$/, "").split('\n').map(line => line.split(''));
    const position = {x: null, y: 0};
    const direction = {x: 0, y: 1};
    let stepCounter = 0;

    position.x = map[position.y].indexOf("|");

    for(;;)
    {
        const item = map[position.y][position.x];

        if (item === "+")
        {
            const newDirection1 = direction.x === 0 ? {x:  1, y: 0} : {x: 0, y:  1};
            const newDirection2 = direction.x === 0 ? {x: -1, y: 0} : {x: 0, y: -1};

            let newItem = ' ';

            try {
                newItem = map[position.y + newDirection1.y][position.x + newDirection1.x];
            } catch (e) {}

            if (newItem !== ' ')
            {
                direction.x = newDirection1.x;
                direction.y = newDirection1.y;
            } else
            {
                direction.x = newDirection2.x;
                direction.y = newDirection2.y;
            }
        }
        else if (item === " ")
        {
            break;
        }

        position.x = position.x + direction.x;
        position.y = position.y + direction.y;

        stepCounter = stepCounter + 1;
    }

    return stepCounter;
};