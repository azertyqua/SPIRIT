exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        throw 'S\'il vous plaît fournir un emoji pour agrandir.';
    }

    if (args[0].charCodeAt(0) >= 55296) {
        throw 'Impossible d\'agrandir les emoji intégrées a discord.';
    }

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

    if (!match || !match[1]) {
        throw 'S\'il vous plaît fournir un emoji valide.';
    }

    const emoji = bot.emojis.get(match[1]);

    if (!emoji) {
        throw 'Cet emoji n\'a pas pu être identifié !';
    }

    msg.delete();
    msg.channel.send({
        files: [
            emoji.url
        ]
    });
};

exports.info = {
    name: 'jumbo',
    usage: 'jumbo <emoji>',
    description: 'Agrandit les emojis !'
};
