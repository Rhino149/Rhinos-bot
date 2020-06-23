module.exports = async client => {
  // Log that the bot is online.
  await client.wait(1000);

  // This loop ensures that client.application always contains up to date data
  // about the app's status. This includes whether the bot is public or not,
  // its description, owner(s), etc. Used for the dashboard amongs other things.
  client.application = await client.fetchApplication();
  if (client.owners.length < 1) client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
  setInterval( async () => {
    client.owners = [];
    client.application = await client.fetchApplication();
    client.application.team ? client.owners.push(...client.application.team.members.keys()) : client.owners.push(client.application.owner.id);
  }, 60000);

  // Check whether the "Default" guild settings are loaded in the enmap.
  // If they're not, write them in. This should only happen on first load.
  if (!client.settings.has("default")) {
    if (!client.config.defaultSettings) throw new Error("defaultSettings not preset in config.js or settings database. Bot cannot load.");
    client.settings.set("default", client.config.defaultSettings);
  }

  // Initializes the dashboard, which must be done on ready otherwise some data
  // may be missing from the dashboard. 
  require("../util/dashboard")(client);  

  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`, "ready");


/*
(`${client.settings.get("default").prefix}help and in ${client.guilds.size} guilds, With ${client.users.size} Users`, 15000, (`Watching Rhino-Bot support!`, {type: "PLAYING"}))
*/
let activities = [
 "Rhino-Bot support!",
"I am a growing Economy bot Invite me!",
"To invite me do r!invite in server with the bot!"], i = 0;
  // Make the bot "play the game" which is the help command with default prefix.
  setInterval(function() { 
  
    client.user.setActivity(`My prefix is ${client.settings.get("default").prefix} | I'm in ${client.guilds.size} servers that are using me! | ${activities[i++ % activities.length]}`, {type: "PLAYING"})
  
}, 10000)
};
