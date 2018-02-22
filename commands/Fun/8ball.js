const responses = [
    'Pas clair, demandez plus tard',
    'Bientôt',
    'Yes',
    'Absolument!',
    'Jamais',
    'Magic 8-ball est actuellement indisponible, s\'il vous plaît laissez un message après la tonalité. \\*beep\\*',
    'Quand tu es prêt',
    'Espérons',
    'Heureusement non',
    'A sens le shlague ouais !',
    'Quel genre de question est-ce que ?',
    'Sur mon cadavre !',
    'Suremment pas ',
    'Haha, blague drôle'
];

function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît spécifier quelque chose à demander a la magie 8-ball!';
    }

    let response = randomItem(responses);

    const query = args.join(' ');

    if (query.indexOf('ipodtouch0218') > -1 || query.indexOf('233360087979130882') > -1) {
        response = 'HAH';
    }

    msg.edit(`${query} :8ball: | **${response}**`);
};


exports.info = {
    name: '8ball',
    usage: '8ball <question>',
    description: 'Demande à la magic 8-ball une question'
};
