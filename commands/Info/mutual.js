const limitTo = (array, max, joiner) => array.slice(0, max).join(joiner) + (array.length <= max ? '' : '...');

const inGuild = (guild, user) => !!guild.members.find('id', user.id);

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'Veuillez indiquer le nom du serveur Discord dans lequel vous vous trouvez.';
    }

    const query = args.join(' ').toLowerCase();
    // Try to parse by Server Name fist or Server ID
    const guild = bot.guilds.find(guild => guild.name.toLowerCase() === query || guild.id === query);

    if (!guild) {
        throw 'Cette guilde n\'a pas pu être trouvée!';
    }

    const mutual = bot.users.filter(user => inGuild(msg.guild, user) && inGuild(guild, user));

    await msg.edit(':arrows_counterclockwise: Searching...');

    const { url } = await bot.utils.gistUpload(mutual.map(user => `- ${user.tag}`).join('\n'), 'txt');

    msg.delete();
    (await msg.channel.send({
        embed: bot.utils.embed(`Mutual members of ${guild.name}`, limitTo(mutual.array().map(user => user.tag), 25, ', '), [
            {
                name: 'Full List',
                value: url
            }
        ])
    })).delete(30000);
};

exports.info = {
    name: 'mutual',
    usage: 'mutual <server>',
    description: 'Trouve les utilisateurs d\'un serveur donné dans lequel vous êtes'
};
