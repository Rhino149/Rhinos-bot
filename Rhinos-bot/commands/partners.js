const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    let embed = new Discord.RichEmbed()
    .setColor(0x4169e1)
    .setAuthor("Partners of Rhino-Bot")
    .addField("Check back later", `There are no partners right now`)
    .addField(`Wanna Partner?!`, `If you wanna partner your bot has to follow [discord's TOS](https://discord.com/terms)`)
    .addField(`Requirement 2`, `Also must have had actual time put into making it not like putting down commands that barely work/not at all`)
    message.channel.send(embed)

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["partnership", "p"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "partner",
    category: "Info",
    description: "This command is to see our partners of the bot!",
    usage: "partner"
  };