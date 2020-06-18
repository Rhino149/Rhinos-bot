exports.run = async (client, message, args, config) => { 
    if (!args[0]) return message.channel.send('You need to specify an amount to withdraw.')
  if (isNaN(args[0])) return message.channel.send('Invalid amount.')
  const key = message.author.id;
  
           client.money.ensure(`${key}`, {
             member: key,
             money: 0,
             bank: 0
           })

           const bank = client.money.get(key, 'bank')
           const money = client.money.get(key, 'money')
        if (bank < args[0]) 
            return message.channel.send('You do not have enough money to withdraw.')
        if (bank <= 0) 
            return message.channel.send('You do not have enough money to withdraw.') 
            if (args[0] <= 0) 
            return message.channel.send('You cannot withdraw nothing.')
	if (args[0] < 1)                                                   return message.channel.send('Must be a whole number.')
        if (bank == undefined)
        return message.channel.send('Your bank needs to have more than 0')
         else 
            message.channel.send(`You withdrawed $${Number(args[0])}.`)
            client.money.set(key, (money + Number(args[0])), 'money');
            client.money.set(key, (bank - Number(args[0])), 'bank');

         
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
