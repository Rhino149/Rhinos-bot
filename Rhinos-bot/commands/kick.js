const Discord = require('discord.js');
exports.run = (client, message, args) => {
  const settings = message.client.getSettings(message.guild)
  let reason = args.slice(1).join(' ');
  // Member doesn't have permissions
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.reply("You dont have the right perms to kick....").then(m => m.delete(5000));
}
  let user = message.mentions.users.first();
  if (settings.modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
    let modLogChannel = message.guild.channels.find(c => c.name === settings.modLogChannel);
    if (!modLogChannel) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'kick')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  return modLogChannel.send(embed);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: 'kick',
  category: "Moderation",
  description: 'Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
