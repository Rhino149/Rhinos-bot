exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.channel.guild.members.get(args[0]) || message.member;
    if (!member) return message.channel.send('You must mention someone or give their ID!')
    if (member.user.bot === true) return message.channel.send('Bots cannot receive money!')
	
    if (!args[1]) return message.channel.send('You need to specify a number to give.')
    if (message.mentions.members.first() === message.author) return message.channel.send('You cannot give yourself money.')
	if (message.author.id === member.user.id) return message.channel.send("Cannot give yourself/No one money")
    if (isNaN(args[1])) return message.channel.send('Invalid amount.')
     if (message.channel.guild.members.find(m => m.id === message.author.id)) {
    client.money.ensure(`${message.author.id}`, {
      user: message.author.id,
      money: 0
    })
    
    const yourMoney = client.money.get(`${message.author.id}`, 'money')
    if (yourMoney < args[1]) return message.channel.send('You do not have enough money.')
    if (yourMoney >= 3000000) return message.channel.send('You are too rich.')
	if (args[1] <= 0) return message.channel.send('The hell its not cool to give nothing be nice!')
    client.money.ensure(`${member.user.id}`, {
      user: member.user.id,
      money: 0
    })
  
    const money = client.money.get(`${member.user.id}`, 'money')
    client.money.set(`${member.user.id}`, Number(money) + Number(args[1]), 'money')
    client.money.set(`${message.author.id}`, Number(yourMoney) - Number(args[1]), 'money')
    message.channel.send(`You gave **${member.user.tag}** \`$${Number(args[1])}\`\n**${member.user.tag}'s balance:** $${Number(money) + Number(args[1])}\n**Your balance:** $${Number(yourMoney) - Number(args[1])}`)
  }
}
  exports.conf = {
    enabled: true,
    aliases: ['give', 'givemoney', 'paymoney'],
    guildOnly: true,
    permLevel: 'User'
  }
  
  exports.help = {
    name: 'pay',
    category: 'Economy',
    description: 'Pays <money> to <member>.',
    usage: 'pay <member> <money>'
  }
  
