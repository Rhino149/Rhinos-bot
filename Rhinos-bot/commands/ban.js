const Discord = require('discord.js');
exports.run = (client, message, args, guild) => {
  const settings = message.client.getSettings(message.guild)
  let reason = args.slice(1).join(' ');
          // Member doesn't have permissions
          if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("You dont have the right perms to unban someone....").then(m => m.delete(5000));
        }
  let user = message.mentions.users.first();
  if (settings.modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
    let modLogChannel = message.guild.channels.find(c => c.name === settings.modLogChannel);
    if (!modLogChannel) return message.reply('I cannot find a mod-log channel');
  if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
  if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('I cannot ban that member');
  message.guild.ban(user);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Ban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  modLogChannel.send(embed)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};

exports.help = {
  name: 'ban',
  category: "Moderation",
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
