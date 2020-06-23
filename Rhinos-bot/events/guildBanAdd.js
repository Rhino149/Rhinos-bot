const Discord = require('discord.js')

module.exports = (client, guild, user, message) => {
  const settings = client.getSettings("message.guild.id");

  if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && message.guild.channels.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = message.guild.channels.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

	  const embed = new Discord.RichEmbed()
        .setTitle('🔨 Member banned')
        .setColor("FF0000")
        .setDescription(`**Total member count:** \`${guild.memberCount}\`\n<@${user.id}> was banned from the Discord.`)
        .setThumbnail(user.displayAvatarURL)
        .setTimestamp()

        message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error);
    }
  }
}
