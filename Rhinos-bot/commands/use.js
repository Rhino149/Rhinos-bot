const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
if (!args[0]) return message.channel.send(`You need to specify an item to use. r!store`)
	const items = ['weddingring', 'ring', 'food', 'petfood', 'seed', 'seeds', 'stone', 'stones', 'car', 'cars']
	if (!items.includes(args[0])) return message.channel.send('Invalid item.')
	if (!args[1]) return message.channel.send(`You need to specify how much/many you want to use.`)
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

