export const letThemDance = (length, instructions, repeat) =>
{
    const programs = createAlphabetList(length);
    instructions = instructions.trim().split(',').map(parseInstruction);
    instructions = compressInstructions(instructions, programs);
    const newPrograms = executeInstructions(instructions, programs, repeat);
    return newPrograms.join("");
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

const compressInstructions = (instructions, programs) =>
{
    const pristinePrograms = (new Array(programs.length)).fill(0).map((i, index) => index);
    let traceOfInstructions = pristinePrograms.slice(0);
    let instructionsCompressed = false;
    const compressedInstructions = [];

    for (let i of instructions)
    {
        if (i.type === 's')
        {
            const end = traceOfInstructions.slice(-i.size);
            const start = traceOfInstructions.slice(0, traceOfInstructions.length - i.size);
            traceOfInstructions = end.concat(start);
            instructionsCompressed = true;
        }
        else if (i.type === 'x')
        {
            const temp = traceOfInstructions[i.target1];
            traceOfInstructions[i.target1] = traceOfInstructions[i.target2];
            traceOfInstructions[i.target2] = temp;
            instructionsCompressed = true;
        }
        else if (i.type === 'p')
        {
            if (instructionsCompressed)
            {
                const moves = [];
                for (let i = 0; i < traceOfInstructions.length; i++)
                {
                    moves[i] = traceOfInstructions.indexOf(i);
                }
                compressedInstructions.push({
                    type: 'sx',
                    moves
                });

                instructionsCompressed = false;
                traceOfInstructions = pristinePrograms.slice(0);
            }

            compressedInstructions.push(i);
        }
    }

    if (instructionsCompressed)
    {
        const moves = [];
        for (let i = 0; i < traceOfInstructions.length; i++)
        {
            moves[i] = traceOfInstructions.indexOf(i);
        }
        compressedInstructions.push({
            type: 'sx',
            moves
        });
    }

    return compressedInstructions;
};

const executeInstructions = (instructions, programs, repeat) =>
{
    let _programs = programs.slice(0);
    const length = _programs.length;
    const records = [_programs.join("")];
    let loopStartPrograms = null;
    let loopSize = null;

    for (let counter = 1; counter <= repeat; counter++)
    {
        for (let i of instructions)
        {
            if (i.type === 'sx')
            {
                const oldProgram = _programs;
                const newPrograms = new Array(length);
                for (let index = 0; index < length; index++)
                {
                    newPrograms[i.moves[index]] = oldProgram[index];
                }
                _programs = newPrograms;
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

        const str = _programs.join("");
        const indexOfDuplicated = records.indexOf(str);

        if (indexOfDuplicated !== -1)
        {
            loopStartPrograms = _programs;
            loopSize = counter - indexOfDuplicated;
            records.push(str);
            break;
        }

        records.push(str);
    }

    if (loopStartPrograms)
    {
        return executeInstructions(instructions, loopStartPrograms, repeat % loopSize);
    } else {
        return _programs;
    }
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