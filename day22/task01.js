export const countInfections = (mapString, bursts) =>
{
    const map = new TwoDimensionalArray(mapString.trim().split('\n').map(line => line.trim().split('')));

    const currentPosition = {
        x: Math.floor(map.sizeX / 2),
        y: Math.floor(map.sizeY / 2)
    };

    let counter = 0;

    // console.log(map.display());

    let direction = {x: 0, y: -1};

    for (let i = 0; i < bursts; i++)
    {
        const currentNode = map.get(currentPosition);

        if (currentNode === "#")
        {
            direction = getNewDirection(direction, "right");
            map.set(currentPosition, '.');
        }
        else if (currentNode === ".")
        {
            direction = getNewDirection(direction, "left");
            map.set(currentPosition, '#');
            counter += 1;
        }
        else
        {
            throw new RangeError();
        }

        currentPosition.x += direction.x;
        currentPosition.y += direction.y;

        // console.log(map.display());
    }

    //
    // for (let {value} of map)
    // {
    //     if (value === "#")
    //     {
    //         counter += 1;
    //     }
    // }

    return counter;
};

const getNewDirection = ({x, y}, direction) =>
{
    if (direction === "left")
    {
        return {x: y, y: -x};
    }
    else if (direction === "right")
    {
        return {x: -y, y: x};
    }
    else
    {
        throw new RangeError();
    }
};

class TwoDimensionalArray
{
    constructor (array)
    {
        this._object = {};

        for (let y = 0; y < array.length; y++)
        {
            for (let x = 0; x < array[y].length; x++)
            {
                this.set({x, y}, array[y][x]);
            }
        }

        this._initialValue = '.';
    }

    get ({x, y})
    {
        if (!this._object[y])
        {
            this._object[y] = {};
        }

        if (!this._object[y][x])
        {
            this._object[y][x] = this._initialValue;
        }

        return this._object[y][x];
    }

    set ({x, y}, value)
    {
        if (!this._object[y])
        {
            this._object[y] = {};
        }

        this._object[y][x] = value;
    }

    get sizeX ()
    {
        return Object.keys(this._object[0]).length;
    }

    get sizeY ()
    {
        return Object.keys(this._object).length;
    }

    *[Symbol.iterator] ()
    {
        for (let y of Object.keys(this._object).sort(compareInts))
        {
            for (let x of Object.keys(this._object[y]).sort(compareInts))
            {
                yield {x, y, value: this.get({x, y})};
            }
        }
    }

    display ()
    {
        let string = "";
        for (let y of Object.keys(this._object).sort(compareInts))
        {
            for (let x of Object.keys(this._object[y]).sort(compareInts))
            {
                string += this.get({x, y});
            }

            string += "\n";
        }

        return string;
    }
}

const compareInts = (a, b) => Number.parseInt(a) - Number.parseInt(b);