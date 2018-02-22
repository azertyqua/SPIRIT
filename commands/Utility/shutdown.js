exports.run = async (bot, msg) => {
    await msg.edit(':wave: Éteindre. Bye!');
    process.exit(666);
};

exports.info = {
    name: 'shutdown',
    usage: 'shutdown',
    description: 'Ferme complètement le Bot'
};
