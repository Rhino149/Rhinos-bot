const Discord = require('discord.js')
module.exports = async (client, messages, message, guild, member) => {

  const settings = client.getSettings(messages.guild);
  if (settings.messageLogging !== "true") return;
  if (guild === null) return
  if (settings.messageLogChannel && messages.guild.channels.find(c => c.name == settings.messageLogChannel)) {

  let embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(`Purged messages in #${messages.channel.name}`) 
  .setDescription(`${messages}`)
  .setTimestamp(Date.now() - 5000)
  .setFooter("I wonder if someones trying to hide something")
  
  

  messages.guild.channels.find(c => c.name === settings.messageLogChannel).send(embed).catch(console.error);
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

