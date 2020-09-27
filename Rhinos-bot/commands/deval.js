const Discord = require('discord.js')
exports.run = async (client, message, args, level) => { 
  const code = args.join(" ");
 let evalTime;

try {
	const before = Date.now();
	evalTime = Date.now() - before
    if(code) {
        
        const evaled = eval(code, {depth: 0} )
        const clean = await client.clean(client, evaled);
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setThumbnail(message.author.avatarURL())
        .setColor(3066993)
        .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField("Output", `\`\`\`js\n${clean}\n\`\`\``)
        .setTimestamp(new Date ())
	.setFooter(`evaluated in ${Number(evalTime).toLocaleString('en')}ms`)
        message.channel.send(embed)
    }
} catch(err) {
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username)
  .setThumbnail(message.author.avatarURL())
  .setColor(15158332)
  .addField("Input", `\`\`\`${code}\`\`\``)
  .addField("Output", `\`\`\`js\n${err}\n\`\`\``)
  .setTimestamp(new Date ())
.setFooter(`evaluated in ${evalTime}ms`)
  message.channel.send(embed)
    /*  message.channel.send({embed: {
      color: 15158332,
      title: "Evaluation Cancelled",
      description: ${err}`,
      author: {
        name: message.author.username,
        icon_url: message.author.avatarURL
      },
      timestamp: new Date()
    }});
    */
  }
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["de"],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "deval",
  category: "Developer",
  description: "Evaluates arbitrary javascript.",
  usage: "deval [...code]"
};
/*
        message.channel.send({embed: {
        color: 3066993,
        title: "Evaluation Executed!",
        description: `${evaled}`,
            field: [
                {
                name: "Output:",
                value: `${evaled}`,
            },
          ],
        author: {
          name: message.author.username,
          icon_url: message.author.avatarURL
        },
        timestamp: new Date(),
      }});
    }
    */
