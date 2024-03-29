exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît fournir un emoji pour recueillir des informations sur !';
    }

    if (args[0].charCodeAt(0) >= 55296) {
        msg.delete();

        return (await msg.channel.send({
            embed: bot.utils.embed(args[0], 'Built-in **Discord** emoji.')
        })).delete(15000);
    }

    const match = args[0].match(/<:[a-zA-Z0-9_-]+:(\d{18})>/);

    if (!match || !match[1]) {
        throw 'S\'il vous plaît fournir un emoji valide!';
    }

    const emoji = bot.emojis.get(match[1]);

    if (!emoji) {
        throw 'Cet emoji n\'a pas pu être identifié.';
    }

    msg.delete();
    (await msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: 'Name',
                value: emoji.name
            },
            {
                name: 'From Guild',
                value: emoji.guild.name
            },
            {
                name: 'ID',
                value: emoji.id
            },
            {
                name: 'Download URL',
                value: emoji.url
            }
        ], { thumbnail: emoji.url })
    })).delete(15000);
};

exports.info = {
    name: 'emoji',
    usage: 'emoji <emoji>',
    description: 'Affiche des informations sur un emoji'
};
