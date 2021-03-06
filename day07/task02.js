export const getCorrectWeightOfProgram = (input) =>
{
    const parsedInput = input.trim().split('\n').map(parseInformation);
    const bottomProgram = getBottomProgram(parsedInput);
    const {correctWholeWeight, wrongWholeWeight, badProgram} = findBadProgramAndCorrectWeight(bottomProgram);
    return (correctWholeWeight - wrongWholeWeight) + badProgram.weight;
};

const parseInformation = (information) =>
{
    const result1 = information.match(/^([a-z]+)\s+\(([0-9]+)\)/);
    const result2 = information.match(/->\s+([a-z,\s]+)$/);
    return {
        name: result1[1],
        weight: Number.parseInt(result1[2]),
        children: !result2 ? [] : result2[1].split(',').map(s => s.trim())
    }
};

const getBottomProgram = (parsedInput) =>
{
    const programMap = Object.create(null);

    for (let programInfo of parsedInput)
    {
        programMap[programInfo.name] = new Program(programInfo.name, programInfo.weight);
    }

    for (let programInfo of parsedInput)
    {
        const program = programMap[programInfo.name];
        for (let childName of programInfo.children)
        {
            const childProgram = programMap[childName];
            childProgram.addParent(program);
            program.addChild(childProgram);
        }
    }

    for (let programInfo of parsedInput)
    {
        const program = programMap[programInfo.name];
        if (program.parent === null)
        {
            return program;
        }
    }
};

const findBadProgramAndCorrectWeight = (program) =>
{
    let weights = {};
    let childPrograms = {};

    for (let child of program.children)
    {
        const wholeWeight = child.getWholeWeight();
        const key = String(wholeWeight);
        if (!weights[key])
        {
            weights[key] = 0;
        }
        weights[key] += 1;
        childPrograms[key] = child;
    }

    let correctWholeWeight = null;
    let wrongWholeWeight = null;
    let badProgram = program;
    for (let key of Object.keys(weights))
    {
        if (weights[key] === 1)
        {
            badProgram = findBadProgramAndCorrectWeight(childPrograms[key]).badProgram;
            wrongWholeWeight = Number.parseInt(key);
        } else {
            correctWholeWeight = Number.parseInt(key);
        }
    }

    return {
        correctWholeWeight, wrongWholeWeight, badProgram
    };
};

class Program
{
    constructor (name, weight)
    {
        this._name = name;
        this._weight = weight;
        this._children = [];
        this._parent = null;
    }

    addParent (parent)
    {
        this._parent = parent;
    }

    addChild (child)
    {
        this._children.push(child);
    }

    get name ()
    {
        return this._name;
    }

    get weight ()
    {
        return this._weight;
    }

    get parent ()
    {
        return this._parent;
    }

    get children ()
    {
        return this._children;
    }

    getWholeWeight ()
    {
        return this.children.reduce((sum, child) => sum + child.getWholeWeight(), this.weight);
    }
}