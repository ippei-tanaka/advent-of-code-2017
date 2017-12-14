import {generate} from './knot-hash-generator';

export const countRegions = (input) =>
{
    let result = "";

    for (let i = 0; i < 128; i++)
    {
        const hash = generate(`${input}-${i}`);
        let row = "";

        for (let j = 0; j < hash.length; j++)
        {
            const char = hash.charAt(j);
            const numberString = Number.parseInt(char, 16).toString(2);
            row += pan(numberString);
        }

        result += row;
    }

    let scanned = [];
    const regions = [];

    for (let i = 0; i < result.length; i++)
    {
        if (scanned.indexOf(i) === -1)
        {
            const region = getRegion(result, i);

            if (region.length > 0)
            {
                scanned = scanned.concat(region);
                regions.push(region);
            }
        }
    }
    // console.log(scanned.length);
    // console.log(1, regions[0]);
    // console.log(2, regions[1]);
    // console.log(3, regions[2]);
    // console.log(4, regions[3]);
    // console.log(5, regions[4]);
    // console.log(6, regions[5]);
    // console.log(7, regions[6]);
    // console.log(8 ,regions[7]);
    return regions.length;
};

export const pan = (str, length = 4) =>
{
    const room = length - str.length;
    for (let i = 0; i < room; i++)
    {
        str = '0' + str;
    }
    return str;
};

export const getRegion = (str, index, rowLength = 128, region = []) =>
{
    if (region.indexOf(index) === -1 && str.charAt(index) === '1')
    {
        const indexInRow = index % rowLength;

        region.push(index);

        if (indexInRow < rowLength - 1
            && region.indexOf(index + 1) === -1
            && str.charAt(index + 1) === '1')
        {
            getRegion(str, index + 1, rowLength, region);
        }

        if (0 < indexInRow
            && region.indexOf(index - 1) === -1
            && str.charAt(index - 1) === '1')
        {
            getRegion(str, index - 1, rowLength, region);
        }

        if (region.indexOf(index + rowLength) === -1 && str.charAt(index + rowLength) === '1')
        {
            getRegion(str, index + rowLength, rowLength, region);
        }

        if (region.indexOf(index - rowLength) === -1 && str.charAt(index - rowLength) === '1')
        {
            getRegion(str, index - rowLength, rowLength, region);
        }
    }

    return region.sort((a, b) => a - b);
};