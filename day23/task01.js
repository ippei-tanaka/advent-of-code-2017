export const countMultiplications = (input) =>
{
    const registers = {};
    for (let key of 'abcdefgh')
    {
        registers[key] = 0;
    }

    const instructions = input.trim().split('\n').map(line => {
        const matches = line.match(/^([a-z]{3}) ([\-a-z0-9]+) ([\-a-z0-9]+)$/);
        return {
            command: matches[1],
            value1: matches[2],
            value2: matches[3]
        }
    });

    const getValueOf = (arg) =>
    {
        if (/^[a-z]$/.test(arg))
        {
            return registers[arg];
        }
        else
        {
            return Number.parseInt(arg);
        }
    };

    let counterForMultiplications = 0;
    let counter = 0;
    for (;;)
    {
        if (counter >= instructions.length)
        {
            break;
        }

        const {command, value1, value2} = instructions[counter];

        if (command === "set")
        {
            registers[value1] = getValueOf(value2);
        }
        else if (command === "sub")
        {
            registers[value1] -= getValueOf(value2);
        }
        else if (command === "mul")
        {
            registers[value1] *= getValueOf(value2);
            counterForMultiplications += 1;
        }
        else if (command === "jnz")
        {
            if (getValueOf(value1) !== 0)
            {
                counter += getValueOf(value2);
                continue;
            }
        }
        else
        {
            throw new RangeError();
        }

        counter += 1;
    }

    return counterForMultiplications;
};