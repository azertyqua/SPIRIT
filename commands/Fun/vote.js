const got = require('got');
const cheerio = require('cheerio');

exports.run = async (bot, msg, args) => {
    if (args.length < 1) {
        throw 'S\'il vous plaît ecrire un texte pour voté.';
    }

    const username = args[0];
    const sayMessage = args.join(" ");
        msg.delete().catch(O_o=>{}); 
    let user = msg.mentions.users.first(); 

    msg.delete();
    return msg.channel.send({
        embed: bot.utils.embed('', '', [
            {
                name: `${msg.author.username}`,
                value: `${sayMessage}`
            }
        ], { thumbnail: `${msg.author.avatarURL}` })
    })
  (async function() {
      
       const mainMessage = await msg.channel.send(`Vote lancé par : ${msg.author}`);
    
      await mainMessage.react("💪");
      await mainMessage.react("👌🏾");
      await mainMessage.react("☑");
      await mainMessage.react("⛔");
      await mainMessage.react("☠");
      
      
      
     
       }());
      };




exports.info = {
    name: 'vote',
    usage: 'vote <user>',
    description: 'lance un vote'
};
