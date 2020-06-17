const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const embed = new Discord.RichEmbed()
    .setTitle('💰 Donating')
    .setColor("RANDOM")
    .setThumbnail('https://cdn.discordapp.com/avatars/338129130237198336/28bb63970ec115aaba13b1c12d2ac544.png?size=2048')
    .addField('Want possible exclusive donator perks and more bot features?', '[Click here to donate.](https://www.patreon.com/user?u=35801431)')
    .addField('Donator Perks', '💰 `$50000`\n💼 `Donator role` in the Discord Server\n🎉 Access to the exclusive `donator lounge`\n🎨 Free `colored role` of your choice')

  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  aliases: ['donating'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'donate',
  category: 'Fun',
  description: 'Shows information about donating.',
  usage: 'donate'
}
