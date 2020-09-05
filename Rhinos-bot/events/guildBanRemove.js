const Discord = require("discord.js");

module.exports = (client, guild, user) => {

  const settings = client.getSettings(guild)  
  if (guild === null) return

  if (settings.memberLogging === 'true') {
	if (settings.modLogChannel && guild.channels.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = guild.channels.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

  let embed = new Discord.RichEmbed()
    .setColor(3447003)
	.setTitle('Member unbanned')
        .setAuthor(user.tag, user.displayAvatarURL)
    .setTimestamp()
    .setDescription(`${user} was unbanned`)
	.setFooter(`USER ID: ${user.id}`)
  return modLogChannel.send(embed)
  }
}
};
