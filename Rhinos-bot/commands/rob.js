const Discord = require('discord.js') 
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
exports.run = async (client, message, args, guild) => {
    const cooldown = cooldowns.get(message.author.id);
    if (cooldown) {

      const remaining = humanizeDuration(cooldown - Date.now());
  
      return message.channel.send(`You have to wait ${remaining} before you can rob again`).catch(console.error);
    }
    
    const member = message.mentions.members.first() || message.guild.members.get(args[0])

	if (message.mentions.members.size < 1) return message.channel.send('Sorry, you forgot to mention somebody.')
	if (!member) return message.channel.send('Sorry, you forgot to mention somebody.')
    if (member.user.id === message.author.id) return message.channel.send('You cannot rob yourself.')
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
    let worth = Math.round(targetuser * 0.33);
    let lose = Math.round(author * 0.2);
    let sides = Math.floor(Math.random() * 10) + 1;

  
    cooldowns.set(message.author.id, Date.now() + 300000);
    setTimeout(() => cooldowns.delete(message.author.id), 300000);
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
