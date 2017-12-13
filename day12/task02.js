export const getNumberOfGroups = (input) =>
{
    const definitions = input.trim().split("\n").map(parseDefinition);
    //const targetID = 0;
    let identified = [];
    const groups = [];

    for (let i = 0; i < definitions.length; i++)
    {
        if (identified.indexOf(i) !== -1)
        {
            continue;
        }

        const group = getGroup(definitions, i);
        groups.push(group);
        identified = identified.concat(group);
    }

    //console.log(groups);

    return groups.length;
};

const getGroup = (definitions, targetID) =>
{
    const connected = [targetID];
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

    return connected;
};

const parseDefinition = (str) =>
{
    const result = str.trim().split('<->').map(s => s.trim());
    const ID = Number.parseInt(result[0]);
    const connectedPrograms = result[1].split(',').map(s => Number.parseInt(s.trim()));
    return {ID, connectedPrograms}
};