export const getLargestValueDuringOperations = (input) =>
{
    const instructions = input.trim().split('\n').map(parseInstruction);
    const registers = new Registers();

    for (let {operation, condition} of instructions)
    {
        if (compare(condition.operator, registers.get(condition.subject), condition.value))
        {
            const outcome = operate(operation.operator, registers.get(operation.subject), operation.value);
            registers.set(operation.subject, outcome);
        }
    }

    return registers.getMaxHighestValue();
};

const parseInstruction = (line) =>
{
    const result = line.trim().match(/^([a-z]+) ((dec)|(inc)) ([\-0-9]+) if ([a-z]+) ([<>=!]+) ([\-0-9]+)$/);
    return {
        operation : {
            subject: result[1],
            operator: result[2],
            value: Number.parseInt(result[5]),
        },
        condition : {
            subject: result[6],
            operator: result[7],
            value: Number.parseInt(result[8])
        }
    }
};

const compare = (operator, value1, value2) =>
{
    switch (operator)
    {
        case "==":
            return value1 === value2;
        case "!=":
            return value1 !== value2;
        case ">=":
            return value1 >= value2;
        case ">":
            return value1 > value2;
        case "<=":
            return value1 <= value2;
        case "<":
            return value1 < value2;
        default:
            throw new Error(`The operator "${operator}" is not recognizable.`);
    }
};

const operate = (operator, value1, value2) =>
{
    switch (operator)
    {
        case "inc":
            return value1 + value2;
        case "dec":
            return value1 - value2;
        default:
            throw new Error(`The operator "${operator}" is not recognizable.`);
    }
};


class Registers {

    constructor ()
    {
        this._values = Object.create(null);
        this._highestValues = Object.create(null);
    }

    get (name)
    {
        if (typeof this._values[name] === "undefined")
        {
            this.set(name, Registers.INITIAL_VALUE);
        }

        return this._values[name];
    }

    set (name, value)
    {
        this._values[name] = value;

        if (typeof this._highestValues[name] === "undefined")
        {
            this._highestValues[name] = Registers.INITIAL_VALUE;
        } else if (this._highestValues[name] < value)
        {
            this._highestValues[name] = value;
        }
    }

    getMaxHighestValue ()
    {
        let maxValue = Registers.INITIAL_VALUE;
        for (let name of Object.keys(this._highestValues))
        {
            const value = this._highestValues[name];

            if (maxValue < value)
            {
                maxValue = value;
            }
        }
        return maxValue;
    }

    static get INITIAL_VALUE ()
    {
        return 0;
    }
}