const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  const settings = message.client.getSettings(message.guild.id)
  let reason = args.slice(1).join(' ');
  if (!message.member.permissions.has("MANAGE_ROLES")) {
    return message.reply("You dont have the right perms to use this command....").then(m => m.delete(5000));
  };
  //!tempmute @user 1s/m/h/d
  let user = message.mentions.users.first();
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if (settings.modLogChannel && message.guild.channels.cache.find(c => c.name === settings.modLogChannel)) {
    let modLogChannel = message.guild.channels.cache.find(c => c.name === settings.modLogChannel);
    if (!modLogChannel) return message.reply('I cannot find a mod-log channel');
  if(!tomute) return message.reply("Couldn't find user.");
  if (reason.length < 1) return message.reply('You must supply a reason for the mute.');
  if(tomute.permissions.has("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
  let muterole = message.guild.roles.cache.find(muterole => muterole.name === "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.roles.create({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.cache.forEach(async (channel, id) => {
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
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");
  await(message.guild.member(user).roles.add(muterole));
  message.channel.send(`<@${user.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    message.guild.member(user).roles.remove(muterole);
    message.channel.send(`${message.author.username} has been unmuted`)
  }, ms(mutetime));

const embed = new Discord.MessageEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Action:', 'User muted')
    .addField('User:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Time', `${ms(ms(mutetime))}`)
    .addField('Reason', reason);
  modLogChannel.send(embed)
}
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Moderator"
  };
  
  exports.help = {
    name: 'tempmute',
    category: "Moderation",
    description: 'Mutes the user temporarily',
    usage: 'tempmute [mention] [s/m/h/d] [reason]'
  };