exports.run = async (client, message, args, level) => {
    if (!args[0]) return message.channel.send(`You need to specify an item to buy. r!store`)
    const items = ['weddingring', 'ring', 'food', 'petfood', 'seed', 'seeds', 'stone', 'stones', 'car', 'cars']
    if (!items.includes(args[0])) return message.channel.send('Invalid item.')
    if (!args[1]) return message.channel.send(`You need to specify how much/many you want to buy.`)
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
      cars: 0
    })
    
    const money = client.money.get(key, 'money')
    if (args[1] < 1 || !Number.isInteger(Number(args[1]))) {
      return message.channel.send('Needs to be a whole number greater than 0')
}
 else {
    function buyItem(money, price, quantity, item) {
      if (args[1] <= 0) return message.channel.send("Cannot buy less than 1.")
      
      const total = price * quantity
      if (money < price * quantity) return message.channel.send('You do not have enough money to complete this transaction.')
      client.money.set(key, money - total, 'money')
      const items = item > 1 ? item : item + 's'
      message.channel.send(`You bought \`${args[1]} ${items}\` for \`$${price * quantity}\`.\n**New balance:** ${money - total}`)
      
      if (args[0] === 'weddingring' || args[0] === 'ring' || args[0] === 'rings') {
        const number = client.inventory.get(key, 'rings')
        client.inventory.set(key, (number + parseInt(args[1])), 'rings')
      } else
      
      if (args[0] === 'food' || args[0] === 'petfood') {
        const number = client.inventory.get(key, 'petfood')
        client.inventory.set(key, (number + parseInt(args[1])), 'petfood')
      } else
      
      if (args[0] === 'seed' || args[0] === 'seeds') {
        const number = client.inventory.get(key, 'seeds')
        client.inventory.set(key, (number + parseInt(args[1])), 'seeds')
      } else
      if (args[0] === 'stone' || args[0] === 'stones') {
        const number = client.inventory.get(key, 'stones')
        client.inventory.set(key, (number + parseInt(args[1])), 'stones')
      } else
      if (args[0] === 'car' || args[0] === 'cars') {
        const number = client.inventory.get(key, 'cars')
        client.inventory.set(key, (number + parseInt(args[1])), 'cars')
      }
    }
    
    if (args[0] === 'wedding' || args[0] === 'ring' || args[0] === 'rings') {
      const rings = args[0] > 1 ? 'wedding rings' : 'wedding ring'
      buyItem(money, 15000, args[1], rings)
    } else
    
    if (args[0] === 'food' || args[0] === 'petfood') {
      const food = args[0] > 1 ? 'cans of pet food' : 'can of pet food'
      buyItem(money, 75, args[1], food)
    } else
    
    if (args[0] === 'seed' || args[0] === 'seeds') {
      const seeds = args[0] > 1 ? 'seeds' : 'seed'
      buyItem(money, 15, args[1], seeds)
    } else
    if (args[0] === 'stone' || args[0] === 'stones') {
      const stones = args[0] > 1 ? 'stones' : 'stone'
      buyItem(money, 3, args[1], stones)
  } else
  if (args[0] === 'car' || args[0] === 'cars') {
    const cars = args[0] > 1 ? 'cars' : 'car'
    buyItem(money, 25000, args[1], cars)
  }
}
};
  
  exports.conf = {
    enabled: true,
    aliases: ['purchase'],
    guildOnly: true,
    permLevel: 'User'
  }
  
  exports.help = {
    name: 'buy',
    category: 'Economy',
    description: 'Purchases an item from the store.',
    usage: 'buy <item>'
  }
