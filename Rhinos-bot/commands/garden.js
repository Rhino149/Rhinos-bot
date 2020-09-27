const Discord = require('discord.js') 
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');
exports.run = async (client, message, args) => {
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {

    const remaining = humanizeDuration(cooldown - Date.now());

    return message.channel.send(`You have to wait ${remaining} before you can collect your plants and plant again`).catch(console.error);  
  }
  if (!args[0]) return message.channel.send('You need to specify a number of seeds to plant.');
  if (isNaN(args[0])) return message.channel.send('Invalid amount.');

    const prefix = message.guild === null ? 'r!' : client.getSettings(message.guild.id).prefix
    const key = `${message.author.id}`
    
    client.inventory.ensure(key, {
      member: key,
      seeds: 0,
      plants: 0
    })
    client.money.ensure(key, {
      member: key,
      money: 0,
    })
    /*
    client.inventory.set(key, (number + parseInt(args[1])), 'seeds')
    */
   const money = client.money.get(key, 'money')
    const seeds = client.inventory.get(key, 'seeds')
    const plants = client.inventory.get(key, 'plants')
    if (plants == undefined) {
      client.inventory.set(`${message.author.id}`, parseInt(0), 'plants')
    }
    if (plants == NaN) {
      client.inventory.set(`${message.author.id}`, parseInt(0), 'plants')
    }
    if (seeds < args[0]) return message.channel.send(`You cant plant more seeds than you have sorry please buy more from the shop to see shop do ${prefix}shop`)
    if (args[0] <= 0) return message.channel.send(`Can't plant less than 1`)
    if (args[1] < 1 || !Number.isInteger(Number(args[1]))) {
      return message.channel.send('Needs to be a whole number greater than 0')
}
 else {
    message.channel.send(`<@${message.author.id}> you planted ${args[0]} seeds`)
    client.inventory.set(key, (seeds - parseInt(args[0])), 'seeds') 
    cooldowns.set(message.author.id, Date.now() + 300000);
    setTimeout(() => {
     cooldowns.delete(message.author.id)
    
    message.channel.send(`<@${message.author.id}> You can now plant again`), message.channel.send(`Heres are ${args[0]} plants you've gotten from seeds`), client.inventory.set(key, (plants + parseInt(args[0])), 'plants')
}, 300000)
/*
300000
*/
 }
};
/*
client.inventory.set(key, (number + parseInt(args[1])), 'seeds')
*/
exports.conf = {
  enabled: true,
  aliases: ['plants', 'plant'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'garden',
  category: 'Economy',
  description: 'Plant your seeds.',
  usage: 'garden'
}
