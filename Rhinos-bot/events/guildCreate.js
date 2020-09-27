// This event executes when a new guild (server) is joined.

module.exports = (client, guild) => {
console.log(`${guild.id}, ${guild.name}, ${guild.owner.user.tag}`)
  client.logger.cmd(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot with ${guild.memberCount} users. Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  client.channels.cache.get('717139782924238889').send(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot with ${guild.memberCount} users. Owner: ${guild.owner.user.tag} (${guild.owner.user.id}).`);
};
