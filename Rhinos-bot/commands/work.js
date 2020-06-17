 
const Discord = require('discord.js')
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

exports.run = async (client, message, args, config) => {
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now());
  
    return message.channel.send(`You have to wait ${remaining} before you can work again`)
      .catch(console.error);
  }
  cooldowns.set(message.author.id, Date.now() + 30000);
setTimeout(() => cooldowns.delete(message.author.id), 30000);

       
         client.money.ensure(`${message.author.id}`, {
           member: message.author.id,
           money: 0
         })
       
         const money = client.money.get(message.author.id, 'money')

         let amount = Math.floor(Math.random() * 1000) + 1; // 1-500 random number.
         let embed = new Discord.RichEmbed()
         .setAuthor(`${message.author.tag}, it payed off!`, message.author.displayAvatarURL) 
         .setDescription(`${message.author}, you've worked and earned $${amount} !`)
         .setColor("RANDOM")
         
         message.channel.send(embed)
  client.money.set(`${message.author.id}`, money + amount, 'money')


};

exports.conf = {
    enabled: true,
    aliases: [],
    guildOnly: true,
    permLevel: 'User'
  }
  
  exports.help = {
    name: 'work',
    category: 'Economy',
    description: 'Go work lazy ass',
    usage: 'work'
  }
  