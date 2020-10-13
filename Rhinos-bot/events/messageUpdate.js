const Discord = require('discord.js')
module.exports = async (client, oldMessage, newMessage, message, guild) => {
if (!oldMessage) return
if (oldMessage.author.bot) return
	if (guild === null) return;
	
	const settings = client.getSettings(oldMessage.guild)
	if (settings.messageLogging !== "true") return;
	if (oldMessage.content === newMessage.content) return

	let embed = new Discord.MessageEmbed()
.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
  .setThumbnail(oldMessage.author.avatarURL())
  .setColor("RANDOM")
  .setTitle(`Message was edited in #${oldMessage.channel.name}`)
  .setDescription(`**Before: **  ${oldMessage.content.slice(0, 950)}\n**After: ** ${newMessage.content.slice(0, 950)}`)
  .setTimestamp()
  .setFooter(oldMessage.author.id)

	 oldMessage.guild.channels.cache.find(c => c.name === settings.messageLogChannel).send(embed)
}

