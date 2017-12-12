export const getResultOfHash = (listSize, inputs) =>
{
    const array = createArray(listSize);
    const hashedArray = createHashedArray(array, inputs);
    return getMultiplicationOfFirstTwo(hashedArray);
};

export const createArray = (size) =>
{
    const array = new Array(size);

    for (let i = 0; i < size; i++)
    {
        array[i] = i;
    }

    return array;
};

export const createHashedArray = (array, inputs) =>
{
    let skip = 0;
    let position = 0;
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

    return _array;
};

export const sliceArray = (array, start, end) =>
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

export const reverseArray = (array) =>
{
    const length = array.length;
    const reversedArray = new Array(length);

    for (let i = 0; i < length; i++)
    {
        reversedArray[length - 1 - i] = array[i];
    }

    return reversedArray;
};

export const mergeArrays = (array1, array2, start) =>
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

export const getMultiplicationOfFirstTwo = (array) =>
{
    return array[0] * array[1];
};