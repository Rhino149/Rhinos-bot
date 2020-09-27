 
const Discord = require('discord.js')
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
exports.run = async (client, message, args, config) => {
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now());
  
    return message.channel.send(`You have to wait ${remaining} before you can beg again`)
      .catch(console.error);
  }
  cooldowns.set(message.author.id, Date.now() + 15000);
setTimeout(() => cooldowns.delete(message.author.id), 15000);

       
         client.money.ensure(message.author.id, {
           member: message.author.id,
           money: 0
         })
       
         const money = client.money.get(message.author.id, 'money')

         let amount = Math.floor(Math.random() * 750) + 1; // 1-500 random number.
         let embed = new Discord.MessageEmbed()
         .setAuthor(`${message.author.tag}, wow it actually worked!`, message.author.displayAvatarURL) 
         .setDescription(`${message.author}, A generous person gave you $${amount} !`)
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
    name: 'beg',
    category: 'Economy',
    description: 'Too lazy to work I guess.',
    usage: 'beg'
  }
  