export const getChecksum = (input) =>
{
    const parsed = input.trim().split('\n\n');

    const descriptionMatch = parsed[0].trim().match(/^Begin in state (\w+).\s*Perform a diagnostic checksum after (\d+) steps\.$/);

    parsed.splice(0, 1);

    const _operations = parsed.map(str =>
    {
        const match = str.trim().match(/^In state (\w+):\s*If the current value is (\d+):\s*- Write the value (\d+)\.\s*- Move (\w+) slot to the (\w+)\.\s*- Continue with state (\w+)\.\s*If the current value is (\d+):\s*- Write the value (\d+)\.\s*- Move (\w+) slot to the (\w+)\.\s*- Continue with state (\w+)\.$/)

        return {
            state: match[1],
            func: (state, cursor, value) =>
            {
                let newValue, newCursor, newState;

                if (value === Number.parseInt(match[2]))
                {
                    newValue = Number.parseInt(match[3]);

                    let move = null;
                    if (match[4] === 'one')
                    {
                        move = 1;
                    }

                    if (match[5] === 'left')
                    {
                        newCursor = cursor + move;
                    } else if (match[5] === 'right')
                    {
                        newCursor = cursor - move;
                    }

                    newState = match[6];
                }
                else if (value === Number.parseInt(match[7]))
                {
                    newValue = Number.parseInt(match[8]);

                    let move = null;
                    if (match[9] === 'one')
                    {
                        move = 1;
                    }

                    if (match[10] === 'left')
                    {
                        newCursor = cursor + move;
                    } else if (match[10] === 'right')
                    {
                        newCursor = cursor - move;
                    }

                    newState = match[11];
                }

                return {
                    newValue, newState, newCursor
                }
            }
        }
    });

    const operations = {};
    for (let {state, func} of _operations)
    {
        operations[state] = func;
    }

    const tape = new Tape();
    let cursor = 0;
    let state = descriptionMatch[1];
    const steps = Number.parseInt(descriptionMatch[2]);

    for (let i = 0; i < steps; i++)
    {
        const operation = operations[state];
        const value = tape.get(cursor);
        const {newState, newValue, newCursor} = operation(state, cursor, value);
        tape.set(cursor, newValue);
        cursor = newCursor;
        state = newState;
    }

    return Array.from(tape).reduce((memory, slot) => memory + slot, 0);
};

class Tape
{
    constructor ()
    {
        this._tape = Object.create(null);
    }

    get (index)
    {
        if (typeof this._tape[index] === 'undefined')
        {
            this._tape[index] = 0;
        }

        return this._tape[index];
    }

    set (index, value)
    {
        this._tape[index] = value;
    }

    get size ()
    {
        return Object.keys(this._tape).length;
    }

    get minKey ()
    {
        return Math.min(...Object.keys(this._tape).map(k => Number.parseInt(k)));
    }

    *[Symbol.iterator] ()
    {
        const min = this.minKey;
        const max = min + this.size;
        for (let i = min; i < max; i++)
        {
            yield this.get(i);
        }
    }
}