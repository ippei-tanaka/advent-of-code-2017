`
set b 65
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000

set f 1       f = 1
set d 2       d = 2
set e 2       e = 2
set g d
mul g e
sub g b
jnz g 2       d * e === b, f = 0
set f 0
sub e -1      e++
set g e
sub g b
jnz g -8  *   e === b, pass
sub d -1      d++
set g d
sub g b
jnz g -13 *   d === b, pass
jnz f 2       f === 0, h++
sub h -1
set g b
sub g c
jnz g 2       b === c, end
jnz 1 3
sub b -17    b += 17
jnz 1 -23 *
`

export const getValueOfH = () =>
{
    let {b,c,d,e,f,h} = { b: 106500, c: 123500, d: 0, e: 0, f: 0, g: 0, h: 0 };
    //let {b,c,d,e,f,h} = { b: 65, c: 65, d: 0, e: 0, f: 0, g: 0, h: 0 };

    for (;;)
    {
        f = 1;
        d = 2;

        if (isPrimeNumber(b))
        {
            e = b;
            d = b;
        } else {
            for (;;)
            {
                e = 2;

                for (;;)
                {
                    if (d * e === b)
                    {
                        f = 0;
                        e = b;
                        break;
                    }

                    e += 1;

                    if (e === b)
                    {
                        e = b;
                        break;
                    }
                }

                if (f === 0)
                {
                    d = b;
                    break;
                }

                d += 1;

                if (d === b)
                {
                    d = b;
                    break;
                }
            }
        }

        if (f === 0)
        {
            h += 1;
        }

        if (b === c)
        {
            break;
        }

        b += 17;
    }

    return h;
};

const isPrimeNumber = (number) =>
{
    let half = Math.ceil(number / 2);
    for(let i = 2; i < half; i++)
    {
        if(number % i === 0)
        {
            return false;
        }
    }
    return true;
};