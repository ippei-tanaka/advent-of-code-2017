export const letThemDance = (length, instructions, repeat) =>
{
    let programs = createAlphabetList(length);
    instructions = instructions.trim().split(',').map(parseInstruction);

    for (let j = 0; j < repeat; j++)
    {
        for (let i of instructions)
        {
            if (i.type === 's')
            {
                const end = programs.slice(-i.size);
                const start = programs.slice(0, programs.length - i.size);
                programs = end + start;
            }
            else if (i.type === 'x')
            {
                const char1 = programs[i.target1];
                const char2 = programs[i.target2];
                programs = programs.substr(0, i.target1) + char2 + programs.substr(i.target1 + 1);
                programs = programs.substr(0, i.target2) + char1 + programs.substr(i.target2 + 1);
            }
            else if (i.type === 'p')
            {
                const index1 = programs.indexOf(i.target1);
                const index2 = programs.indexOf(i.target2);
                const char1 = programs[index1];
                const char2 = programs[index2];
                programs = programs.substr(0, index1) + char2 + programs.substr(index1 + 1);
                programs = programs.substr(0, index2) + char1 + programs.substr(index2 + 1);
            }
        }
        console.log(j);
    }

    return programs;
};

export const createAlphabetList = (length) =>
{
    const programs = [];
    const start = 'a'.charCodeAt(0);

    for (let i = 0; i < length; i++)
    {
        programs[i] = String.fromCharCode(start + i);
    }

    return programs.join("");
};

const parseInstruction = (str) =>
{
    const result = str.match(/^([sxp])(([0-9]+)|(([0-9]+)\/([0-9]+))|(([a-z])\/([a-z])))$/);

    switch (result[1]) {
        case 's':
            return {
                type: 's',
                size: Number.parseInt(result[3])
            };
        case 'x':
            return {
                type: 'x',
                target1: Number.parseInt(result[5]),
                target2: Number.parseInt(result[6])
            };
        case 'p':
            return {
                type: 'p',
                target1: result[8],
                target2: result[9]
            };
        default:
            throw new RangeError();
    }
};