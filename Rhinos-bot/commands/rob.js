const Discord = require('discord.js') 
const humanizeDuration = require('humanize-duration');
const ms = require("ms")
exports.run = async (client, message, args, guild) => {
	const member = message.mentions.members.first() || message.channel.guild.members.get(args[0]) || message.member
	if (message.channel.guild.members.find(m => m.id === message.author.id)) {
	client.cooldown.ensure(`${message.author.id}`, {
	member: message.author.id,
	Rob: 0
	})

const cooldown = client.cooldown.get(message.author.id, 'rob');

var today = new Date()
var time = today.getHours()+':'+(today.getMinutes()+50)+':'+today.getSeconds();
const remaining = (time);
      if (cooldown === time) return message.channel.send(`You have to wait ${remaining} before you can rob again`).catch(console.error)	
	client.cooldown.set(message.author.id, time, 'rob')
	if (!member) return message.channel.send('Sorry, you forgot to mention somebody.')
    if (member.user.id === message.author.id) return message.channel.send('You cannot rob yourself. Go rob someone else using there id or mentioning them')
	if (member.user.bot === true) return message.channel.send("Bots don't deserved to be robbed")

    client.money.ensure(`${member.user.id}`, {
      member: member.user.id,
      money: 0,
    })
    client.money.ensure(`${message.author.id}`, {
        member: message.author.id,
        money: 0,
      })  
      
    let targetuser = await client.money.get(member.user.id, 'money')
     let author = await client.money.get(message.author.id, 'money')
    if (author < 250) return message.channel.send(':x: You need atleast 250$ to rob somebody.') 
    if (targetuser < 250) return message.channel.send(`❌ ${member.user.username} does not have anything to rob.`)
 // Activate 24 hour cooldown
    let worth = Math.round(targetuser * 0.33);
    let lose = Math.round(author * 0.2);
    let sides = Math.floor(Math.random() * 10) + 1;
    
    if (sides >= 6) {
    let embed = new Discord.RichEmbed() 
    .setDescription(`${message.author} you robbed ${member} and got away with ${worth}!`) 
    .setColor("GREEN")
    .setTimestamp() 
    message.channel.send(embed) 
    client.money.set(member.user.id, (targetuser - parseInt(worth)), 'money')
    client.money.set(message.author.id, (author + parseInt(worth)), 'money');
    return;
    } else if (sides < 6) {
    let embed = new Discord.RichEmbed() 
    .setDescription(`${message.author} you failed to rob ${member} and lost $${lose}!`)
    .setColor("RED")
    .setTimestamp() 
    message.channel.send(embed) 
    client.money.set(member.user.id, (targetuser + parseInt(lose)), 'money')
    client.money.set(message.author.id, (author - parseInt(lose)), 'money');
    return;
    }

}
};
exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: true,
    permLevel: 'User'
  };
  
  exports.help = {
    name: 'rob',
    category: 'Economy',
    description: 'Rob someones hard earned coins command made by LȏяԀ_Yȗṿяѧj#4173',
    usage: 'rob <@user>'
  };
