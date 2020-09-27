/*
<script src="https://discordbotlist.com/widget/index.js" async></script>
<dbl-widget bot-id="bot-rhino-bot" centered></dbl-widget>
*/
const DBL = require('dblapi.js');
const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjMxMTY2NzIzOTU1MTAwNiIsImJvdCI6dHJ1ZSwiaWF0IjoxNTkxMDI3NzkxfQ.p-3Gr55LmVqaPcAaDOPuy0L_bUIvYXRne_c4tPn1NME', { webhookAuth: 'rhinos' });
  let embed = new Discord.MessageEmbed()
    .setAuthor("Voting links")
    .setColor("RANDOM")
    .addField("Link 1:", '[Discord Bot List](https://discordbotlist.com/bots/rhino-bot/upvote)', inline = true)
    .addField("Link 2:", '[Top.gg](https://top.gg/bot/636311667239551006/vote)', inline = true)
    message.channel.send(embed)

 dbl.hasVoted(message.author.id).then(voted => {
if (voted === true) return message.channel.send("Ty for voting")
})
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
  
