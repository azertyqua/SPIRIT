const Roll = require('roll');
const roller = new Roll();

exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        throw 'Vous devez spécifier en notation de dés (XdY)';
    }

    let reason = '';
    let footer = '';

    footer += `:game_die: **${args[0]}**`;
    if (args.length > 1) {
        reason = args.splice(1).join(' ');
        footer += ` | ${reason}`;
    }

    let results = roller.roll(args[0]);

    msg.delete();

    let embed = bot.utils.embed(
        `Total: ${results.result}`,
        `${[].concat.apply([], results.rolled).join(', ').substr(0, 1800)}`,
        [
            {
                name: '\u200b',
                value: footer
            }
        ]
    );

    msg.channel.send({ embed });
};

exports.info = {
    name: 'roll',
    usage: 'roll XdY <reason>',
    description: 'roule X dés avec les côtés Y. Prend en charge la notation de dés standard'
};
