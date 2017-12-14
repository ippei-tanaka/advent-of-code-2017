export const getFewestDelay = (input) =>
{
    return emulate(createSettings(input));
};

export const emulate = (settings) =>
{
    let delay = 0;
    const size = settings.length;

    for (;;)
    {
        let collision = false;
        const firewall = new Firewall(settings);

        firewall.update(delay);

        for (let depth = 0; depth < size; depth++)
        {
            firewall.addPacket(depth);

            if (firewall.detectCollision()) {
                delay = delay + 1;
                collision = true;
                break;
            }

            firewall.update(1);
        }

        if (!collision)
        {
            break;
        }
    }

    return delay;
};

const createSettings = (input) =>
{
    const parsed = input.trim().split('\n').map(line => {
        const result = line.trim().split(':');
        return {
            depth: Number.parseInt(result[0].trim()),
            range: Number.parseInt(result[1].trim())
        }
    });

    const lastIndex = parsed[parsed.length - 1].depth;
    const settings = new Array(lastIndex + 1);
    for (let i = 0; i <= lastIndex; i++)
    {
        settings[i] = parsed.find(o => o.depth === i) || {depth: i, range: 0};
    }

    return settings;
};

class Firewall
{
    constructor (settings)
    {
        this._layers = this._createLayers(settings);
    }

    _createLayers (settings)
    {
        const layers = new Array(settings.length);

        for (let i = 0; i < settings.length; i++)
        {
            layers[i] = new Layer(settings[i].range);
        }

        return layers;
    }

    update (repeat)
    {
        for (let layer of this._layers)
        {
            layer.update(repeat);
        }
    }

    toString ()
    {
        return this._layers.reduce((memo, l) => memo + "\n" + l.toString());
    }

    addPacket (depth)
    {
        this._layers[depth].addPacket();
    }

    detectCollision()
    {
        return !!this._layers.find(layer => layer.detectCollision());
    }

    get size ()
    {
        return this._layers.length;
    }
}

const SENSOR = "S";
const EMPTY = "-";

class Layer
{
    constructor(size)
    {
        this._layer = new Array(size);
        this._packet = false;
        this._direction = 1;
        this._initialize();
    }

    _initialize ()
    {
        for (let i = 0; i < this._layer.length; i++)
        {
            this._layer[i] = EMPTY;
        }

        if (this._layer.length > 0)
        {
            this._layer[0] = SENSOR;
        }
    }

    update (repeat)
    {
        const length = this._layer.length;
        this._packet = false;

        if (length <= 1)
        {
            return;
        }

        const index = this._layer.indexOf(SENSOR);

        if (index !== -1)
        {
            this._layer[index] = EMPTY;

            const move = repeat % ((length - 1) * 2);
            let newIndex = index;

            for (let i = 0; i < move; i++)
            {
                if ((newIndex <= 0 && this._direction === -1)
                    || ((length - 1) <= newIndex) && this._direction === 1)
                {
                    this._direction = this._direction * -1;
                }

                newIndex = newIndex + this._direction;
            }

            this._layer[newIndex] = SENSOR;
        }
    }

    toString ()
    {
        let str = "[";
        if (this._layer.length > 0)
        {
            str += this._layer.reduce((memo, item, index) => {
                if(this._packet && index === 0) return memo + ` (${item})`;
                return memo + ` -${item}-`;
            }, "");
        } else if (this._packet) {
            str += '()';
        }
        str += " ]";
        return str;
    }

    detectCollision()
    {
        return this._packet && this._layer.length > 0 && this._layer[0] === SENSOR;
    }

    addPacket ()
    {
        this._packet = true;
    }

    get size ()
    {
        return this._layer.length;
    }
}