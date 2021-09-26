const Discord = require('discord.js');
const prefix = process.env.BotPrefix;


let helpembed = new Discord.MessageEmbed()
    .setTitle("nOS Help")
    .setColor("#07C902")
    .addField("PREFIX:", process.env.BotPrefix)
    .addField(process.env.BotPrefix + "help", "Tells you some detailed information about the bot.")
    .addField(process.env.BotPrefix + "ping", "Gets the ping for the bot.")
    .addField(process.env.BotPrefix + "credits", "Returns the given users Credits")
    .addField("Admin Commands", "Only commands that admins can use!")
    .addField(process.env.BotPrefix + "say", "Makes the bot say whatever the user has requested. Runs bot code(Owner Only!)")
    .addField("Network Commands", "Only network members can use these!")
    .addField(process.env.BotPrefix + "setcredits", "sets the given users Credits to the given number")
    .addField(process.env.BotPrefix + "restrict <user> <reason>", "Globally bans someone from the HawkOS module.")
    .addField(process.env.BotPrefix + "get <user>", "Gets a user from the DB")
    .addField(process.env.BotPrefix + "unrestrict <user>", " Unbans a user from the DB")
    .addField(process.env.BotPrefix + "eval", "Runs bot code(Owner Only!)")

module.exports = {
    name: 'help',
    aliases: ['commands', 'cmds'],
    description: 'sends a dm to the user with a list of commands',
    execute(message, args) {
        try {
            message.channel.send(helpembed);
        }
        catch (error) {
            let errorEmbed = new Discord.MessageEmbed()
                .setDescription(":flushed:  There was a problem executing this command.")
                .addField(`Detailed report:`, error)
                .setColor('#C10000');
            message.channel.send(errorEmbed);

        }
    },
};
