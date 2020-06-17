const Discord = require('discord.js')

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const member = message.mentions.members.first() ? message.mentions.members.first() : message.member
  let target = message.mentions.users.first() || message.author
  
  client.reputation.ensure(`${member.id}`, {
    member: member.id,
    reputation: 0
  })
  client.money.ensure(`${member.id}`, {
    member: member.id,
    money: 0,
    bank: 0
  })
  client.life.ensure(`${member.id}`, {
    member: member.id,
    spouse: 0
  })

  const married = client.life.get(member.id, 'spouse') === 0 ? 'nobody' : `<@${client.life.get(member.id, 'spouse')}>`
  const money = client.money.get(member.id, 'money')
const bank = client.money.get(member.id, 'bank')
  const rep = client.reputation.get(`${member.id}`, 'reputation')

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`${member.displayName}`)
  .setThumbnail(member.user.displayAvatarURL)
  .addField(`${member.displayName}'s Wallet:`, `$${money}`, inline = true)
  .addField(`${member.displayName}'s Bank:`, `$${bank}`, inline = true)
  .addField("Reputation", `${member.displayName} has ${rep} rep.`, inline = false)
  .addField(`${member.displayName}'s is married to`, married)
  .setFooter(`More things will be added to profile suggest them in my support server https://discord.gg/sSevHSK`)
    message.channel.send(embed);
  };

exports.conf = {
  enabled: true,
  aliases: ['p'],
  guildOnly: true,
  permLevel: 'member'
}

exports.help = {
  name: 'profile',
  category: 'Economy',
  description: 'Shows yours or [member]\'s profile.',
  usage: 'profile [member]'
}
