const Discord = require('discord.js')
const humanizeDuration = require('humanize-duration')
const ms = require("ms")
const cooldowns = new Map();
exports.run = async (client, message, args, guild) => {

const cooldown = cooldowns.get(message.author.id);

var today = new Date()
var time = today.getHours()+":"+(today.getMinutes()+5)+":"+today.getSeconds();
if (cooldown) {
const remaining = humanizeDuration(cooldown - Date.now());
	
       return message.channel.send(`You have to wait ${remaining} before you can rob again`).catch(console.error)	
}
//console.log(args.join(' ')))
/*
const input = message.content
const prefix = input.slice(0, 2).split(message.settings.prefix)
const user = input.split('"').slice(1, 2).join()
const member = message.mentions.members.first() || message.channel.guild.members.get(args[0]) || message.channel.guild.members.find(u => u.user.username === user) || message.channel.guild.members.find(u => u.user.tag === user)*/
	//if (message.mentions.members.size <1 === !message.channel.guild.members.get(args[0])) return message.channel.send('Sorry, you forgot to mention somebody.')
const member = client.resolveUser(args.join(' '))
if (!member) return message.channel.send(`You need to mention someone for this command to work!`)
    if (member.id === message.author.id) return message.channel.send('You cannot rob yourself. Go rob someone else using there id or mentioning them')
	if (member.bot === true) return message.channel.send("Bots don't deserved to be robbed")
	if (message.author.bot === true) return
if (message.channel.guild.members.find(m => m.id === message.author.id)) {
    client.money.ensure(`${member.id}`, {
      member: member.id,
      money: 0,
    })
    client.money.ensure(`${message.author.id}`, {
        member: message.author.id,
        money: 0,
      })
      
    let targetuser = await client.money.get(member.id, 'money')
     let author = await client.money.get(message.author.id, 'money')
    if (author < 250) return message.channel.send(':x: You need atleast 250$ to rob somebody.') 
	if (targetuser > 1e8) return message.channel.send("Thid person is too rich to stop a mass increase in currency a limit has been added sorry")
    if (targetuser < 250) return message.channel.send(`❌ ${member.username} does not have anything to rob.`)

    let worth = Math.round(targetuser * 0.33);
    let lose = Math.round(author * 0.2);
    let sides = Math.floor(Math.random() * 10) + 1;

    cooldowns.set(message.author.id, Date.now() + 300000)
setTimeout(() => cooldowns.delete(message.author.id), 300000);
    if (sides >= 6) {
    let embed = new Discord.RichEmbed() 
    .setDescription(`${message.author} you robbed ${member} and got away with ${worth}!`) 
    .setColor("GREEN")
    .setTimestamp() 
    message.channel.send(embed) 
    client.money.set(member.id, (targetuser - parseInt(worth)), 'money')
    client.money.set(message.author.id, (author + parseInt(worth)), 'money');
    return;
    } else if (sides < 6) {
    let embed = new Discord.RichEmbed() 
    .setDescription(`${message.author} you failed to rob ${member} and lost $${lose}!`)
    .setColor("RED")
    .setTimestamp() 
    message.channel.send(embed) 
    client.money.set(member.id, (targetuser + parseInt(lose)), 'money')
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
