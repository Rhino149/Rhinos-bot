exports.run = async (client, message, args, config) => {	
	if (!args[0]) return message.channel.send('You need to specify an amount to deposit.')
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
	args[0] = money;
	} else if (args[0] === 'half') {
	args[0] = Math.round(money / 2);
	} else {
	return message.channel.send('Invalid amount.')
	}
}
        if (money < args[0])
        return message.channel.send('You do not have enough money to deposit.')
        if (bank >= 5000000)
        return message.channel.send("Sorry but you hit max bank size.")

        if (args[0] <= 0) 
            return message.channel.send('You cannot deposit nothing.')
            if (args[0] > 5000000) 
            return message.channel.send('You cannot deposit this much.')
	if (args[0] < 1)                                                   return message.channel.send('Must be a whole number.')

            if (bank == NaN)
        return client.money.get(key, 'bank')
        else {
            message.channel.send(`You deposited $${Number(args[0]).toLocaleString('en')}.`)
            client.money.set(key, (money - Number(args[0])), 'money');
            client.money.set(key, (bank + Number(args[0])), 'bank');
        }
    }
        exports.conf = {
            enabled: true,
            aliases: ["dep"],
            guildOnly: true,
            permLevel: 'User'
          };
          
          exports.help = {
            name: 'deposit',
            category: 'Economy',
            description: 'deposit coins',
            usage: 'deposit <amount>'
          };
