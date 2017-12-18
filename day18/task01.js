export const getRecoveredFrequency = (input) =>
{
    const instructions = input.trim().split('\n').map(ln => {
        const arr = ln.split(' ');
        return {
            command: arr[0],
            value1: arr[1],
            value2: arr[2]
        }
    });

    const registers = {};
    const getValue = (value) => {
        if (/^[a-z]$/.test(value))
        {
            if (typeof registers[value] === 'undefined')
            {
                registers[value] = 0;
            }
            return registers[value];
        }
        return Number.parseInt(value);
    };
    let playedLately = null;
    let index = 0;

    for (;;)
    {
        if (index >= instructions.length)
        {
            break;
        }

        const {command, value1, value2} = instructions[index];

        if (command === 'snd') {
            playedLately = getValue(value1);
        } else if (command === 'set') {
            registers[value1] = getValue(value2);
        } else if (command === 'add') {
            registers[value1] = getValue(value1) + getValue(value2);
        } else if (command === 'mul') {
            registers[value1] = getValue(value1) * getValue(value2);
        } else if (command === 'mod') {
            registers[value1] = getValue(value1) % getValue(value2);
        } else if (command === 'rcv') {
            if (getValue(value1) !== 0) {
                return playedLately;
            }
        } else if (command === 'jgz') {
            if (getValue(value1) > 0) {
                index = index + getValue(value2);
                continue;
            }
        } else {
            throw new RangeError();
        }

        index = index + 1;
    }
};