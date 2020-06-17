exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const sides = ['heads', 'tails']
    const side = sides[Math.floor(Math.random() * sides.length)]
    message.channel.send('The coin landed on ' + side + '.')
  }
  
  exports.conf = {
    enabled: true,
    aliases: ['flipcoin', 'fc'],
    guildOnly: true,
    permLevel: 'User'
  }
  
  exports.help = {
    name: 'coin',
    category: 'Fun',
    description: 'Flips a coin.',
    usage: 'coin'
  }
  