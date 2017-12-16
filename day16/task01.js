export const letThemDance = (length, instructions) =>
{
    let programs = createAlphabetList(length);
    instructions = instructions.trim().split(',').map(parseInstruction);

    for (let i of instructions)
    {
        if (i.type === 'spin')
        {
            const end = programs.slice(-i.size);
            const start = programs.slice(0, programs.length - i.size);
            programs = end.concat(start);
        }
        else if (i.type === 'exchange')
        {
            const temp = programs[i.target1];
            programs[i.target1] = programs[i.target2];
            programs[i.target2] = temp;
        }
        else if (i.type === 'partner')
        {
            const index1 = programs.indexOf(i.target1);
            const index2 = programs.indexOf(i.target2);
            const temp = programs[index1];
            programs[index1] = programs[index2];
            programs[index2] = temp;
        }
    }

    return programs.join("");
};

export const createAlphabetList = (length) =>
{
    const programs = [];
    const start = 'a'.charCodeAt(0);

    for (let i = 0; i < length; i++)
    {
        programs[i] = String.fromCharCode(start + i);
    }

    return programs;
};

const parseInstruction = (str) =>
{
    const result = str.match(/^([sxp])(([0-9]+)|(([0-9]+)\/([0-9]+))|(([a-z])\/([a-z])))$/);

    switch (result[1]) {
        case 's':
            return {
                type: 'spin',
                size: Number.parseInt(result[3])
            };
        case 'x':
            return {
                type: 'exchange',
                target1: Number.parseInt(result[5]),
                target2: Number.parseInt(result[6])
            };
        case 'p':
            return {
                type: 'partner',
                target1: result[8],
                target2: result[9]
            };
        default:
            throw new RangeError();
    }
};