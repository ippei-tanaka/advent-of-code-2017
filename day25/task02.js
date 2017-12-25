export const getStrengthOfLongestBridge = (input) =>
{
    const components = input.trim().split('\n').map(item => item.trim().split('/').map(i => Number.parseInt(i)));
    const bluePrints = makeBridgesBluePrints(components);
    const bridges = extractBluePrints(bluePrints);
    const longestBridges = getLongestBridges(bridges);
    return calculateMaxStrengths(longestBridges);
};

const calculateMaxStrengths = (bridges) =>
{
    let max = 0;
    for (let bridge of bridges)
    {
        const strength = bridge.reduce((memo, component) => memo + component.reduce((m, c) => m + c, 0), 0);
        if (strength > max)
        {
            max = strength;
        }
    }
    return max;
};

const getLongestBridges = (bridges) =>
{
    let longestBridges = [];
    let longestLength = 0;
    for (let bridge of bridges)
    {
        const length = bridge.length;

        if (length === longestLength)
        {
            longestBridges.push(bridge);
        }
        else if (length > longestLength)
        {
            longestLength = length;
            longestBridges = [bridge];
        }

    }

    return longestBridges;
};

const extractBluePrints = (bluePrints) =>
{
    const bridges = [];

    for (let {component, children} of bluePrints)
    {
        bridges.push([component]);

        const childBridges = extractBluePrints(children);
        for (let childBridge of childBridges)
        {
            const bridge = [];
            bridge.push(component, ...childBridge);
            bridges.push(bridge);
        }
    }

    return bridges;
};

const makeBridgesBluePrints = (availableComponents, targetPort = 0) =>
{
    const bridges = [];

    for (let i = 0; i < availableComponents.length; i++)
    {
        const component = availableComponents[i];
        const indexOfPort = component.indexOf(targetPort);
        if (indexOfPort !== -1)
        {
            const _availableComponents = availableComponents.slice(0);
            _availableComponents.splice(i, 1);

            const newTargetPort = component[indexOfPort === 0 ? 1 : 0];

            bridges.push({
                component,
                children: makeBridgesBluePrints(_availableComponents, newTargetPort)
            });
        }
    }

    return bridges;
};