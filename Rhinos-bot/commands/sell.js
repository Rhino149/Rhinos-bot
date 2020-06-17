exports.run = async (client, message, args, level) => {
  if (!args[0]) return message.channel.send(`You need to specify an item to sell. r!inv`)
  const items = ['weddingring', 'ring', 'food', 'petfood', 'seed', 'seeds', 'stone', 'stones', 'car', 'cars']
  if (!items.includes(args[0])) return message.channel.send('Invalid item.')
  if (!args[1]) return message.channel.send(`You need to specify how much/many you want to sell.`)
  if (isNaN(args[1])) return message.channel.send(`${args[1]} is not a valid number.`)
  const key = `${message.author.id}`
  
  client.money.ensure(key, {
    member: key,
    money: 0
  })
  
  client.inventory.ensure(key, {
    member: key,
    rings: 0,
    petfood: 0,
    seeds: 0,
    stones: 0,
    cars: 0,
    plants: 0
  })
      
      const money = client.money.get(key, 'money')
      
    function sellItem(money, price, quantity, item, inventory) { 
      if (args[1] <= 0) return message.channel.send("Cannot sell less than 1.")
      const total = price * quantity
      client.money.set(key, money + total, 'money')
      
          message.channel.send(`You sold \`${args[1]} ${item}s\` for \`$${price * quantity}\`.\n**New balance:** ${money + total}`)
          if (args[0] === 'weddingring' || args[0] === 'ring' || args[0] === 'rings') {
            const number = client.inventory.get(key, 'rings')
		  if (number <= 0) return message.channel.send("Not enough rings to sell")
		  if (number <= args[1]) return message.channel.send("Not enough rings to sell")
            client.inventory.set(key, (number - parseInt(args[1])), 'rings')
          }
          
          if (args[0] === 'food' || args[0] === 'petfood') {
            const number = client.inventory.get(key, 'petfood')
		  if (number <= 0) return message.channel.send("Not enough petfood to sell")
		  if (number <= args[1]) return message.channel.send("Not enough petfood to sell")
		  
            client.inventory.set(key, (number - parseInt(args[1])), 'petfood')
          } else
          
          if (args[0] === 'seed' || args[0] === 'seeds') {
            const number = client.inventory.get(key, 'seeds')
		  if (number <= 0) return message.channel.send("Not enough seeds to sell")
		  if (number <= args[1]) return message.channel.
send("Not enough seeds to sell")
            client.inventory.set(key, (number - parseInt(args[1])), 'seeds')
          } else
          if (args[0] === 'stone' || args[0] === 'stones') {
            const number = client.inventory.get(key, 'stones')
		  if (number <= 0) return message.channel.send("Not enough stones to sell")
		  if (number <= args[1]) return message.channel.
send("Not enough stones to sell")
            client.inventory.set(key, (number - parseInt(args[1])), 'stones')
          } else
          if (args[0] === 'car' || args[0] === 'cars') {
            const number = client.inventory.get(key, 'cars')
		  if (number <= 0) return message.channel.send("Not enough cars to sell")
		  if (number <= args[1]) return message.channel.
send("Not enough cars to sell")
            client.inventory.set(key, (number - parseInt(args[1])), 'cars')
          }
        }
        
        if (args[0] === 'wedding' || args[0] === 'ring' || args[0] === 'rings') {
          const rings = args[0] > 1 ? 'wedding rings' : 'wedding ring'
          sellItem(money, 1300, args[1], rings)
        } else 
        
        if (args[0] === 'food' || args[0] === 'petfood') {
          const food = args[0] > 1 ? 'cans of pet food' : 'can of pet food'
          sellItem(money, 50, args[1], food)
        } else
        
        if (args[0] === 'seed' || args[0] === 'seeds') {
          const seeds = args[0] > 1 ? 'seeds' : 'seed'
          sellItem(money, 5, args[1], seeds)
        } else
        if (args[0] === 'stone' || args[0] === 'stones') {
          const stones = args[0] > 1 ? 'stones' : 'stone'
          sellItem(money, 1, args[1], stones)
      } else
      if (args[0] === 'car' || args[0] === 'cars') {
        const cars = args[0] > 1 ? 'cars' : 'car'
        sellItem(money, 25000, args[1], cars)
      }
  };
  
  exports.conf = {
    enabled: false,
    aliases: [],
    guildOnly: true,
    permLevel: 'Bot Owner'
  }
  
  exports.help = {
    name: 'sell',
    category: 'Being worked on/Broken',
    description: 'Sells items',
    usage: 'sell [amount of stone]'
  }
  
