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
const amount = Number(args[0])
        if (money < amount)
        return message.channel.send('You do not have enough money to deposit.')
        if (bank >= 5000000)
        return message.channel.send("Sorry but you hit max bank size.")

        if (amount <= 0) 
            return message.channel.send('You cannot deposit nothing.')
            if (amount > 5000000) 
            return message.channel.send('You cannot deposit this much.')
	if (amount < 1)
	return message.channel.send('Must be a whole number.')

            if (bank == NaN)
        return client.money.get(key, 'bank')
        else {
if (amount && amount <= money) {
	if (amount + bank > 5000000) {
        return message.channel.send(`You can only hold ${Number(5e6).toLocaleString()} In your bank will change in the future`)
}
        if (amount < 1 || !Number.isInteger(Number(amount))) {
return message.channel.send('Needs to be a whole number greater than 0')
}
            message.channel.send(`You deposited $${amount.toLocaleString('en')}.`)
            client.money.set(key, (money - amount), 'money');
            client.money.set(key, (bank + amount), 'bank');
        } else {
	return message.channel.send(`You cant deposit more than you have out in your pocket: $${Number(money).toLocaleString}`)
	}
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
