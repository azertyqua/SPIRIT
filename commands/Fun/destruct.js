exports.run = async (bot, msg, args) => {

    const parsedArgs = bot.utils.parseArgs(args, ['d:', 's:']);

    if (parsedArgs.leftover.length < 1) {
        throw 'S\'il vous plaît fournir un message secret';
    }

    let message = parsedArgs.leftover.join(' ');
    let delay = isNaN(parsedArgs.options.d) ? 5000 : parseInt(parsedArgs.options.d);
    delay = (delay < 100) ? 100 : delay;
    const style = (typeof parsedArgs.options.s === 'string') ? parsedArgs.options.s : 'plain';

    msg.delete();

    switch (style) {
    case 'embed':
        message = {
            embed: bot.utils.embed(
                `Ce message s'auto-détruit dans ${delay / 1000} seconds.`,
                message,
                [],
                {
                    inline: true,
                    footer: 'Secret Message'
                }
            )
        };
        break;
    case 'inline':
        message = `*Ce message s'auto-détruit dans ${delay / 1000} seconds.*\n${message}`;
        break;
    case 'code':
        message = `*Ce message s'auto-détruit dans ${delay / 1000} seconds.*\n\`\`\`${message}\`\`\``;
        break;
    }

    (await msg.channel.send(message)).delete(delay);
};


exports.info = {
    name: 'destruct',
    usage: 'destruct [-d delay in ms]  [-s <embed|inline|code|plain>] <message>',
    description: 'crée un message d\'auto-destruction',
    options: [
        {
            name: '-d',
            usage: '-d <delay in ms>',
            description: 'Définit l\'heure (en ms) pour le message à supprimer. (Default: 5 seconds)'
        },
        {
            name: '-s',
            usage: '-s <embed|inline|code|plain>',
            description: 'Définit le style du message (default: plain)'
        }
    ],
 // Doxylamin#4539
};
