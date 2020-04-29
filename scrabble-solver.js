var prompt = require('prompt');
var scrabble = require('scrabble');

const sortByLength = (a, b) => {
    return b.length - a.length;
};

prompt.start();

prompt.get(['letters', 'startsWith', 'endsWith', 'mustInclude'], function (
    err,
    result
) {
    console.log('Finding combinations...');
    const { letters, startsWith, endsWith, mustInclude } = result;
    let directMatches = new Set(
        scrabble(letters).filter(
            (word) =>
                word.length > 2 &&
                word.startsWith(startsWith || '') &&
                word.endsWith(endsWith || '') &&
                word.includes(mustInclude || '')
        )
    );

    let otherMatches = new Set(directMatches);

    for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
        const results = scrabble(letters.concat(String.fromCharCode(i)));
        results.forEach((item) => {
            if (
                item.length > 2 &&
                item.startsWith(startsWith || '') &&
                item.endsWith(endsWith || '') &&
                item.includes(mustInclude || '')
            ) {
                otherMatches.add(item);
            }
        });
    }

    directMatches = [...directMatches];
    directMatches.sort(sortByLength);

    otherMatches = [...otherMatches];
    otherMatches = otherMatches.filter((x) => !directMatches.includes(x));
    otherMatches.sort(sortByLength);

    console.log('\nDirect Matches:');
    console.log(directMatches);

    console.log('\nOther Matches:');
    console.log(otherMatches);
});
