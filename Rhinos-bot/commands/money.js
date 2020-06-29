const Discord = require('discord.js')
exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() ? message.mentions.members.first() : message.member
   
     client.money.ensure(`${member.id}`, {
       member: member.id,
       money: 0,
       bank: 0
     })
     const money = client.money.get(member.id, 'money')
     const bank = client.money.get(member.id, 'bank') 
      if (member.id === message.author.id) {
        if (bank == undefined) {
          client.money.set(`${message.author.id}`, parseInt(0), 'bank')
        };
      let embed = new Discord.RichEmbed()
      .setAuthor(`${member.user.tag}'s bal`)
      .addField(`Wallet:`, `$${Number(money).toLocaleString('en')}`, inline = true)
      .addField( `Bank:`, `$${Number(bank).toLocaleString('en')}/5,000,000`, inline = true)
      .addField(`Support`, '[Support Server](https://discord.gg/bzRh5Mz)')
      .setColor("RANDOM")
      message.channel.send(embed)
      return message.channel.send("**TIP:** if you need help with something ask us in our Support Server.")
      } else {
        let embed = new Discord.RichEmbed()
        .setAuthor(`${member.user.tag}'s bal`)
        .addField(`Wallet:`, `$${Number(money).toLocaleString('en')}.`, inline = true)
        .addField( 'Bank:', `$${Number(bank).toLocaleString('en')}/5,000,000`, inline = true)
        .addField(`Support`, '[Support Server](https://discord.gg/bzRh5Mz)')
        .setColor("RANDOM")
        message.channel.send(embed)
        return message.channel.send("**TIP:** if you need help with something ask us in our Support Server.")
      }

      };
   
   exports.conf = {
     enabled: true,
     aliases: ['money', 'balance', '$', 'wallet'],
     guildOnly: true,
     permLevel: 'User',
     cooldown: 5000
   }
   
   exports.help = {
     name: 'bal',
     category: 'Economy',
     description: 'Shows either yours or a mentioned user\'s money.',
     usage: 'bal [@name]'
   }
   /*
   ${bank !== undefined} ${undefined = 0}
   */
