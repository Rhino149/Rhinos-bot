const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() ? message.mentions.members.first() : message.member
  const prefix = message.guild === null ? 'r!' : client.getSettings(message.guild.id).prefix
  
  client.inventory.ensure(member.id, {
    member: member.id,
    rings: 0,
    petfood: 0,
    seeds: 0,
    stones: 0,
    cars: 0,
    plants: 0
  })
  const cars = client.inventory.get(member.id, 'cars')
  const stones = client.inventory.get(member.id, 'stones')
  const plants = client.inventory.get(member.id, 'plants')
  if (member.id === message.author.id) {
    if (cars == undefined) {
      client.inventory.set(`${message.author.id}`, parseInt(0), 'cars')
    }
    if (stones == undefined) {
      client.inventory.set(`${message.author.id}`, parseInt(0), 'stones')
    }
    if (plants == undefined) {
      client.inventory.set(`${message.author.id}`, parseInt(0), 'plants')
    }
  let embed = new Discord.RichEmbed()
    .setTitle('🎒 Your Inventory')
    .setColor("RANDOM")
    .addField(`💍 Wedding Rings:`, client.inventory.get(member.id, 'rings'))
    .addField(`🌰 Seeds:`, client.inventory.get(member.id, 'seeds'))
    .addField(`🥫 Pet Food`, client.inventory.get(member.id, 'petfood') + ' cans')
    .addField(`:Stone: Stones`, client.inventory.get(member.id, 'stones'))
    .addField(`:red_car: Cars`, client.inventory.get(member.id, 'cars'))
    .addField(`:seedling: Plants`, client.inventory.get(member.id, 'plants'))
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  message.channel.send(embed)
  } else {
    let embed = new Discord.RichEmbed()
    .setTitle(`🎒 ${member.user.tag}'s Inventory`)
    .setColor("RANDOM")
    .addField(`💍 Wedding Rings:`, client.inventory.get(member.id, 'rings'))
    .addField(`🌰 Seeds:`, client.inventory.get(member.id, 'seeds'))
    .addField(`🥫 Pet Food`, client.inventory.get(member.id, 'petfood') + ' cans')
    .addField(`:Stone: Stones`, client.inventory.get(member.id, 'stones'))
    .addField(`:red_car: Cars`, client.inventory.get(member.id, 'cars'))
    .addField(`:seedling: Plants`, client.inventory.get(member.id, 'plants'))
    .setFooter(`Responding to ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp()
  message.channel.send(embed)
  }
}

exports.conf = {
  enabled: true,
  aliases: ['inv', 'backpack', 'bp', 'bag'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'inventory',
  category: 'Economy',
  description: 'Shows all things in your inventory.',
  usage: 'inventory'
}
