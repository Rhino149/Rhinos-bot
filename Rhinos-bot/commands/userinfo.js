const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let inline = true
    let presence = true
    const status = {
        online: "<:online:693937455337832539> Online",
        idle: "<:idle:706398484818821120> Idle",
        dnd: "<:dnd:706398551948918844> Do Not Disturb",
        offline: "<:offline:706398707477643275> Offline/Invisible"
      }
        
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author

if (
  member.user.bot === true) {
    bot = "<:bottag:693940970042949724> Yes";
  } else {
    bot = "<:users:706395246673526794> No";
  }

            let embed = new Discord.MessageEmbed()
                .setAuthor(member.user.username)
                .setThumbnail((target.displayAvatarURL))
                .setColor("#00ff00")
                .addField("Full Username", `${member.user.tag}`, inline)
                .addField("ID", member.user.id, inline)
                .addField("Nickname", `${member.nickname !== null ? `<:yes:691481206868410408> Nickname: ${member.nickname}` : "<a:NoNo:707845033700884510> None"}`, true)
                .addField("Bot", `${bot}`,inline, true)
                .addField("Status", `${status[member.user.presence.status]}`, inline, true)
                .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "<a:NoNo:707845033700884510> Not playing"}`,inline, true)
                .addField("Roles", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "<a:NoNo:707845033700884510> No Roles"}`, true)
                .addField("Joined Discord At", member.user.createdAt)
                .setFooter(`Information about ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            
    };

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["ui"],
    permLevel: "User"
  };
exports.help = {
    name: "userinfo",
    category: "Info",
    description: "If you wanna see someones or yours UI.",
    usage: "userinfo [mention]"
};