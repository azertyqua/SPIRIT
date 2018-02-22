exports.run = function(bot, msg, args) {
    if (args.length === 0) {
        throw 'Vous devez entrer le texte à transformer.';
    }
    msg.edit(args.map(arg => arg[0].toUpperCase() + arg.slice(1).toLowerCase()).join(' '));
};

exports.info = {
    name: 'initial',
    usage: 'initial <text>',
    description: 'Transforme le texte que vous entrez en majuscules initiales'
};
