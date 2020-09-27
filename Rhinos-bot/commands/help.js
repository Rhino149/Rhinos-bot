const Discord = require('discord.js')

exports.run = (client, message, args, level) => {
  const prefix =  client.getSettings(message.guild.id).prefix

  try {
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
	.setTitle('Help')
	.setColor("RANDOM")
	.setThumbnail(client.user.avatarURL)
	.addField('Commands', `Commands can be found by typing \`${prefix}commands\`.`)
	.addField('Want to invite me to your Discord?', '[Click here to invite me to your server.](https://discordapp.com/oauth2/authorize?client_id=636311667239551006&scope=bot&permissions=2146958847)')
        .addField('Need more assistance?', '[Click here to join the official Rhino Bot support server](https://discord.gg/bzRh5Mz)')
      message.channel.send(embed)
    } else {
      // Show individual command/alias/category's help
      let command = args[0]
      if (client.commands.has(command) || (client.aliases.has(command))) {
        const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
        const embedTiny = new Discord.MessageEmbed()
	      	.setTitle(`Help - ${prefix}${command.help.name}`)
	      	.setColor("RANDOM")
          .setThumbnail(client.user.avatarURL)
          .setDescription(`${command.help.description}\n\n**Usage:** ${command.help.usage}\n**Aliases:** ${command.conf.aliases.join(' | ') || 'none'}`)
	      	.addField('Permission level', `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`, true)
          .addField('Category', command.help.category, true)
          .addField('Guild only', command.conf.guildOnly ? 'Yes' : 'No', true)

        message.channel.send(embedTiny);
      } else {
        const currentCategory = ''
        let output = ''
        const userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level)

        const sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 : p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1)
        sorted.forEach(c => {
          const cat = c.help.category.toLowerCase()
          if (cat == args[0].toLowerCase()) {
            output += '`' + c.help.name + '` '
          }
        })

        if (!output) return message.reply('That\'s not a valid command.')
      }
    }
  }catch (e) {
    console.log('There was an error!\n' + e.stack)
  }
}

exports.conf = {
  enabled: true,
  aliases: ['h'],
  guildOnly: false,
  permLevel: 'User'
}

exports.help = {
  name: 'help',
  category: 'Utility',
  description: 'Shows useful information.\nIf <command> is specified, will show description and usage of that command.',
  usage: 'help <command>'
}
/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.


exports.run = (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = `= Command List =\n\n[Use ${message.settings.prefix}help <commandname> for details]\n\n Join our Support server if you need help\n https://discord.gg/bzRh5Mz`;
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n== ${cat} ==\n`;
        currentCategory = cat;
      }
      output += `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} :: ${c.help.description}\n`;
    });
    message.channel.send(output, {code: "asciidoc", split: { char: "\u200b" }});
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage:: ${command.help.usage}\naliases:: ${command.conf.aliases.join(", ")}\n= ${command.help.name} =`, {code:"asciidoc"});
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
*/
