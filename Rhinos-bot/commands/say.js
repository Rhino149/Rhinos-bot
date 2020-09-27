const Discord = require("discord.js");
exports.run = async (client, message, args) => { 
    const sayMessage = args.join(" ");
    if (sayMessage.length < 1) return message.reply('You gotta tell me what to say fool.');
    let embed = new Discord.MessageEmbed()
    .setColor("#36393F")
    .setDescription(`${sayMessage}`)
    .setFooter(`Sent by ${message.author.username}#${message.author.discriminator}`)
    message.channel.send(embed);

    message.delete();
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["talk"],
    permLevel: "User"
  };
  exports.help = {
    name: "say",
    category: "Fun",
    description: "Makes the bot say whatever you want.",
    usage: "say"
  };
