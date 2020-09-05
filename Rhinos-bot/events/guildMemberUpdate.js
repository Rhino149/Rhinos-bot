const Discord = require('discord.js')
module.exports = async (client, oldMember, newMember, member, guild) => {
if (oldMember.user.bot === true) return;
	if (guild === null) return;
	const settings = client.getSettings(oldMember.guild)
	if (settings.memberLogging !== "true") return;
	if (oldMember.displayName === newMember.displayName) return
	if (newMember.displayName !== oldMember.displayName) {
	let embed = new Discord.RichEmbed()
.setAuthor(oldMember.user.tag, oldMember.user.avatarURL)
  .setThumbnail(oldMember.user.avatarURL)
  .setColor("RANDOM")
  .setTitle(`Nickname Updated`)
  .setDescription(`**Before: ** ${oldMember.displayName.slice(0, 950)}\n**After: ** ${newMember.displayName.slice(0, 950)}`)
  .setTimestamp()
  .setFooter(oldMember.user.id)
	newMember.guild.channels.find(c => c.name === settings.memberLogChannel).send(embed).catch(console.error)
} else {
	let embed = new Discord.RichEmbed()
.setAuthor(oldMember.user.tag, oldMember.user.avatarURL)
.setThumbnail(oldMember.user.avatarURL)
.setColor("RANDOM")
.setTitle(`Nickname Removed`)
.setDescription(`**Before: ** ${oldMember.displayName.slice(0, 950)}\n**After: ** ${newMember.displayName.slice(0, 950)}`)
.setTimestamp()
.setFooter(oldMember.user.id)
newMember.guild.channels.find(c => c.name === settings.memberLogChannel).send(embed).catch(console.error)
}
}
