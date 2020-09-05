const Discord = require('discord.js');
exports.run = (client, message, args) => {
  const settings = message.client.getSettings(message.guild)
  const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    let reason = args.slice(1).join(' ');
    // Member doesn't have permissions
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply("You dont have the right perms to unban someone....").then(m => m.delete(5000));
  }
    message.client.unbanReason = reason;
    message.client.unbanAuth = message.author;
    let user = client.users.get(args[0])
    
    if (settings.modLogChannel && message.guild.channels.find(c => c.name == settings.modLogChannel)) {
      let modLogChannel = message.guild.channels.find(c => c.name === settings.modLogChannel);
    if (!modLogChannel) return message.reply('I cannot find a mod-log channel');
    if (!user) return message.reply('You must supply a User Resolvable, such as a user id.').catch(console.error)
    if (reason.length < 1) return message.reply('You must supply a reason for the unban.');
    message.guild.fetchBans()
	 .then(bans => {
	if (bans.some(u => user.id.includes(u.id))) {
    message.guild.unban(user)
if (settings.memberLogging !== 'true') return
	else {
    let embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'Unban')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
    modLogChannel.send(embed)
}
    }
    else {
    return message.reply(`${user.username} is not banned`)
}
})
}
  };
  
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: "unban",
    category: "Moderation",
    description: "Unbans the user.",
    usage: "unban [id] [reason]"
  };
