const Discord = require('discord.js')

module.exports = (client, guild, user, message) => {
  const settings = client.getSettings(guild);
	
	if (settings.memberLogging !== 'true') return;
  if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && guild.channels.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = guild.channels.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

	  const embed = new Discord.RichEmbed()
        .setTitle('🔨 Member banned')
        .setColor("FF0000")
        .setDescription(`**Total member count:** \`${guild.memberCount}\`\n<@${user.id}> was banned from the Server.`)
        .setAuthor(user.tag, user.displayAvatarURL)
        .setTimestamp()
	.setFooter(`User ID: ${user.id}`)

        guild.channels.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error);
    }
  }
}
