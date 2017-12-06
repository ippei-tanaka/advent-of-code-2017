export const countRedistributions = (memoryBanks) =>
{
    let counter = 0;
    const history = [memoryBanks];

    for (;;)
    {
        const latestStateOfMemoryBank = history[history.length - 1];
        //console.log(latestStateOfMemoryBank);
        const newStateOfMemoryBank = getMemoryBanksRedistributed(latestStateOfMemoryBank);
        //console.log(newStateOfMemoryBank);
        counter = counter + 1;
        const duplicatedMemoryBank = history.find(state =>
            compareMemoryBanks(newStateOfMemoryBank, state));
        history.push(newStateOfMemoryBank);
        //console.log(duplicatedMemoryBank);
        if (duplicatedMemoryBank)
        {
            break;
        }
    }

    //console.log(history);

    return counter;
};

const getMemoryBanksRedistributed = (memoryBanks) =>
{
    const _memoryBanks = memoryBanks.slice(0);
    const size = _memoryBanks.length;
    let numberOfBlocks = Math.max(..._memoryBanks);
    let index = _memoryBanks.indexOf(numberOfBlocks);

    _memoryBanks[index] = 0;

    for (;;)
    {
        index = (index + 1) % size;
        _memoryBanks[index] += 1;
        numberOfBlocks = numberOfBlocks - 1;

        if(numberOfBlocks <= 0) {
            break;
        }
    }

    return _memoryBanks;
};

const compareMemoryBanks = (memoryBanks1, memoryBanks2) =>
{
    const length = memoryBanks1.length;

    for (let i = 0; i < length; i++)
    {
        if (memoryBanks1[i] !== memoryBanks2[i])
        {
            return false;
        }
    }

    return true;
};