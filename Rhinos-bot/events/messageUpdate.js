const Discord = require('discord.js')
module.exports = async (client, oldMessage, newMessage, message, guild) => {
const channelMentioner = /<#([0-9]+)>/g
const channelMentioner2 = /([0-9]+)/g
if (oldMessage.author.bot === true) return;
	if (guild === null) return;
	
	const settings = client.getSettings(oldMessage.guild)
	if (oldMessage.guild.id === '714576528289300522') console.log(settings)
	if (settings.messageLogging !== "true") return;
	if (oldMessage.content === newMessage.content) return
	const channelMention = channelMentioner.exec(settings.messageLogChannel) || channelMentioner2.exec(settings.messageLogChannel)
	let embed = new Discord.MessageEmbed()
.setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
  .setThumbnail(oldMessage.author.avatarURL)
  .setColor("RANDOM")
  .setTitle(`Message was edited in #${oldMessage.channel.name}`)
  .setDescription(`**Before: **  ${oldMessage.content.slice(0, 950)}\n**After: ** ${newMessage.content.slice(0, 950)}`)
  .setTimestamp()
  .setFooter(oldMessage.author.id)
	// oldMessage.guild.channels.cache.get(channelMention[1]).send(embed).catch(console.error) ||
	 oldMessage.guild.channels.cache.find(c => c.name === settings.messageLogChannel).send(embed).catch(console.error)
channelMentioner.exec(settings.messageLogChannel)}

