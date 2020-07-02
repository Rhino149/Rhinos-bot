const  Discord = require('discord.js');
module.exports = async (client, channel, guild, user, args) => {
// final permissions for a guild member using permissionsFor
const clean = await client.clean(client, channel.permissionOverwrites);
	if (guild === null) return;
	const settings = client.getSettings(channel.guild)
	if (settings.serverLogging !== "true") return;
	let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`A ${channel.type} channel has been created`)
  .setDescription(`**Channel Name: ** ${channel.name}\n**Category: ** ${channel.parent}`)
  .addField('Permissions', clean)
  .setTimestamp()
  .setFooter(`Channel ID: ${channel.id}`)
	channel.guild.channels.find(c => c.name === settings.serverLogChannel).send(embed).catch(console.error)
}
