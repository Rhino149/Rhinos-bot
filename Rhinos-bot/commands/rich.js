const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() ? message.mentions.members.first() : message.member
   
     client.money.ensure(`${member.id}`, {
       member: member.id,
       money: 0
     })

     const money = client.money.get(member.id, 'money')
     const target = message.mentions.users.first() || message.author; 
     let currency = money
     return message.channel.send(.sort((a, b) => b.money - a.money).filter(user => client.users.cache.has(user.user_id)).first(10).map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${client.user.money}💰`).join('\n'), { code: asciidoc } );
  };
  exports.conf = {
    enabled: true,
    aliases: ["lb"],
    guildOnly: true,
    permLevel: 'User'
  };
  
  exports.help = {
    name: 'rich',
    category: 'Economy',
    description: 'See the rich.',
    usage: 'rich'
  };
  