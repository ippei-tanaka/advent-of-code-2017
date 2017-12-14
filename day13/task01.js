export const getSeverity = (input) =>
{

    const firewall = new Firewall(createSettings(input));
    let yourPosition = -1;
    let severity = 0;

    for (let depth = 0; depth < firewall.size; depth++)
    {
        yourPosition = yourPosition + 1;

        if (firewall.checkOn(yourPosition, 0))
        {
            severity = severity + (depth * firewall.getRangeAt(depth));
        }

        firewall.update();
    }

    return severity;
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

    update ()
    {
        for (let layer of this._layers)
        {
            layer.update();
        }
    }

    print ()
    {
        this._layers.forEach(l => l.print());
    }

    checkOn(depth, index)
    {
        return this._layers[depth].checkOn(index);
    }

    getRangeAt (depth)
    {
        return this._layers[depth].size;
    }

    get size ()
    {
        return this._layers.length;
    }
}

const SENSOR = "S";

class Layer
{
    constructor(size)
    {
        this._layer = new Array(size);
        this._direction = 1;
        this._initialize();
    }

    _initialize ()
    {
        for (let i = 0; i < this._layer.length; i++)
        {
            this._layer[i] = null;
        }

        if (this._layer.length > 0)
        {
            this._layer[0] = SENSOR;
        }
    }

    update ()
    {
        if (this._layer.length <= 1)
        {
            return;
        }

        const index = this._layer.indexOf(SENSOR);

        if (index !== -1)
        {
            this._layer[index] = null;

            if ((index === 0 && this._direction === -1)
                || (index === this._layer.length - 1 && this._direction === 1))
            {
                this._direction = this._direction * -1;
            }

            this._layer[index + this._direction] = SENSOR;
        }
    }

    print ()
    {
        console.log(this._layer);
    }

    checkOn(index)
    {
        return this._layer[index] === SENSOR;
    }

    get size ()
    {
        return this._layer.length;
    }
}