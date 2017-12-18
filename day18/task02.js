export const countSendings = (input) =>
{
    const instructions = input.trim().split('\n').map(ln => {
        const arr = ln.split(' ');
        return {
            command: arr[0],
            value1: arr[1],
            value2: arr[2]
        }
    });

    const program0 = new Program(0, instructions);
    const program1 = new Program(1, instructions);

    program0.addReceiver(program1);
    program1.addReceiver(program0);

    return Promise.all(
        [
            program0.start(),
            program1.start()
        ]
    ).catch(reason => {
        if (reason === "Dead Lock!")
        {
            return program1.sendingCounter;
        }
        throw reason;
    });
};

class Program
{
    constructor (ID, instructions)
    {
        this._ID = ID;
        this._registers = {};
        this._instructions = instructions;
        this._receiver = null;
        this._queue = [];
        this._sendingCounter = 0;
    }

    _getValueOf (arg)
    {
        if (/^[a-z]$/.test(arg))
        {
            if (typeof this._registers[arg] === 'undefined')
            {
                this._registers[arg] = this._ID;
            }

            return this._registers[arg];
        }

        return Number.parseInt(arg);
    }

    get sendingCounter ()
    {
        return this._sendingCounter;
    }

    addReceiver (receiver)
    {
        this._receiver = receiver;
    }

    onSent (value)
    {
        this._queue.push(value);
    }

    async start ()
    {
        let index = 0;

        for (;;)
        {
            if (index >= this._instructions.length)
            {
                break;
            }

            const {command, value1, value2} = this._instructions[index];

            index = await this['_' + command]({value1, value2, index});
        }

        return 10;
    }

    async _snd ({value1, index})
    {
        this._receiver.onSent(this._getValueOf(value1));
        this._sendingCounter = this._sendingCounter + 1;
        return index + 1;
    }

    _rcv ({value1, index})
    {
        return new Promise((resolve, reject) =>
        {
            let counter = 0;
            const checkQueue = () => {
                const value = this._queue.shift();
                if (value)
                {
                    this._registers[value1] = value;
                    resolve(index + 1);
                }
                else if (counter < 100)
                {
                    setTimeout(checkQueue, 10);
                }
                else {
                    reject('Dead Lock!');
                }
                counter = counter + 1;
            };
            checkQueue();
        });
    }

    async _set ({value1, value2, index})
    {
        this._registers[value1] = this._getValueOf(value2);
        return index + 1;
    }

    async _add ({value1, value2, index})
    {
        this._registers[value1] = this._getValueOf(value1) + this._getValueOf(value2);
        return index + 1;
    }

    async _mul ({value1, value2, index})
    {
        this._registers[value1] = this._getValueOf(value1) * this._getValueOf(value2);
        return index + 1;
    }

    async _mod ({value1, value2, index})
    {
        this._registers[value1] = this._getValueOf(value1) % this._getValueOf(value2);
        return index + 1;
    }

    async _jgz ({value1, value2, index})
    {
        if (this._getValueOf(value1) > 0) {
            return index + this._getValueOf(value2);
        }
        return index + 1;
    }

}