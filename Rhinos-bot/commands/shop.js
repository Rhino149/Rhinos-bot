const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const prefix = client.getSettings(message.guild.id).prefix
  
  const embed = new Discord.MessageEmbed()
    .setTitle('🛒 Shop')
    .setDescription(`To purchase an item, type \`${prefix}buy <item>\``)
    .setColor("RANDOM")
    .addField('💍 Wedding Ring\n(Buy Price: $15000)\n(Sell Price: $5000', `Used to propose to your partner via \`${prefix}marry\`.`, true)
    .addField('🥫 Pet Food \n(Buy Price: $75)\n (Sell Price: $25)', `Used to feed your \`${prefix}pet\`.`, true)
    .addField('🌰 Seed (Buy Price: $15) (Sell Price: $5)', `Random seed to plant in your \`${prefix}garden\`.`, true)
    .addField('🚗 Car \n(Buy Price: $25,000)\n (Sell Price: $8333)', `Go fast.`, true)
    .addField('Stone \n(Buy price: $3) \n(Sell Price: $1)', 'Have a stone I guess.', true)
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL())
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
