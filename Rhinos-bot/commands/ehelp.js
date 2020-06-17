const Discord = require('discord.js');
exports.run = (client, message, args, level) => {
let embed = new Discord.RichEmbed() 
.setAuthor("== Command List ==")
.addField("\u200b== Developer ==", "**r!setmoney  :: Pays <money> to <member>.\nr!where     :: Shows you which Discord has <channel id> and the owner's ID**", inline = false)
.addField("== Economy ==", "**r!Warning   :: WARNING THESE ECONOMOY COMMANDS ARE A WORK IN PROGESS.\nr!beg       :: Too lazy to work I guess.\nr!bet       :: Bet some coins.\n Also A thanks to Northern Lights#7944 for helping in the creation of this command.\nr!buy       :: Purchases an item from the store.\nr!daily     :: Claim your daily bonus every 24 hours.\nr!inventory :: Shows all things in your inventory.\nr!money     :: Shows either yours or a mentioned user's money.\nr!pay       :: Pays <money> to <member>.\nr!rep       :: Gives +1 rep to <member>.\nr!roulette  :: A twist to roulette.\n Also a thanks to Northern Lights#7944 for helping in the creation of this command.\nr!sell      :: Sells items\nr!shop      :: Shows a list of purchasable items.\nr!slots     :: Slots some coins.\nr!weekly    :: Claim your daily bonus every 24 hours.\nr!work      :: Go work lazy ass\nr!xp        :: Shows your XP\/level for this Discord.**", inline = false)    
.addField("== Fun ==", "**r!coin      :: Flips a coin.\nr!divorce   :: Divorces your spouse.\nr!donate    :: Shows information about donating.\nr!marry     :: Proposes to <member>.\nr!meme      :: Searches for the dankest of memes in the dankest of subreddits.\nr!rps       :: Simple game of Rock Paper Scissors.\nr!say       :: Makes the bot say whatever you want.\nr!urban     :: Searches the Urban Dictionary for [term].**", inline = false)
.addField("== Info ==", "**r!mylevel   :: Tells you your permission level for the current message location.\nr!ping      :: It like... Pings. Then Pongs. And it's not Ping Pong.\nr!remind    :: Reminds you at the specified time of the specified thing.\nr!stats     :: Gives some useful bot statistics\nr!userinfo  :: If you wanna see someones or yours UI.\nr!vote      :: Upvote the bot!**", inline = false)
.addField("== Moderation ==", "**r!ban       :: Bans the mentioned user.\nr!kick      :: Kicks the mentioned user.\nr!mute      :: Mutes the user.\nr!purge     :: Purges some Messages\nr!role      :: It can give\/remove a role to\/from a user.\n WARNING DO NOT GIVE MODS THE ABILITY TO HAVE ADMIN PERMS YOUR SERVER WILL BE AT GREAT RISK!\nr!tempmute  :: Mutes the user temporarily\nr!unban     :: Unbans the user.\nr!unmute    :: Unmutes the user**", inline =false)
.addField("== System ==", "**r!conf      :: Modify the default configuration for all guilds.\nr!deval     :: Evaluates arbitrary javascript.\nr!eval      :: Evaluates arbitrary javascript.\nr!help      :: Displays all the available commands for your permission level.\nr!invite    :: Gets the bots invite link.\nr!reboot    :: Shuts down the bot. If running under PM2, bot will restart automatically.\nr!reload    :: Reloads a command that\"s been modified.\nr!set       :: View or change settings for your server.**", inline = false)
.setColor(16767744)
.setTitle("Use r!help <commandname> for details")
    message.channel.send(embed)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["eh", "ehalp"],
    permLevel: "User"
  };
  
  exports.help = {
    name: "ehelp",
    category: "System",
    description: "Displays all the available commands for your permission level.",
    usage: "ehelp [command]"
  };
  