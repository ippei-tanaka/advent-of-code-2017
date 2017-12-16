export const letThemDance = (length, instructions, repeat) =>
{
    const programs = createAlphabetList(length);
    instructions = instructions.trim().split(',').map(parseInstruction);
    const moves = createMoves(programs, instructions);
    const newPrograms = executeMoves(programs, moves, repeat);
    return newPrograms.join("");
};

const createMoves = (programs, instructions) =>
{
    const testResult = executeInstructions(programs, instructions);
    const moves = [];

    for (let index = 0; index < programs.length; index++)
    {
        const program = programs[index];
        const newIndex = testResult.indexOf(program);
        moves[index] = newIndex;
    }

    return moves;
};

const executeMoves = (programs, moves, repeat) =>
{
    const length = moves.length;
    let oldProgram = programs;
    let newPrograms = null;

    for (let counter = 0; counter < repeat; counter++)
    {
        newPrograms = new Array(length);
        console.log(oldProgram.join(""));

        for (let index = 0; index < length; index++)
        {
            newPrograms[moves[index]] = oldProgram[index];
        }
        oldProgram = newPrograms;
    }
    console.log(newPrograms.join(""));


    return newPrograms;
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

const executeInstructions = (programs, instructions) =>
{
    let _programs = programs.slice(0);
    for (let i of instructions)
    {
        if (i.type === 's')
        {
            const end = _programs.slice(-i.size);
            const start = _programs.slice(0, _programs.length - i.size);
            _programs = end.concat(start);
        }
        else if (i.type === 'x')
        {
            const temp = _programs[i.target1];
            _programs[i.target1] = _programs[i.target2];
            _programs[i.target2] = temp;
        }
        else if (i.type === 'p')
        {
            const index1 = _programs.indexOf(i.target1);
            const index2 = _programs.indexOf(i.target2);
            const temp = _programs[index1];
            _programs[index1] = _programs[index2];
            _programs[index2] = temp;
        }
    }
    return _programs;
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