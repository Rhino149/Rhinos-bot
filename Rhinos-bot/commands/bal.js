const Discord = require('discord.js')
exports.run = async (client, message, args) => {
 //   const member = message.mentions.members.first() ? message.mentions.members.first() : message.member.user
const idMatcher = /([0-9]{15,21})/g
const userMentionMatcher = /<@!?([0-9]{15,21})>/
this.msg = message
this.args = args
client.resolveUser = (consumeRest = false, consumeOnFail = true) => {
 
/*const idMatcher = /^([0-9]{15,21})$/;
const userMentionMatcher = /<@!?([0-9]{15,21})>/;
*/
const args = consumeRest
      ? this.args.splice(0).join(' ')
      : this.args.shift();
	/*
if (!args) {
      return null
}*/
const idMatch = idMatcher.exec(consumeRest) || userMentionMatcher.exec(consumeRest)
let ret = null;

if (idMatch) { 
	
      ret = this.msg.channel.guild.members.cache.get(idMatch[1])

    } else {
if (consumeRest.length > 5 && consumeRest.slice(-5, -4) === '#') {
	ret = this.msg.channel.guild.members.cache.find(member => `${member.user.tag}` === consumeRest || `${member.nickname}#${member.user.discriminator}` === consumeRest);
      } else {
        ret = this.msg.channel.guild.members.cache.find(member => member.user.username === consumeRest || member.nickname === consumeRest);
      }
    }

if (!ret && !consumeOnFail) {
      this.args.unshift(...args.split(' '));
    }
    
return ret ? ret.user : null;
}
//console.log(client.resolveUser(args.join(' ')).user)
	const input = message.content
const prefix = input.slice(0, 2).split(message.settings.prefix)
const user = input.split('"').slice(1, 2).join()
const member = client.resolveUser(args.join(' ')) || message.member.user
//console.log(member.tag)
  //console.log(member.username === message.author.username)
     client.money.ensure(member.id, {
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
      let embed = new Discord.MessageEmbed()
      .setAuthor(`${member.tag}'s bal`)
      .addField(`Wallet:`, `$${Number(money).toLocaleString()}`, inline = true)
      .addField( `Bank:`, `$${Number(bank).toLocaleString()}/5,000,000`, inline = true)
      .addField(`Support`, '[Support Server](https://discord.gg/bzRh5Mz)')
      .setColor("RANDOM")
      message.channel.send(embed)
      //return message.channel.send("**TIP:** if you wanna see someones elses bal do r!bal \"user.username/user.tag\" with quotes or use id/mention")
      } else {

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${member.tag}'s bal`)
        .addField(`Wallet:`, `$${Number(money).toLocaleString()}.`, inline = true)
        .addField( 'Bank:', `$${Number(bank).toLocaleString()}/5,000,000`, inline = true)
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
     permLevel: 'User'
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
