const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  let embed = new Discord.RichEmbed()
    .setAuthor("Clan Trailer")
    .setColor("RANDOM")
    .setDescription(`[**Rocky Mountains Clan Trailer**](https://youtu.be/gxcg4RTzTtE)`)
    .setImage(`https://cdn.discordapp.com/attachments/709187900327198760/709631873118371910/20190317_130431.jpg`)
    message.channel.send(embed);
};
exports.conf = {
    enabled: false,
    guildOnly: true,
    aliases: ["royal", "royale", "rocky"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "shush",
    category: "Secret",
    description: ".",
    usage: "royal"
  };
  
/*
[**Rocky Mountains Clan Trailer**](https://youtu.be/gxcg4RTzTtE)
*/