module.exports = async (client, error) => {
  client.logger.log(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`, "error");
client.channels.get('746858943317409813').send(`An error event was sent by Discord.js: \n${JSON.stringify(error)}`).then(msg => {
msg.channel.send(error)
})
};
