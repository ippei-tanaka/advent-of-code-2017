export const countParticlesLeft = (input) =>
{
    const particles = input.trim().split('\n').map(line => {
        const matches = line
            .replace(/\s/g, "")
            .match(/^p=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>,v=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>,a=<([\-0-9]+),([\-0-9]+),([\-0-9]+)>$/);
        return new Particle(...matches.slice(1));
    });

    let _particles = particles.slice(0);

    for (let counter = 1; counter <= 100000; counter++)
    {
        const length = _particles.length;
        const idSet = new Set(_particles.map(p => p.getPositionId()));

        if (idSet.size === length)
        {
            for (let index = 0; index < _particles.length; index++)
            {
                _particles[index].update();
            }
            continue;
        }

        const collided = Object.create(null);

        for (let index1 = 0; index1 < length; index1++)
        {
            const particle1 = _particles[index1];

            for (let index2 = index1 + 1; index2 < length; index2++)
            {
                const particle2 = _particles[index2];

                if (particle1.getPositionId() === particle2.getPositionId())
                {
                    collided[index1] = true;
                    collided[index2] = true;
                }
            }
        }

        _particles = _particles.filter((p, index) => !collided[index]);

        for (let index = 0; index < _particles.length; index++)
        {
            _particles[index].update();
        }
    }

    return _particles.length;
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

    getPositionId ()
    {
        return this._pX + ',' + this._pY + ',' + this._pZ;
    }
}