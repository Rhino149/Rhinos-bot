const Discord = require('discord.js')
const ms = require('ms')

exports.run = async (client, message, args) => {
  const reminderTime = args[0]
  if (!reminderTime) {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle('Invalid Syntax')
      .setDescription("`/remind [time] [message]`\n\nUse 's' for seconds, 'm' for minutes, 'h' for hours and 'd' for days. If a measurement of time is not specified, the time will be in seconds.")

    message.channel.send(embed)
  }

  const reminder = args.slice(1).join(' ')

  if (reminder) {
    const success = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle('**SUCCESS:**')
      .setDescription(`I will send you a DM in **${reminderTime}**!`)
      .setTimestamp()

    const fail = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle('**FAIL:**')
      .setDescription('I couldn\'t send you a DM. Please check to see if you have direct messaging enabled.')
      .setTimestamp()

    message.channel.send(success)

    setTimeout(function () {
      const remindEmbed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .addField('Reminder:', `${reminder}`)
        .setTimestamp()

      message.author.send(remindEmbed)
        .catch(() => message.channel.send(fail))
    }, ms(reminderTime))
  } else {
    message.channel.send(embed)
  }
}

exports.conf = {
  enabled: true,
  aliases: ['r', 'remindme'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'remind',
  category: 'Info',
  description: 'Reminds you at the specified time of the specified thing.',
  usage: 'remind <time> <text>'
}
