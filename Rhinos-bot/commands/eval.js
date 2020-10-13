// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS


// However it's, like, super ultra useful for troubleshooting and doing stuff
// you don't want to put in a command.
const http = require('http')
const hastebin = require("hastebin-gen")
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars

  const code = args.join(" ");
  try {
    const evaled = eval(code);
	 
    const clean = await client.clean(client, evaled);

      if (clean.length >= 2000) {
      hastebin(clean, { extension: "txt" }).then(haste => {
    // Logs the created hastebin url to the console
    message.channel.send(haste); // https://hastebin.com/someid.txt
	console.log(haste)
}).catch(error => {
    // Handle error
	message.channel.send("Output exceeded 2000 characters. Sending as a file. also hastebin service might be Unavailable", { files: [{ attachment: Buffer.from(clean), name: "output.txt" }] })
    console.error(error);
}) 

}
    message.channel.send(clean, { code: "js" } );
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "eval",
  cooldown: 1,
  category: "Developer",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};
