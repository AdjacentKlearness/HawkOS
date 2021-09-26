const Discord = require('discord.js');
const config = require('../config.json');
const { inspect } = require('util');


let noAccess = new Discord.MessageEmbed()
    .setDescription(":no_entry: You do not have access to use this command. This command is only available to the bot's owner.")
    .setColor('#C10000');

let success = new Discord.MessageEmbed()
    .setDescription(":white_check_mark: Evaluated code successfully.")
    .setColor('#00FF00')
    .setTimestamp();


module.exports = {
    name: 'eval',
    description: 'evaluates code',
    async execute(message, args) {
        if (message.author.id !== config.id && message.author.id !== config.id2) return message.channel.send(noAccess);

        let evaled;
        try {
            evaled = await eval(args.join(' '));
            console.log(inspect(evaled));
            message.channel.send(success);
        }
        catch (error) {
            console.error(error);
            let errorEmbed = new Discord.MessageEmbed()
                .setDescription(":flushed:  There was a problem evaluating this code.")
                .addField(`Detailed report:`, error)
                .setColor('#C10000');
            message.reply(errorEmbed);


        }

    },
};


