function makeCommand(name, displayName, methodName) {
    return {
        run: async (bot, msg, args) => {
            const parsed = bot.utils.parseArgs(args, 'r');

            if (parsed.leftover.length < 1) {
                throw 'Vous devez avoir quelque chose à télécharger!';
            }

            await msg.edit(':arrows_counterclockwise: Uploading...');
            const { url, rawUrl } = await bot.utils[methodName](parsed.leftover.join(' '));

            if (!url) {
                throw 'Impossible de télécharger, aucune clé n\'a été renvoyée!';
            }

            if (parsed.options.r) {
                msg.edit(`:white_check_mark: ${rawUrl}`);
            } else {
                msg.edit(`:white_check_mark: ${url}`);
            }
        },
        info: {
            name,
            usage: `${name} <text>`,
            description: `Uploads some text to ${displayName}`,
            options: [
                {
                    name: '-r',
                    description: 'Renvoie l\'URL d\'une version brute de votre téléchargement'
                }
            ]
        }
    };
}

module.exports = [
    makeCommand('haste', 'Hastebin', 'hastebinUpload'),
    makeCommand('gist', 'a GitHub Gist', 'gistUpload')
];
