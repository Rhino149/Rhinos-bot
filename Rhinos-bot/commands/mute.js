const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  const settings = message.client.getSettings(message.guild.id)
  let reason = args.slice(1).join(' ');
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.reply("You dont have the right perms to use this command....").then(m => m.delete(5000));
  };
  //!tempmute @user 1s/m/h/d
  let user = message.mentions.users.first();
  if (settings.modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
    let modLogChannel = message.guild.channels.find(c => c.name === settings.modLogChannel);
    if (!modLogChannel) return message.reply('I cannot find a mod-log channel');
  if(!user) return message.reply("Couldn't find user.");
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.');
  let muterole = message.guild.roles.find(muterole => muterole.name === "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  message.guild.member(user).addRole(muterole);
  message.channel.send(`<@${user.id}> has been muted`);

const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'User muted')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reason', reason);
    modLogChannel.send(embed);
}
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["silence"],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: 'mute',
    category: "Moderation",
    description: 'Mutes the user.',
    usage: 'mute [mention] [reason]'
  };