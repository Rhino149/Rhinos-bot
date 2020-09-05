const Discord = require('discord.js')
module.exports = async (client, messages, message, guild) => {

  const settings = messages.map(c => c.channel).map(g => g.guild).splice(0, 1).map(e => client.getSettings(e)).shift()

//const messageLoggingLogs = settings.map(e => e.messageLogging).join()
  if (settings.messageLogging !== "true") return;
  if (guild === null) return;
if (messages.filter(d => !d.author.bot).size === 0) return

  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`${messages.size} messages purged in #${messages.map(c => c.channel.name).splice(0, 1)}`)
  .setDescription(messages
.filter(b => !b.author.bot)
.map(m => `**[${m.author.tag}]:** ${m.content}`)
.join('\n'))
  .setTimestamp(Date.now() - 5000)
  .setFooter(`${messages.filter(d => !d.author.bot).size} deleted messages listed`)
 
//  const messageLogChannelName = settings.map(e => e.messageLogChannel).join()
 messages.array().splice(0, 1).map(g => g.guild.channels.find(e => e.name === settings.messageLogChannel).send(embed))
  }

/*
client.on('messageDelete', async (message) => {
  if (settings.messageLogging !== "true") return;
  const settings = client.getSettings(member.guild);
  if (settings.messageLogChannel && guild.channels.find(c => c.name == settings.messageLogChannel)) {
	  const messageLogChannel = guild.channels.find(c => c.name == settings.messageLogChannel)

  const entry = await message.guild.fetchAuditLogs({type: 'MESSAGE_DELETE'}).then(audit => audit.entries.first())
  let user = ""
    if (entry.extra.channel.id === message.channel.id
      && (entry.target.id === message.author.id)
      && (entry.createdTimestamp > (Date.now() - 5000))
      && (entry.extra.count >= 1)) {
    user = entry.executor.username
  } else { 
    user = message.author.username
  }
  messageLogChannel.send(`A message was deleted in ${message.channel.name} by ${user}`);
  }
})
*/

