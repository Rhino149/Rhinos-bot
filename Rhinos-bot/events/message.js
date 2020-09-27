// The MESSAGE event runs anytime a message is received
// Note that due to the binding of client to every event, every event
// goes `client, other, args` when this function is run.
const Discord = require('discord.js')
module.exports = async (client, message) => {
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").

  if (message.author.bot) return;

  // Grab the settings for this server from Enmap.
  // If there is no guild, get default conf (DMs)
  const settings = message.settings = client.getSettings(message.guild);

  // Checks if the bot was mentioned, with no message after it, returns the prefix.
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.reply(`My prefix on this guild is \`${settings.prefix}\``);
  }

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if (message.content.toLowerCase().indexOf(settings.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // If the member on a guild is invisible or not cached, fetch them.
  if (message.guild && !message.member) await message.guild.members.fetch(message.author);

  // Get the user or member's permission level from the elevation
  const level = client.permlevel(message);

  // Check whether the command, or alias, exist in the collections defined
  // in app.js.
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  // using this const varName = thing OR otherthign; is a pretty efficient
  // and clean way to grab one of 2 values!
  if (!cmd) return;

  // Some commands may not be useable in DMs. This check prevents those commands from running
  // and return a friendly error message.
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
if (cmd && !cmd.conf.enabled)
	return message.channel.send("Sorry but this command has been disabled by the devs")

const cooldowns = client.cooldowns
	if (!cooldowns.has(cmd.help.name)) {
    cooldowns.set(cmd.help.name, new Discord.Collection());
}

const now = Date.now();
const timestamps = cooldowns.get(cmd.help.name)
const cooldownAmount = (cmd.help.cooldown || 3) * 1000;
if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply(`please wait ${client.parseTime(timeLeft.toFixed(1))} before reusing the \`${cmd.help.name}\` command.`)
    }
}

timestamps.set(message.author.id, now)
setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.systemNotice === "true") {
      return message.channel.send(`You do not have permission to use this command.
  Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
    } else {
      return;
    }
  }
const idMatcher = /([0-9]{15,21})/g
const userMentionMatcher = /<@!?([0-9]{15,21})>/
this.msg = message
this.args = args
client.resolveUser = (consumeRest = false, consumeOnFail = true) => {
 

const args = consumeRest
      ? this.args.splice(0).join(' ')
      : this.args.shift();
 
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
  // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
  // The "level" command module argument will be deprecated in the future.
  message.author.permLevel = level;
  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }
  // If the command exists, **AND** the user has permission, run it.
  client.logger.cmd(`[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);
};
