const snekfetch = require('snekfetch')

exports.run = async (bot, msg) => {
  if (msg.mentions.users.size < 1) {
    return msg.error('@mention Quelqu\'un pour kiss!')
  }

  const res = await snekfetch.get('https://nekos.life/api/kiss').set('Key', 'dnZ4fFJbjtch56pNbfrZeSRfgWqdPDgf')

  return msg.edit(`**:revolving_hearts: Kiss ${msg.mentions.users.first()}\u2026** ${res.body.url}`)
}

exports.info = {
  name: 'kiss',
  usage: 'kiss <user>',
  description: 'fait un kiss a quelqu\'un (en utilisant le baiser aléatoire GIF)'
}