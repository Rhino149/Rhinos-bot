const Discord = require("discord.js");

module.exports = (client, guild, user, message) => {
  const settings = client.settings.get("message.guild.id")  
  if (guild === null) return

  if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && guild.channels.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = guild.channels.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return
    modLogChannel.send(`${user.tag} was just unbanned!`);
  let embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Action:** Unban\n**Target:** ${user.tag}\n**Moderator:** ${guild.client.unbanAuth.tag}\n**Reason:** ${guild.client.unbanReason}`);
  return modLogChannel.send(embed)
  }
}
};
