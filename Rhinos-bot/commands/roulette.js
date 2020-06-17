const Discord = require('discord.js');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

exports.run = async (client, message, args) => {
  if (!args[1]) return message.channel.send('Must say your guess. | <amount> <guess>');
  if (isNaN(args[1])) return message.channel.send('Invalid guess allowed.');
  if (!args[0]) return message.channel.send('You need to specify a amount to roulette.');
  if (isNaN(args[0])) return message.channel.send('Invalid amount.');
  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now());

    return message.channel.send(`You have to wait ${remaining} before you can gamble again`).catch(console.error);
  }

  cooldowns.set(message.author.id, Date.now() + 5000);
  setTimeout(() => cooldowns.delete(message.author.id), 5000);
  const key = message.author.id;

  client.money.ensure(key, {
    member: key,
    money: 0,
  });

  const money = client.money.get(key, 'money');
let guess = (args[1])
    if (guess < 1)
    return message.channel.send("You gotta guess a number between 1-8 smh");
    if (guess > 8)
        return message.channel.send("You gotta guess a number between 1-8 smh");
        if (args[0] > 10000)
        return message.channel.send("You gotta roulette more than 50 and less than 10000")
        if (args[0] < 50)
        return message.channel.send("You gotta roulette more than 50 and less than 10000")
        if (money < args[0])
        return message.channel.send("You gotta roulette have more than you bet")
        let number = Math.floor(Math.random() * 8) + 1;

    // If both are even or odd then multiplier is x1 so they keep their bet.
    // If 
    // If the guess of the person and the number generated are equal, then
    // multiplier x5. Ex. Bets 300, if both are even, no change in balance.
    // If both are same number ex. 5, 5. then add 1500 to their balance.
    // If it does not match even or odd and they are not the same, then
    // lose all of bet. (This isn't roullete just my take on it)

    
        if (number == guess) {
          score = 5
        
        total_amount = score * args[0]
        let embed = new Discord.RichEmbed()
     .addField("You guessed:", `${String(args[1])}`, inline = true)
     .addField(`The number was:`, `${String(number)}`, inline = true)
     .addField("You won:", `$${String(total_amount)}`)
     .setAuthor('You Won!')
     .setColor("GREEN")
     client.money.set(key, (money + parseInt(total_amount)), 'money');
     message.channel.send(embed)
    return; 
        }
    else if (number !== guess) {
        let embed = new Discord.RichEmbed()
     .addField("You guessed:", String(args[1]), inline = true)
     .addField(`The number was:`, String(number), inline = true)
     .setAuthor("You Lost!")
     .setColor("RED")
     .addField("You lost:", `$${parseInt(args[0])}`, inline = false)
     message.channel.send(embed)
     client.money.set(key, (money - parseInt(args[0])), 'money');
     score = 0
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
        name: 'roulette',
        category: 'Economy',
        description: 'A twist to roulette.\n Also a thanks to Northern Lights#7944 for helping in the creation of this command.',
        usage: 'roulette <amount> <guess>'
      };