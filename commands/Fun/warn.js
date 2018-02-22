const got = require('got');
const cheerio = require('cheerio');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît @mention un utilisateur.';
    }

    const username = args[0];
    let reason = args.slice(1).join(' ');
    let user = msg.mentions.users.first(); 

    msg.delete();
    return msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: 'Action',
                value: `Warning`
            },
            {
                name: 'Utilisateur Warn',
                value: username
            },
            {
                name: 'Raison',
                value: `${reason}`
            },
            {
                name: '-------------------------',
                value: `WARN effectué par :`
            },
            {
                name: 'Administrateur',
                value: `${msg.author.username}`
            }
        ], { thumbnail: `${msg.guild.iconURL}` })
    });
};



exports.info = {
    name: 'warn',
    usage: 'warn <user>',
    description: 'warn un utilisateur'
};
