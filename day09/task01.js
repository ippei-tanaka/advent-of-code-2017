export const getScoreOf = (input) =>
{
    return countScoreOf(parse(input.trim()));
};

const parse = (string) =>
{
    //console.log(string);
    const exclamationIgnored = string.replace(/!./g, "");
    //console.log(exclamationIgnored);

    const htmlTagIgnored = exclamationIgnored.replace(/<[^>]*>,?/g, "");
    //console.log(htmlTagIgnored);

    //const nonBracketIgnored = htmlTagIgnored.replace(/[^{},]/g, "");
    //console.log(nonBracketIgnored);

    const extraCommaIgnored = htmlTagIgnored.replace(/},{/g, "}@{").replace(/,/g, "").replace(/}@{/g, "},{");
    //console.log(extraCommaIgnored);

    const bracketReplaced = extraCommaIgnored.replace(/{/g, "[").replace(/}/g, "]");
    //console.log(bracketReplaced);

    return JSON.parse(bracketReplaced);
};

const countScoreOf = (group, containerScore = 0) =>
{
    let scoreOfChildren = 0;
    let scoreOfSelf = containerScore + 1;

    for (let child of group)
    {
        scoreOfChildren = scoreOfChildren + countScoreOf(child, scoreOfSelf);
    }

    return scoreOfChildren + scoreOfSelf;
};