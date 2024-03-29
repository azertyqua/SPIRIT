exports.run = (bot, msg, args) => {
    let parsed = bot.utils.parseArgs(args, 'd:');

    if (parsed.leftover.length < 1) {
        throw 'S\'il vous plaît fournir quelques emojis à utiliser!';
    }

    let frames = parsed.leftover;
    let content = frames.join(' ');

    if (content.indexOf('|') > -1) {
        frames = content.split('|');
    }

    let delay = isNaN(parsed.options.d) ? 250 : parsed.options.d;

    bot.utils.playAnimation(msg, delay, frames);
};

exports.info = {
    name: 'anim',
    usage: 'anim [-d <delay>] <emoji> [emoji2] [...]',
    description: '"Anime" une série d\'emojis'
};
