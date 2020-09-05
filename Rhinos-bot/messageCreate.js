/*odule.exports = async (client, msg) => {
	if (msg.author.bot) return
	const settings = msg.settings = client.getSettings(msg.guild);
const args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
  if (!cmd) return;

const cooldowns = client.cooldowns
if (!cooldowns.has(cmd.help.name)) {
cooldowns.set(cmd.help.name, new Discord.Collection())
}
const now = Date.now();
const timestamps = cooldowns.get(cmd.help.name)
const cooldownAmount = (cmd.help.cooldown || 3) * 1000;
if (timestamps.has(msg.author.id)) {
const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
if (now < expirationTime) {
	const timeLeft = (expirationTime - now) / 1000;
	return msg.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${cmd.help.name}\` command.`)
}
}
timestamps.set(msg.author.id, now)
setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount)
*/
