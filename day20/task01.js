export const getClosestToCenter = (input) =>
{
    const particles = input.trim().split('\n').map(line => {
        const matches = line
            .replace(/\s/g, "")
            .match(/^p=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>,v=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>,a=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>$/);
        return new Particle(...matches.slice(1));
    });

    const sumOfDistances = [];

    for (let i = 0; i < particles.length; i++)
    {
        sumOfDistances[i] = 0;
    }

    for (let i = 1; i <= 100000; i++)
    {
        for (let j = 0; j < particles.length; j++)
        {
            const particle = particles[j];
            sumOfDistances[j] += particle.getDistanceFrom(0, 0, 0);
            particle.update();
        }
    }

    return sumOfDistances.indexOf(Math.min(...sumOfDistances));
};

class Particle
{
    constructor (pX, pY, pZ, vX, vY, vZ, aX, aY, aZ)
    {
        this._pX = Number.parseInt(pX);
        this._pY = Number.parseInt(pY);
        this._pZ = Number.parseInt(pZ);
        this._vX = Number.parseInt(vX);
        this._vY = Number.parseInt(vY);
        this._vZ = Number.parseInt(vZ);
        this._aX = Number.parseInt(aX);
        this._aY = Number.parseInt(aY);
        this._aZ = Number.parseInt(aZ);
    }

    update ()
    {
        this._vX += this._aX;
        this._vY += this._aY;
        this._vZ += this._aZ;
        this._pX += this._vX;
        this._pY += this._vY;
        this._pZ += this._vZ;
    }

    getDistanceFrom (x, y, z)
    {
        return Math.abs(this._pX - x) + Math.abs(this._pY - y) + Math.abs(this._pZ - z);
    }
}