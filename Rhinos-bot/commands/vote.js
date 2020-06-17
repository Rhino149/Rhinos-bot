/*
<script src="https://discordbotlist.com/widget/index.js" async></script>
<dbl-widget bot-id="bot-rhino-bot" centered></dbl-widget>
*/
const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  let embed = new Discord.RichEmbed()
    .setAuthor("Voting links")
    .setColor("RANDOM")
    .addField("Link 1:", '[Discord Bot List](https://discordbotlist.com/bots/rhino-bot/upvote)', inline = true)
    .addField("Link 2:", '[Top.gg](https://top.gg/bot/636311667239551006/vote)', inline = true)
    message.channel.send(embed);
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["upvote"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "vote",
    category: "Info",
    description: "Upvote the bot!",
    usage: "vote"
  };
  
