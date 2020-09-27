const Discord = require('discord.js')
module.exports = async (client, channel, guild) => {
// final permissions for a guild member using permissionsFor
	if (guild === null) return;
	const settings = client.getSettings(channel.guild)
    if (settings.serverLogging !== "true") return;
   let embed = new Discord.MessageEmbed()
	.setColor("RED")
	.setTitle(`${channel.type.toProperCase()} channel deleted`)
	.setDescription(`**Channe Name:** ${channel.name}\n**Category:** ${channel.parent || 'None'}`)
	.setTimestamp()
	.setFooter(`Channel ID: ${channel.id}`)
    channel.guild.channels.cache.find(c => c.name === settings.serverLogChannel).send(embed)
}
