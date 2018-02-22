const got = require('got');
const cheerio = require('cheerio');

exports.run = (bot, msg) => {
const prefix = bot.config.prefix;


         
      if(msg.channel.type === "dm") return;
      
      //if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR")){return msg.reply("**:x: Vous n'avez pas la permission Administrateur").catch(console.error);
      
      
      
      let args = msg.content.split(' ');
      let time = args[1];
      let timeofreminder = msg.content.slice(2, args.length);
      
      function reminder (remind, toRemind) {
      
      if(!time){
      msg.channel.send(`**:x: Erreur format, Correcte usage: ${bot.config.prefix} reminder <time en secondes !> <votre reminder>**`);
      }else{
      if(msg.content.includes("reminder stop")){
      
      setInterval(function() {
      
      msg.edit('**\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n**');
      process.exit(42);
      }, (time * 1000));
      msg.channel.send("**\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n**");
      }else{
      
      setInterval(function() {
      
      msg.channel.send(msg.content.slice(msg.content.indexOf(msg.content.split(" ")[2])));
      }, (time * 1000));
      
      msg.channel.send("**\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n**");
        msg.delete().catch(O_o=>{});
      }
      }
      }
      reminder(time, timeofreminder);
      };
      
      
      
   exports.info = {
    name: 'reminder',
    usage: 'reminder',
    description: 'enregistrez des taches pour que le bot vous les rapelles'
};