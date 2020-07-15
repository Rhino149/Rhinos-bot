const Discord = require('discord.js');
exports.run = async (client, message, member, user, guild, args) => {

    const emojis = [':first_place:', ':second_place:', ':third_place:'];
/*const members = message.guild.id || message.author.id
 client.money.ensure(`${message.guild.id}-${message.author.id}`, {
	 user: message.author.id,
	 guild: message.guild.id,
	 money: 0
    });
 const money = client.money.get(`${message.guild.id}-${message.author.id}`, 'money');

  // Rest of message handler

	//Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered1 = client.money.filter( m => `${m.money}` > 0 ).array()
  // Sort it to get the top results... well... at the top. Y'know.
  const filtered2 = filtered1.filter(p => p.guild === message.guild.d)
*/
if (message.guild) {
    const filtered = client.money
	.filter(m => m.money > 0)
	.filter(u => u.user >= client.users.has(message.author))
      .array();
  const sorted = filtered.sort(function(a, b) {
	  return b.money - a.money;
  });
	const top10 = sorted.slice(0, 5);
    
  // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed() 
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x00AE86)
    .setDescription("Top 5 richest people in the server")
	top10.forEach((data, index) => {
	const money = client.money.get(data.user, 'money')
    embed.addField("[#**" + (index + 1) + "**] " + client.users.get(data.user).tag, ` They have $${money.toLocaleString()} money.`)
	
  });
  
  return message.channel.send(embed);
}
}
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

