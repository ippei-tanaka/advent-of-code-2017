export const countSteps = (offsets) =>
{
    const clonedOffsets = offsets.slice(0);
    const length = clonedOffsets.length;
    let currentIndex = 0;
    let steps = 0;
    for (;;)
    {
        const instruction = clonedOffsets[currentIndex];
        if (instruction >= 3) {
            clonedOffsets[currentIndex] = instruction - 1;
        } else {
            clonedOffsets[currentIndex] = instruction + 1;
        }
        currentIndex = currentIndex + instruction;
        steps = steps + 1;
        if (currentIndex < 0 || length <= currentIndex)
        {
            break;
        }
    }
    //console.log(clonedOffsets);
    return steps;
};