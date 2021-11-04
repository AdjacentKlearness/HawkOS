const Discord = require('discord.js');

const HelpEmbed = new Discord.MessageEmbed()
.setTitle("Status Manager Help Menu")
.addField("Argument 1 Inputs","get, set, help")
.addField("get", "Returns the current status settings")
.addField("set", "Sets the Status with the given settings")
.addField("help", `Shows this menu \n ----------------------------------------`)
.addField("Argument 2 Inputs", "playing, listening, watching")
.addField("PLAYING","Playing STATUS")
.addField("LISTENING","listening to STATUS")
.addField("WATCHING",`watching STATUS \n ----------------------------------------`)
.addField("Argument 3 Inputs", "What you want the status to be")

module.exports = {
    name: 'status',
    description: 'Manages Status',
    async execute(message, args, client) {
        message.reply("Testing:"+toString(args[1]))
        if (args[1] === "help") return message.reply(HelpEmbed)
    },
};
