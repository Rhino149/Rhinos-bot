exports.run = async (client, message, args) => {
      if (message.deletable) {
            message.delete();
        }
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("You can't delete messages....").then(m => m.delete(5000));
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Yeah.... That's not a number? I also can't delete 0 messages by the way.").then(m => m.delete(5000));
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("Sorryy... I can't delete messages.").then(m => m.delete(5000));
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`)).then(sentMessage => {
                sentMessage.delete(3000)
            .catch(err => message.reply(`Something went wrong... ${err}`)); 
            })};
	    /*
	const user = message.mentions.users.first();
// Parse Amount
const amount = !!parseInt(message.content.split(' ')[1]) ? parseInt(message.content.split(' ')[1]) : parseInt(message.content.split(' ')[2])
if (!amount) return message.reply('Must specify an amount to delete!');
if (!amount && !user) return message.reply('Must specify a user and amount, or just an amount, of messages to purge!');
// Fetch 100 messages (will be filtered and lowered up to max amount requested)
message.channel.fetchMessages({
 limit: 100,
}).then((messages) => {
 if (user) {
 const filterBy = user ? user.id : client.user.id;
 messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
 }
 message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
messagesDeleted = messages.length;
	message.channel.send(`Messages deleted ${messagesDeleted}`).delete(3000).catch(error => console.log(error.stack));
});
}*/
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["clear", "nuke"],
        permLevel: "Moderator"
      };

    exports.help = {
        name: "purge",
        category: "Moderation",
        description: "Purge some Messages",
        usage: "purge [amount]"
    };
