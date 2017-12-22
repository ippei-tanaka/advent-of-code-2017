export const countPixels = (pattern, rules, iteration) =>
{
    rules = rules.trim().split('\n').map(line => {
        const result = line.replace(/\s/g, "").split('=>');
        return {
            match: result[0],
            output: result[1]
        }
    });

    const conversionRules = [];
    for (let i = 0; i < rules.length; i++)
    {
        const {match, output} = rules[i];
        const matches = getSetOfPatterns(extractPatternToArray(match));

        conversionRules.push({
            matches,
            output: extractPatternToArray(output)
        });
    }

    let temp = pattern.trim().split('\n').map(line => line.split(''));

    for (let counter = 0; counter < iteration; counter++)
    {
        temp = enhanceArray(temp, (partial) => {
            const pattern = flattenArrayToPattern(partial);
            const matchedRule = conversionRules.find(rule => rule.matches.has(pattern));
            if (matchedRule)
            {
                return matchedRule.output;
            }
            throw new Error("Can't enhance the array");
        });
    }

    return temp.reduce((memo1, r) => memo1 + r.reduce((memo2, i) => memo2 + (i === "#" ? 1 : 0), 0), 0);
};


export const enhanceArray = (array, func) =>
{
    const size = array.length;
    const unitSize = size % 2 === 0 ? 2 : 3;
    const newUnitSize = unitSize + 1;
    const newSize = size / unitSize * newUnitSize;

    let newArray = createTwoDimensionalArray(newSize);

    for (let y = 0; y < size; y = y + unitSize)
    {
        for (let x = 0; x < size; x = x + unitSize)
        {
            const partial = createTwoDimensionalArray(unitSize);

            for (let y2 = 0; y2 < unitSize; y2++)
            {
                for (let x2 = 0; x2 < unitSize; x2++)
                {
                    partial[y2][x2] = array[y + y2][x + x2];
                }
            }
            const newPartial = func(partial, x, y);

            newArray = margeArrays(newArray, newPartial, x / unitSize * newUnitSize, y / unitSize * newUnitSize);
        }
    }

    return newArray;
};

const createTwoDimensionalArray = (size) =>
{
    const array = [];

    for (let y = 0; y < size; y++)
    {
        array[y] = [];

        for (let x = 0; x < size; x++)
        {
            array[y][x] = null;
        }
    }

    return array;
};

export const margeArrays = (array1, array2, x, y) =>
{
    for (let _y = 0; _y < array2.length; _y++)
    {
        const row = array2[_y];
        for (let _x = 0; _x < row.length; _x++)
        {
            array1[_y + y][_x + x] = row[_x];
        }
    }

    return array1;
};

const getSetOfPatterns = (array) =>
{
    const newSet = new Set();
    if (array.length === 2)
    {
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 0)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 1)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 2)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 3)));
        return newSet;
    }
    else if (array.length === 3)
    {
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 0)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 1)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 2)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, array, 3)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, flipHorizontally(array), 0)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, flipHorizontally(array), 1)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, flipHorizontally(array), 2)));
        newSet.add(flattenArrayToPattern(repeatFunc(rotateClockwise, flipHorizontally(array), 3)));
        return newSet;
    }
    throw new RangeError("The array needs to be 2 x 2 or 3 x 3 for listing up patterns.");
};

const flattenArrayToPattern = (array) =>
{
    return array.reduce((memory, item) => { return memory.concat(item.join('')) }, []).join('/');
};

const extractPatternToArray = (pattern) =>
{
    return pattern.split('/').map(c => c.split(''));
};

const repeatFunc = (func, arg, times) =>
{
    let temp = arg;

    for (let i = 0; i < times; i++)
    {
        temp = func(temp);
    }

    return temp;
};

export const rotateClockwise = (array) =>
{
    if (array.length === 2)
    {
        const newArray = [[],[]];
        newArray[0][1] = array[0][0];
        newArray[1][1] = array[0][1];
        newArray[1][0] = array[1][1];
        newArray[0][0] = array[1][0];
        return newArray;
    } else if (array.length === 3)
    {
        const newArray = [[],[],[]];
        newArray[0][0] = array[2][0];
        newArray[0][1] = array[1][0];
        newArray[0][2] = array[0][0];
        newArray[1][0] = array[2][1];
        newArray[1][1] = array[1][1];
        newArray[1][2] = array[0][1];
        newArray[2][0] = array[2][2];
        newArray[2][1] = array[1][2];
        newArray[2][2] = array[0][2];
        return newArray;
    }
    throw new RangeError("The array needs to be 2 x 2 or 3 x 3, to be rotated.");
};

export const flipHorizontally = (array) =>
{
    if (array.length === 2)
    {
        const newArray = [[],[]];
        newArray[0][0] = array[0][1];
        newArray[0][1] = array[0][0];
        newArray[1][0] = array[1][1];
        newArray[1][1] = array[1][0];
        return newArray;
    } else if (array.length === 3)
    {
        const newArray = [[],[],[]];
        newArray[0][2] = array[0][0];
        newArray[0][0] = array[0][2];
        newArray[1][2] = array[1][0];
        newArray[1][0] = array[1][2];
        newArray[2][2] = array[2][0];
        newArray[2][0] = array[2][2];
        newArray[0][1] = array[0][1];
        newArray[1][1] = array[1][1];
        newArray[2][1] = array[2][1];
        return newArray;
    }
    throw new RangeError("The array needs to be 2 x 2 or 3 x 3, to be flipped.");
};