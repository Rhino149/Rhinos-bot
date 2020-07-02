const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = client.getSettings(message.guild.id).prefix
  
  const embed = new Discord.RichEmbed()
    .setTitle('🛒 Shop')
    .setDescription(`To purchase an item, type \`${prefix}buy <item>\``)
    .setColor("RANDOM")
    .addField('💍 Wedding Ring ($15000)', `Used to propose to your partner via \`${prefix}marry\`.`, true)
    .addField('🥫 Pet Food ($75)', `Used to feed your \`${prefix}pet\`.`, true)
    .addField('🌰 Seed ($15)', `Random seed to plant in your \`${prefix}garden\`.`, true)
    .addField('🚗 Car ($25,000)', `Go fast.`, true)
    .addField('Stone ($3)', 'Have a stone I guess.', true)
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['store'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'shop',
  category: 'Economy',
  description: 'Shows a list of purchasable items.',
  usage: 'shop'
}
