const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const settings = message.client.getSettings(message.guild.id)
    if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.reply("You dont have the right perms to use this command....").then(m => m.delete(5000));
    };
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    if (settings.modLogChannel && message.guild.channels.find(c => c.name == settings.modLogChannel)) {
      let modLogChannel = message.guild.channels.find(c => c.name === settings.modLogChannel);
    let muterole = message.guild.roles.find(muterole => muterole.name === "Muted");
    if (!modLogChannel) return message.reply('I cannot find a mod-log channel');
    if (reason.length < 1) return message.reply('You must supply a reason for the unmute.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to unmute them.').catch(console.error);
    
    if (message.guild.member(user).roles.has(muterole)) return message.reply(`The user has been unmuted`)
    message.guild.member(user).removeRole(muterole);
    message.channel.send(`The user has been unmuted`)

    const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'unmute')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
  modLogChannel.send(embed);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["unsilence"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: 'unmute',
    category: "Moderation",
    description: 'Unmutes the user',
    usage: 'unmute [mention] [reason]'
  };