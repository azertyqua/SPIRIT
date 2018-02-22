exports.run = function (bot, msg) {
    if (msg.mentions.users.size < 1) {
        throw '@mention certaines personnes à tirer !';
    }

    let output = msg.mentions.users.map(m => `**${m}** :gun:`).join('\n');

    msg.delete();
    msg.channel.send({
        embed: bot.utils.embed(`${bot.user.username} te met une balle dans le crâne !`, output)
    });
};

exports.info = {
    name: 'shoot',
    usage: 'shoot <user>',
    description: 'Tire sur son amie !'
};
