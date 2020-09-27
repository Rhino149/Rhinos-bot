const Discord = require('discord.js')

module.exports = (client, guild, user) => {

  const settings = client.getSettings(guild);
	
	if (settings.memberLogging !== 'true') return;
  //if (settings.logMessageUpdates == 'true') {
	if (settings.modLogChannel && guild.channels.cache.find(c => c.name == settings.modLogChannel)) {
	  const modLogChannel = guild.channels.cache.find(c => c.name == settings.modLogChannel)
	  if (!modLogChannel.permissionsFor(guild.me).has('VIEW_CHANNEL')) return
	  if (!modLogChannel.permissionsFor(guild.me).has('SEND_MESSAGES')) return

	  const embed = new Discord.MessageEmbed()
        .setTitle('Member banned')
        .setColor("RED")
        .setDescription(`${user} was banned from the server.`)
        .setAuthor(user.tag, user.displayAvatarURL)
        .setTimestamp()
	.setFooter(`User ID: ${user.id}`)

        guild.channels.cache.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error);
    }
}
