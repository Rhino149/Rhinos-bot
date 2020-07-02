const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix = message.guild === null ? 'r!' : client.getSettings(message.guild.id).prefix
  try {
    if (!args[0]) {
      let currentCategory = ""

      let output = `Type ${prefix}commands <category> to view all commands in that category`
      const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );

      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\u200b\n== ${cat} ==\n`;
          currentCategory = cat;
        }
      })
/*
const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n\n Join our Support server if you need help\n https://discord.gg/bzRh5Mz`;
    const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      */
      const embed = new Discord.RichEmbed()
	  .setTitle('Commands')
	  .setColor("RANDOM")
	  .addField(`Type ${prefix}commands <category> to view all commands in that category`, 'Valid categories:\ `Moderation`, `Economy`, `System`, `Info`, `Fun`, `Developer` ')

      message.channel.send(embed)
    } else {
      let command = args[0]
      if (client.commands.has(command) || client.aliases.has(command)) {
        command = client.commands.get(command) || client.aliases.get(command)

        const embedTiny = new Discord.RichEmbed()
	      .setTitle(`Help - ${prefix}${command.help.name}`)
	      .setColor("RANDOM")
          .setThumbnail(client.user.avatarURL)
          .setDescription(`${command.help.description}\n\n**Usage:** ${command.help.usage}\n**Aliases:** ${command.conf.aliases.join(' | ') || 'none'}`)
	      .addField('Permission level', `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
          .addField('Category', command.help.category, true)
          .addField('Guild only', command.conf.guildOnly ? 'Yes' : 'No', true)

        message.channel.send(embedTiny)
      } else {
        const currentCategory = ''
        let output = ''

        const sorted = client.commands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : +1)
        sorted.forEach(c => {
          const cat = c.help.category.toLowerCase()
          if (cat == args[0].toLowerCase()) {
	output += '`' + c.help.name + '`, '
          }
        })

        if (!output) return message.reply(`That's not a valid category!`)
		 const embed = new Discord.RichEmbed()
	      .setTitle('Commands')
	      .setColor("RANDOM")
          .setThumbnail(client.user.avatarURL)
          .setDescription(output)

        message.channel.send(embed)
      }
    }
  }catch(e) {
    console.log('There was an error!\n' + e.stack);
  }
}
/*
catch(e){
      console.log(e.stack);
      */
exports.conf = {
  enabled: true,
  aliases: ['cmds', 'c'],
  guildOnly: true,
  permLevel: 'User'
}

exports.help = {
  name: 'commands',
  category: 'Utility',
  description: 'Displays a list of all commands under <category>.',
  usage: 'commands <category>'
}
