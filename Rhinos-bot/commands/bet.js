const Discord = require('discord.js');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

exports.run = async (client, message, args) => {
  if (!args[0]) return message.channel.send('You need to specify a number to bet.');
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now());

    return message.channel.send(`You have to wait ${remaining} before you can gamble again`).catch(console.error);
  }

  /*cooldowns.set(message.author.id, Date.now() + 5000);
  setTimeout(() => cooldowns.delete(message.author.id), 5000);*/
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
	return message.channel.send('Invalid amount')
	}
}
    let sides1 = Math.floor(Math.random() * 10) + 1;
    let sides2 = Math.floor(Math.random() * 10) + 1;
	
    if (money < args[0])
      return message.channel.send('You do not have enough money.');
    if (args[0] < 50)
      return message.channel.send('You cannot bet less than $50 and cannot bet more than $50000.');
    if (args[0] > 50000)
      return message.channel.send('You cannot bet less than $50 and cannot bet more than $50000.');
      if (money > 2000000)
      return message.channel.send('You are too rich to gamble.')
if (args[0] < 1 || !Number.isInteger(Number(args[0]))) {
      return message.channel.send('Needs to be a whole number greater than 0')
}
else {
cooldowns.set(message.author.id, Date.now() + 5000)
setTimeout(() => cooldowns.delete(message.author.id), 5000);
    if (sides1 > sides2) {
      let embed = new Discord.MessageEmbed()
        .setAuthor("Winner winner!")
        .addField("You rolled: ", +String(sides1), inline = true)
        .addField("Rhino rolled: ", +String(sides2), inline = true)
        .addField(`You now have`, `$${(money + Number(args[0]))}`)
        .setColor("GREEN");
      client.money.set(key, (money + Number(args[0])), 'money');
      message.channel.send(embed);
      return;

    } else if (sides1 < sides2) {
      let embed = new Discord.MessageEmbed()
        .addField("You rolled: ", +String(sides1), inline = true)
        .addField("Rhino rolled: ", +String(sides2), inline = true)
        .setAuthor("Sucks to suck")
        .addField(`You now have`, `$${(money - Number(args[0]))}`)
        .setColor("RED");
      message.channel.send(embed);
      client.money.set(key, (money - Number(args[0])), 'money');
      return;

    } else if (sides1 == sides2) {
      let embed = new Discord.MessageEmbed()
        .addField("You rolled: ", +String(sides1), inline = true)
        .addField("Rhino rolled: ", +String(sides2), inline = true)
        .setAuthor("Your roll has to be at least 1 greater than rhinos")
        .addField(" Tied",  "Your money stays the same.")
        .setColor("#FFFF00");
      message.channel.send(embed);
      return;
    }
}
};
exports.conf = {
  enabled: true,
  aliases: ["gamble"],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'bet',
  category: 'Economy',
  description: 'Bet some coins.\n Also A thanks to Northern Lights#7944 for helping in the creation of this command.',
  usage: 'bet <amount>'
};
