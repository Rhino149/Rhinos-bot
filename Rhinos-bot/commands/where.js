const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { 
  if (!args[0]) return message.channel.send('You need to specify a channel ID')
  if (!client.channels.get(args[0])) return message.channel.send('Couldn\'t find a channel with that ID')
  const channel = client.channels.find(ch => ch.id === args[0])
  
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .addField(`Guild: `, channel.guild.name)
    .addField(`Channel: `, channel.name)
    .addField(`Guild Owner: `, channel.guild.owner)
    .setTimestamp();
  
  message.author.send(embed)
};

exports.conf = {
  enabled: true,
  aliases: ['whereis', 'whereisthatbloodyerrorcomingfrom???', 'source'],
  guildOnly: false,
  permLevel: 'Bot Support'
};

exports.help = {
  name: 'where',
  category: 'Developer',
  description: 'Shows you which Discord has <channel id> and the owner\'s ID',
  usage: 'where <channel id>'
}
