const got = require('got');
let templates = [];

got('https://memegen.link/templates/').then(res => {
    let data = JSON.parse(res.body);
    templates = [];
    let promises = [];
    for (let key in data) {
        promises.push(_loadMeme(data[key]));
    }

    Promise.all(promises).then(() => {
        templates = templates.filter(e => !!e);
        templates.sort((a, b) => a.name.localeCompare(b.name));
    }).catch(console.error);
}).catch(console.error);

function _loadMeme(url) {
    return got(url).then(res => {
        let singleData = JSON.parse(res.body);

        templates.push({
            name: url.replace(/https\:\/\/memegen\.link\/api\/templates\/(.*)/, '$1'),
            url: url.replace('/api/templates', ''),
            styles: singleData.styles
        });
    });
}

function getMeme(name) {
    return templates.find(m => m.name.toLowerCase() === name.toLowerCase());
}

function cleanInput(input) {
    if (!input) return '';
    return input.replace(/"/g, '\'\'').replace(/\#/g, '~h')
        .replace(/\-/g, '--').replace(/\_/g, '__')
        .replace(' ', '_').replace(/\?/g, '~q')
        .replace(/\%/g, '~p').replace(/\//g, '~s');
}

exports.run = async (bot, msg, args) => {
    if (templates.length < 1) {
        throw 'Les memes n\'ont pas encore été chargés!';
    }

    if (/^(h(elp)?|\?)$/i.test(args[0])) {
        return bot.commands.get('help').run(bot, msg, 'meme');
    }

    if (/^(ls|list|s(earch)?)$/i.test(args[0])) {
        msg.delete();
        return (await msg.channel.send({
            embed: bot.utils.embed('Memes disponibles', '*Ce message disparaîtra dans 30 secondes*\n\n' + templates.map(meme => `- \`${meme.name}\``).join('\n'))
        })).delete(30000);
    }

    if (/^(i(nf(o)?)?)$/i.test(args[0])) {
        if (args.length < 2) {
            throw 'Vous devez fournir un meme pour obtenir des informations sur !';
        }

        let info = getMeme(args[1]);
        if (!info) {
            throw `Ce n'est pas un meme valide! Faire \`${bot.config.prefix}${this.info.name} list\` voir les mèmes disponibles.`;
        }

        msg.delete();
        return (await msg.channel.send({
            embed: bot.utils.embed(`\`${info.name}\``, `Styles: ${info.styles && info.styles.length > 1 ? info.styles.map(s => `\n- \`${s}\``).join('') : 'None'}`)
        })).delete(15000);
    }

    let input = args.join(' ');
    let parts = input.split('|').map(p => p.trim());

    if (parts.length < 3) {
        throw `Aucun message n'a été fourni! Faire \`${bot.config.prefix}help ${this.info.name}\` pour plus d'informations sur l'utilisation.`;
    }

    let meme = getMeme(args[0]);
    if (!meme) {
        throw `Ce n'est pas un meme valide! Faire \`${bot.config.prefix}${this.info.name} list\`voir les mèmes disponibles.`;
    }

    let topText = cleanInput(parts[1]);
    let bottomText = cleanInput(parts[2]);

    if (!topText || !bottomText) {
        throw 'Empty message!';
    }

    let url = `${meme.url}/${cleanInput(parts[1])}/${cleanInput(parts[2])}.jpg`;
    if (parts[3]) url += `?alt=${encodeURIComponent(parts[3])}`;

    await msg.edit(':arrows_counterclockwise:');
    await msg.channel.send({
        files: [
            {
                attachment: url,
                name: parts[0] + '.jpg'
            }
        ]
    });

    msg.delete();
};

exports.info = {
    name: 'meme',
    usage: 'meme list | info <name> | [<name> | <line 1> | <line 2> | [style]]',
    examples: [
        'meme info sad-biden',
        'meme facepalm | please, oh please | rtfm',
        'meme sad-biden | sad joe biden | doesn\'t have discord | scowl'
    ]
};
