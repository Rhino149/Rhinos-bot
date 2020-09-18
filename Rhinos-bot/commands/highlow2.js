exports.run = async (client, message, args) => {
const cooldowns = new Map();
const msg = message
let sides1 = Math.floor(Math.random() * 10) + 1;
let sides2 = Math.floor(Math.random() * 10) + 1;
const key = msg.author.id;
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
if (money < args[0])
      return message.channel.send('You do not have enough money.');
    if (args[0] < 50)
      return message.channel.send('You cannot bet less than $50 and cannot bet more than $50000.');
    if (args[0] > 50000)
      return message.channel.send('You cannot bet less than $50 and cannot bet more than $50000.');
if (args[0] < 1 || !Number.isInteger(Number(args[0]))) {
      return message.channel.send('Needs to be a whole number greater than 0')
}
else {
cooldowns.set(message.author.id, Date.now() + 5000)
setTimeout(() => cooldowns.delete(message.author.id), 5000);
message.channel.send("Your first number is: " + String(sides1))
const response = await client.awaitReply(msg, "High, Low, or End?");
const high = 'high'
const low = 'low'
const end = 'end'
if (sides1 > sides2) {
if (response === high) {
  msg.reply(`You choose ${response}`);
                msg.channel.send("You win!");
                msg.channel.send(`The number was **__${String(sides2)}__** which was lower than your number: **__${String(sides1)}__**`)
client.money.set(key, (money + parseInt(Math.round(args[0] * 2))), 'money');
                return;
         }
else if (response === low) {
msg.reply(`You choose ${response}`);
                msg.channel.send("You lose!");
                msg.channel.send(`The number was **__${String(sides2)}__** which was lower than your number **__${String(sides1)}__**`)
client.money.set(key, (money - parseInt(Math.round(args[0]))), 'money');
return;
}
}
if (sides1 < sides2) {
if (response === high) {
  msg.reply(`You choose ${response}`);
                msg.channel.send("You lose!");
                msg.channel.send(`The number was **__${String(sides2)}__** which was higher than your number **__${String(sides1)}__**`)
client.money.set(key, (money - parseInt(Math.round(args[0]))), 'money');
                return;
         }
else if (response === low) {
msg.reply(`You choose ${response}`);
                msg.channel.send("You win!");
                msg.channel.send(`The number was **__${String(sides2)}__** which was higher than your number **__${String(sides1)}__**`)
client.money.set(key, (money + parseInt(Math.round(args[0] * 2))), 'money');
    }
else if (response === end) {
msg.reply(`You choose ${response}`)
message.channel.send("This game has ended due to your cowardliness.")
client.money.set(key, (money - parseInt(Math.round(args[0] / 2))), 'money');
            return;
        }
if (sides1 === sides2) {
if (response === high || low) {
message.channel.send(`This game has ended with equal numbers. Your Number: ${String(sides1)}, There Number: ${String(sides2)}`)
            return;
}
}

else {
message.channel.send("You lose due to your stupidity")
client.money.set(key, (money - parseInt(Math.round(args[0] / 2))), 'money');
}
}
}
}
exports.conf = {
            enabled: true,
            aliases: ["hl", "hl2"],
            guildOnly: true,
            permLevel: 'User'
          };
          
          exports.help = {
            name: 'highlow',
            category: 'Being worked on/Broken',
            description: 'Idk if it works or not.',
            usage: 'highlow <amount>'
          };
