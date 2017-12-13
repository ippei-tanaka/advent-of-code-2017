export const getNumberOfConnectedPrograms = (input) =>
{
    const definitions = input.trim().split("\n").map(parseDefinition);
    const TARGET = 0;
    const connected = [TARGET];
    let lastLength = null;

    while (lastLength !== connected.length)
    {
        lastLength = connected.length;

        for (let definition of definitions)
        {
            const {ID, connectedPrograms} = definition;

            if (connected.indexOf(ID) !== -1)
            {
                continue;
            }

            if (typeof connectedPrograms.find(id => connected.indexOf(id) !== -1) !== 'undefined')
            {
                connected.push(ID);
            }
        }
    }

    return connected.length;
};

const parseDefinition = (str) =>
{
    const result = str.trim().split('<->').map(s => s.trim());
    const ID = Number.parseInt(result[0]);
    const connectedPrograms = result[1].split(',').map(s => Number.parseInt(s.trim()));
    return {ID, connectedPrograms}
};