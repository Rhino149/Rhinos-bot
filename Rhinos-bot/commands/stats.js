const Discord = require('discord.js')
const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  let embed = new Discord.MessageEmbed()
.setAuthor(`= STATISTICS =`)
.setDescription(`\`\`\`• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Users      :: ${client.users.cache.size.toLocaleString()}
• Servers    :: ${client.guilds.cache.size.toLocaleString()}
• Channels   :: ${client.channels.cache.size.toLocaleString()}
• Discord.js :: v${version}
• Node       :: ${process.version}\`\`\``, {code: "asciidoc"})
.setColor("ORANGE")
message.channel.send(embed)
};
/*
.addField(`• Mem Usage  ::`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline = false)
.addField(`• Uptime     ::`, `${duration}`, inline = false)
.addField(`• Users      ::`, `${client.users.size.toLocaleString()}`, inline = false)
.addField(`• Servers    ::`, `${client.guilds.size.toLocaleString()}`, inline = false)
.addField(`• Channels   ::`, `${client.channels.size.toLocaleString()}`, inline = false)
.addField(`• Discord.js ::`, `v${version}`, inline = false)
.addField(`• Node       ::`, `${process.version}`, inline = false)
*/
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["botinfo", "bi"],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Info",
  description: "Gives some useful bot statistics",
  usage: "stats"
};
