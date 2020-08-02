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
const list = client.guilds.get(message.guild.id)
const lb = client.money.array().sort((a, b) => b.money - a.money)
.filter(u => list.members.has(u.member))
.filter(m => m.money > 0).splice(0, 5)

const embed = new Discord.RichEmbed() 
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor(0x00AE86)
    .setDescription("Top 5 richest people in the server")
lb.map((user, position) => embed.addField("[#**" + (position + 1) + "**] " + client.users.get(user.member).tag, ` They have $${client.money.get(user.member, 'money').toLocaleString()} <:rhino_coin:734247475207995423>`)
  )
message.channel.send(embed);
}
}
  exports.conf = {
    enabled: false,
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

