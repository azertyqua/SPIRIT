const randomizeCase = word => word.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join('');

exports.run = (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît fournir un texte à clapifier';
    }

    msg.edit(args.map(randomizeCase).join(':clap:'));
};

exports.info = {
    name: 'clap',
    usage: 'clap <text>',
    description: 'Clapifie votre texte'
};
