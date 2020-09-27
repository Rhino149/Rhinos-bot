const ms = require('ms')
const humanizeDuration = require('humanize-duration');
exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? 'r!' : client.getSettings(message.guild.id).prefix

  client.cooldown.ensure(`${message.author.id}`, {
    member: message.author.id,
    dailbonusy: 0,
    rep: 0
  })
  
  const cooldown = client.cooldown.get(message.author.id, 'dailybonus')
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const remaining = (today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate()+1))
  if (cooldown === date) return message.channel.send(`You have already collected your daily bonus today! Wait until ${remaining}`)
  
  client.cooldown.set(`${message.author.id}`, date, 'dailybonus') // Activate 24 hour cooldown
  
  client.money.ensure(`${message.author.id}`, {
    member: message.author.id,
    money: 0
  })

  const money = client.money.get(message.author.id, 'money')
  client.money.set(`${message.author.id}`, money + 5000, 'money')
  message.channel.send(`You claimed your daily bonus of \`$${5000}\`.`)
}

exports.conf = {
  enabled: true,
  aliases: ['claim', 'bonus', 'dailybonus'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'daily',
  category: 'Economy',
  description: 'Claim your daily bonus every 24 hours.',
  usage: 'daily'
}
