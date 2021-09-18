const Discord = require('discord.js');
const prefix = process.env.BotPrefix;


let helpembed = new Discord.MessageEmbed()
    .setTitle("nOS Help")
    .setColor("#07C902")
    .addField("PREFIX:", process.env.BotPrefix)
    .addField(":help", "Tells you some detailed information about the bot.")
    .addField(":ping", "Gets the ping for the bot.")
    .addField("Admin Commands", "Only commands that admins can use!")
    .addField(":say", "Makes the bot say whatever the user has requested. Runs bot code(Owner Only!)")
    .addField("Network Commands", "Only network members can use these!")
    .addField(":restrict <user> <reason>", "Globally bans someone from the HawkOS module.")
    .addField(":get <user>", "Gets a user from the DB")
    .addField(":unrestrict <user>", " Unbans a user from the DB")
    .addField(":eval", "Runs bot code(Owner Only!)")

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
