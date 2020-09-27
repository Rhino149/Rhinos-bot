const Discord = require("discord.js");
exports.run = (client, message, args) => {

  let inviteLink = message.client.config.inviteURL || `https://discordapp.com/oauth2/authorize?client_id=636311667239551006&scope=bot&permissions=2146958847`;
  if(args[0] && args[0] === "copy"){
      return message.channel.send(inviteLink);
  }
  
  let embed = new Discord.MessageEmbed()
      .setAuthor("Heres my link to invite me")
      .setDescription("Gets the bots invite link.", `${client.getSettings("guild").prefix}`)
      .addField((["My invite link"]), (inviteLink))
      .addField("Support", '[Support Server](https://discord.gg/bzRh5Mz)')
      .setColor("RANDOM")
      .setFooter("Thank you for inviting me");
  
  message.channel.send(embed);
     
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i"],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "System",
  description: "Gets the bots invite link.",
  usage: "invite"
};

