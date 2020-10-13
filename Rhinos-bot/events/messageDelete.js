const Discord = require('discord.js')
module.exports = async (client, message, guild) => {

  const settings = client.getSettings(message.guild);
  if (settings.messageLogging !== "true") return;
  if (guild === null) return
  if (message.member.user.bot) return
  if (settings.messageLogChannel && message.guild.channels.cache.find(c => c.name == settings.messageLogChannel)) {

  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL())
  .setThumbnail(message.author.avatarURL())
  .setColor("RANDOM")
  .setTitle(`Message was sent in #${message.channel.name}`) 
  .setDescription(`${message.content}`)
  .setTimestamp(Date.now() - 5000)
  .setFooter(message.author.id)
  
  

  message.guild.channels.cache.find(c => c.name === settings.messageLogChannel).send(embed)
  }
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
