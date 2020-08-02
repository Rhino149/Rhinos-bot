const Discord = require('discord.js');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('You need to specify a number to slot.');
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now());

    return message.channel.send(`You have to wait ${remaining} before you can use slots again`).catch(console.error);
  }

  const key = message.author.id;

  client.money.ensure(key, {
    member: key,
    money: 0
  });

  const money = client.money.get(key, 'money');
	if (isNaN(args[0])) {
	if (args[0] === 'all') {
	args[0] = money;
	} else if (args[0] === 'half') {
	args[0] = Math.round(money / 2);
	} else {
        return message.channel.send('Invalid amount.')
        }
}
  if (money < args[0])
      return message.channel.send('You do not have enough money.');
    if (args[0] < 50)
      return message.channel.send('You cannot slot less than $50 and cannot slot more than $50000.');
    if (args[0] > 50000)
      return message.channel.send('You cannot slot less than $50 and cannot slot more than $50000.');
      if (money >= 2000000)
      return message.channel.send('You are too rich to use slots.')
if (args[0] < 1 || !Number.isInteger(Number(args[0]))) {
return message.channel.send('Needs to be a whole number greater than 0')
}
else {
cooldowns.set(message.author.id, Date.now() + 5000)
setTimeout(() => cooldowns.delete(message.author.id), 5000);
  let slots = [":one:", ":two:", ":three:", ":four:", ":five:"];
  let result1 = Math.floor((Math.random() * slots.length));
  let result2 = Math.floor((Math.random() * slots.length));
  let result3 = Math.floor((Math.random() * slots.length));
  let name = message.author.displayName;
  let icon = message.author.displayAvatarURL;

  if (slots[result1] === slots[result2] && slots[result3]) {
    let embed = new Discord.RichEmbed()
       .setFooter('You won!', icon)
       .setTitle(':slot_machine: Slots :slot_machine:')
       .addField('Result:', `| ${slots[result1] } | ${slots[result2] } | ${slots[result3]} |`)
       .addField('Amount Won: ', `$${Number(args[0]).toLocaleString('en')}`, inline = false)
       .setColor(0xF4E842)
    client.money.set(key, (money + Number(args[0])), 'money')
    message.channel.send(embed);
    return;

   }  if (slots[result1] == slots[result2]) {
    let embed = new Discord.RichEmbed()
       .setFooter('You won!', icon)
       .setTitle(':slot_machine: Slots :slot_machine:')
       .addField('Result:', `| ${slots[result1] } | ${slots[result2] } | ${slots[result3]} |`)
       .addField('Amount Won: ', `$${Number(args[0]).toLocaleString('en')}`)
       .setColor(0xF4E842)
    client.money.set(key, (money + Number(args[0])), 'money')
    message.channel.send(embed);
    return;

    }  
    if (slots[result2] == slots[result3]) {
      let embed = new Discord.RichEmbed()
         .setFooter('You won!', icon)
         .setTitle(':slot_machine: Slots :slot_machine:')
         .addField('Result:', `| ${slots[result1] } | ${slots[result2] } | ${slots[result3]} |`)
         .addField('Amount Won:', ` $${Number(args[0]).toLocaleString('en')}`)
         .setColor(0xF4E842)
      client.money.set(key, (money + Number(args[0])), 'money')
      message.channel.send(embed);
      return;

  } if (slots[result1] == slots[result3]) {
    let embed = new Discord.RichEmbed()
         .setFooter('You won!', icon)
         .setTitle(':slot_machine: Slots :slot_machine:')
         .addField('Result:', `| ${slots[result1] } | ${slots[result2] } | ${slots[result3]} |`)
         .addField('Amount Won:', ` $${Number(args[0]).toLocaleString('en')}`)
         .setColor(0xF4E842)
      client.money.set(key, (money + Number(args[0])), 'money')
      message.channel.send(embed);
      return;
} else {
  let embed = new Discord.RichEmbed()
     .setFooter('You lost!', icon)
     .setTitle(':slot_machine: Slots :slot_machine:')
     .addField('Result:', `| ${slots[result1] } | ${slots[result2] } | ${slots[result3]} |`)
     .addField('Balance: ', `$${(money - Number(args[0]))}`, inline = false)
     .setColor("RED")
     client.money.set(key, (money - Number(args[0])), 'money');
  message.channel.send(embed);
  return;
}
} 
}
    exports.conf = {
        enabled: true,
        aliases: ['slot'],
        guildOnly: true,
        permLevel: 'User'
      }
      
      exports.help = {
        name: 'slots',
        category: 'Economy',
        description: 'Slots some coins.',
        usage: 'slots <amount>'
      }
      
