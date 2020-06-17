const Discord = require('discord.js');
const cooldowns = new Map();
const humanizeDuration = require('humanize-duration');

exports.run = async (client, message, args, input) => {
  if (!args[0]) return message.channel.send('You need to specify a number to bet.');
  if (isNaN(args[0])) return message.channel.send('Invalid amount.');

  const cooldown = cooldowns.get(message.author.id);
  if (cooldown) {
    const remaining = humanizeDuration(cooldown - Date.now());

    return message.channel.send(`You have to wait ${remaining} before you can gamble again`).catch(console.error);
  }


  cooldowns.set(message.author.id, Date.now() + 0);
  setTimeout(() => cooldowns.delete(message.author.id), 0);
  const key = message.author.id;

  client.money.ensure(key, {
    member: key,
    money: 0
  });

  const money = client.money.get(key, 'money');
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

      if (output == 'h' || output == 'l' || output == 'e') 
        message.channel.send("Your first number is: " + String(sides1))
      answer = output("Type 'h' for high, 'l' for low, or 'e' to end the game and lose half of your bet.")

       
        if (sides1 > sides2) {
            if (answer == 'h') 
                message.channel.send("You win!");
                message.channel.send("The number was", String(sides2))
                 client.money.set(key, (money + parseInt(args[0] * 2)), 'money');
                return;
         }
        if (sides1 < sides2) {
        if (answer == 'l') 
                message.channel.send("You win!")
                message.channel.send("The number was", String(sides2))
                 client.money.set(key, (money + parseInt(args[0] * 2)), 'money');
                 return;
        } if (answer == 'e') {
            message.channel.send("This game has ended due to your stupidity.")
            client.money.set(key, (money + parseInt(args[0] / 2)), 'money');
            return;
        }
        else {
          message.channel.send("You lost!.")
          client.money.set(key, (money - parseInt(args[0])), 'money');
          return;
        }
      
      };
        exports.conf = {
            enabled: false,
            aliases: ["hl"],
            guildOnly: true,
            permLevel: 'Bot Owner'
          };
          
          exports.help = {
            name: 'highlow',
            category: 'Being worked on/Broken',
            description: 'Guess if the number will be high or low.\n Also A thanks to Northern Lights#7944 for helping in the creation of this command.',
            usage: 'highlow <amount>'
          };