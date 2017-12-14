export const generate = (inputs) =>
{
    const array = createArray(256);
    const lengths = finalizeLengths(inputs);
    //console.log(lengths);
    const sparseHash = createHashedArray(array, lengths, 64);
    //console.log(sparseHash);
    const denseHash = createDenseHash(sparseHash);
    //console.log(denseHash);

    return convertToHex(denseHash);
};

export const convertToHex = (numberArray) =>
{
    return numberArray.reduce((memo, num) => {
        const hex = Number(num).toString(16);
        return memo + (num < 16 ? "0" + hex : hex);
    }, '');
};

const createDenseHash = (sparseHash) =>
{
    const denseHash = new Array(sparseHash.length / 16);

    for (let i = 0; i < denseHash.length; i++)
    {
        const start = i * 16;
        const slice = sparseHash.slice(start, start + 16);
        denseHash[i] = calculateXORValue(slice);
    }

    return denseHash;
};

export const calculateXORValue = (numArray) =>
{
    return numArray.reduce((memo, num) => memo ^ num);
};

export const convertToASCIIs = (str) =>
{
    return Array.from(str).map(char => char.charCodeAt(0));
};

export const finalizeLengths = (input) =>
{
    return convertToASCIIs(input).concat([17, 31, 73, 47, 23]);
};

export const createHashedArray = (array, inputs, repeat = 1, skip = 0, position = 0) =>
{
    let _array = array;
    const length = _array.length;
    for (let input of inputs)
    {
        _array = _array.slice(0);

        if (input > 1)
        {
            const slicedArray = sliceArray(_array, position, (position + input - 1));
            const reversedArray = reverseArray(slicedArray);
            _array = mergeArrays(_array, reversedArray, position);
        }

        position = (position + input + skip) % length;
        skip = skip + 1;
    }

    repeat = repeat - 1;

    if (repeat > 0)
    {
        return createHashedArray(_array, inputs, repeat, skip, position);
    }

    return _array;
};

const createArray = (size) =>
{
    const array = new Array(size);

    for (let i = 0; i < size; i++)
    {
        array[i] = i;
    }

    return array;
};

const sliceArray = (array, start, end) =>
{
    if (start > end)
    {
        throw new Error(`start:${start} should be smaller than end:${end}`);
    }

    const sliceSize = end - start + 1;
    const slicedArray = new Array(sliceSize);
    const originalArrayLength = array.length;

    for (let i = 0; i < sliceSize; i++)
    {
        slicedArray[i] = array[(start + i) % originalArrayLength];
    }

    return slicedArray;
};

const reverseArray = (array) =>
{
    const length = array.length;
    const reversedArray = new Array(length);

    for (let i = 0; i < length; i++)
    {
        reversedArray[length - 1 - i] = array[i];
    }

    return reversedArray;
};

const mergeArrays = (array1, array2, start) =>
{
    const _array1 = array1.slice(0);
    const length = _array1.length;

    if (start > (length - 1))
    {
        throw new Error(`start:${start} should be smaller than ${length - 1}`);
    }

    let counter = 0;
    for (let item of array2)
    {
        _array1[(start + counter) % length] = item;
        counter = counter + 1;
    }

    return _array1;
};