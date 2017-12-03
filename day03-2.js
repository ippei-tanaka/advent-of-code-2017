class TwoDimensionalArray {

    constructor () {
        this._items = Object.create(null);
    }

    get (x, y)
    {
        let row = this._items[y];

        if (typeof row === 'undefined')
        {
            row = Object.create(null);
            this._items[y] = row;
        }

        const value = row[x];

        return value ? value : 0;
    }

    set (x, y, value)
    {
        let row = this._items[y];

        if (typeof row === 'undefined')
        {
            row = Object.create(null);
            this._items[y] = row;
        }

        row[x] = value;
    }

    getSumAround (x, y)
    {
        return this.get(x - 1, y - 1)
            +  this.get(x, y - 1)
            +  this.get(x + 1, y - 1)
            +  this.get(x - 1, y)
            +  this.get(x + 1, y)
            +  this.get(x - 1, y + 1)
            +  this.get(x, y + 1)
            +  this.get(x + 1, y + 1);
    }
}

const getFirstValueInSpiralArrayLargerThan = (inputNumber) =>
{
    const array = new TwoDimensionalArray();

    array.set(0, 0, 1);

    let location = {x: 0, y: 0};
    let lengthOfSide = 1;
    let counterOfStepsWithinSide = 0;
    let counterOfSide = 0;
    let direction = {x: 1, y: 0};

    //let num = 1;

    for (;;)
    {
        counterOfStepsWithinSide = counterOfStepsWithinSide + 1;
        location.x = location.x + direction.x;
        location.y = location.y + direction.y;

        const value = array.getSumAround(location.x, location.y);

        array.set(location.x, location.y, value);

        console.log(`${value} - x:${location.x} y:${location.y}`);

        if (value > inputNumber)
        {
            return value;
        }

        if (counterOfStepsWithinSide === lengthOfSide)
        {
            counterOfStepsWithinSide = 0;

            if (direction.x === 1)
            {
                direction.x = 0;
                direction.y = -1;
            } else if (direction.y === -1)
            {
                direction.x = -1;
                direction.y = 0;
            } else if (direction.x === -1)
            {
                direction.x = 0;
                direction.y = 1;
            } else if (direction.y === 1)
            {
                direction.x = 1;
                direction.y = 0;
            }

            counterOfSide = counterOfSide + 1;
        }

        if (counterOfSide === 2)
        {
            counterOfSide = 0;
            lengthOfSide = lengthOfSide + 1;
        }
    }

};

const input = 325489;
//const input = 23;

console.log(getFirstValueInSpiralArrayLargerThan(input));