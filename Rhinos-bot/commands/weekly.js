const ms = require('ms')
exports.run = async (client, message, args) => {
  const prefix = message.guild === null ? 'r!' : client.getSettings(message.guild.id).prefix

  client.cooldown.ensure(`${message.author.id}`, {
    member: message.author.id,
    weeklybonus: 0,
    rep: 0
  })
  
  const cooldown = client.cooldown.get(message.author.id, 'weeklybonus')
  
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+7)+'-'+today.getDate();
  
  if (cooldown === date) return message.channel.send(`You have already collected your weekly bonus this week!`)
  
  client.cooldown.set(`${message.author.id}`, date, 'weeklybonus') // Activate 24 hour cooldown
  

  
  client.money.ensure(`${message.author.id}`, {
    member: message.author.id,
    money: 0
  })

  const money = client.money.get(message.author.id, 'money')
  client.money.set(`${message.author.id}`, money + 15000, 'money')
  message.channel.send(`You claimed your weekly bonus of \`$${15000}\`.`)
}


exports.conf = {
  enabled: true,
  aliases: ['wclaim', 'wbonus', 'weeklybonus'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'weekly',
  category: 'Economy',
  description: 'Claim your weekly bonus every week.',
  usage: 'weekly'
}
