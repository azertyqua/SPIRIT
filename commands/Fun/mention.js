function hasRole(member, roleName) {
    return member.roles.map(role => role.name.toLowerCase()).indexOf(roleName.toLowerCase()) > -1;
}

exports.run = async (bot, msg, args) => {
    if (!msg.guild || !msg.guild.members) {
        throw 'Vous devez exécuter cette commande depuis un serveur.';
    }

    let members = msg.guild.members.array().sort((a, b) => a.user.username.localeCompare(b.user.username));

    if (args.length > 0) {
        members = members.filter(member => hasRole(member, args[0]));
    }

    if (members.length < 1) {
        throw 'Aucun membre n\'a pu être trouvé.';
    }

    msg.delete();

    let users = members.map(m => `${m.user}`);
    const body = users.join('\n');

    if (body.length < 2000) {
        (await msg.channel.send(body)
        ).delete(100000);
    } else {
        let raw = members.map(m => `${m.user.username}`).join('\n');

        //const { url } = await bot.utils.gistUpload(raw, 'txt');

        let trimmed = body.substr(0, 1500);
        trimmed = trimmed.slice(0, trimmed.lastIndexOf('\n'));

        msg.channel.send(('', [{ name: 'Full list' }])
        );
    }
};

exports.info = {
    name: 'mention',
    usage: 'mention [role]',
    description: 'mentionne tous les utilisateurs de votre serveur actuel'
};
