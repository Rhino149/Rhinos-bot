const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  

  let inline = true;
  let sicon = message.guild.iconURL();
  let serverembed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(sicon)
    .setAuthor(message.guild.name, sicon)
    .addField("Name", message.guild.name, inline)
    .addField("ID", message.guild.id, inline)
    .addField("Owner", message.guild.owner, inline)
    .addField("Region", message.guild.region, inline)
    .addField(
      "Verification Level",
      message.guild.verificationLevel,
      inline
    )
    .addField(
      "Members",
      `<:user:693939626573955072> ${message.guild.memberCount}`,
      inline
    )
    .addField("Roles", message.guild.roles.cache.size, inline)
    .addField("Channels", message.guild.channels.cache.size, inline)
    .addField("You Joined", message.member.joinedAt)
    .setFooter(`Created ${message.guild.createdAt}`);

  message.channel.send(serverembed);

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["si"],
    permLevel: "User"
  };
exports.help = {
    name: "serverinfo",
    category: "Info",
    description: "If you wanna see the servers info.",
    usage: "serverinfo"
};