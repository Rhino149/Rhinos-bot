exports.run = async (client, message, args, config) => {
    if (!args[0]) return message.channel.send('You need to specify an amount to withdraw.')
  const key = message.author.id;
  
           client.money.ensure(`${key}`, {
             member: key,
             money: 0,
             bank: 0
           })

           const bank = client.money.get(key, 'bank')
           const money = client.money.get(key, 'money')
	if (isNaN(args[0])) {
	if (args[0] === 'all') {
	args[0] = bank;
	} else if (args[0] === 'half') {
	args[0] = Math.round(bank / 2);
	} else {
        return message.channel.send('Invalid amount.')
        }
}
const amount = Number(args[0])
        if (bank < amount) 
            return message.channel.send('You do not have enough money to withdraw.')
        if (bank <= 0) 
            return message.channel.send('You do not have enough money to withdraw.') 
            if (amount <= 0) 
            return message.channel.send('You cannot withdraw nothing.')
	if (amount < 1)                                                   return message.channel.send('Must be a whole number.')
        if (bank == undefined)
        return message.channel.send('Your bank needs to have more than 0')
         else 
	if (amount && amount <= bank) {
        if (amount < 1 || !Number.isInteger(Number(amount))) {
return message.channel.send('Needs to be a whole number greater than 0')
}
            message.channel.send(`You withdrawed $${amount.toLocaleString('en')}.`)
            client.money.set(key, (money + amount), 'money');
            client.money.set(key, (bank - amount), 'bank');
} else {
return message.channel.send(`You cant withdraw more than you have in your bank`)
}
         
        }
    
        exports.conf = {
            enabled: true,
            aliases: ["with"],
            guildOnly: true,
            permLevel: 'User'
          };
          
          exports.help = {
            name: 'withdraw',
            category: 'Economy',
            description: 'Withdraw coins',
            usage: 'withdraw <amount>'
          };
