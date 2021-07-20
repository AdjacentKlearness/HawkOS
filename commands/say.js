const Discord = require('discord.js');

module.exports = {
    name: 'say',
    description: 'bot says a message',
    execute(message, args) {
        let noPerm = new Discord.MessageEmbed()
            .setDescription(`:no_entry: You must have the Manage Messages permission to execute this command.`)
            .setColor('#C10000');

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(noPerm);
        try {
            let sayChan = message.mentions.channels.first();
            let sayMsg = args.slice(1).join(" ");
            message.delete().catch();
            sayChan.startTyping();
            sayChan.send(sayMsg);
            sayChan.stopTyping();
            message.channel.stopTyping();
        }
        catch {
            let sayMsg = args.join(" ");
            message.delete().catch();
            message.channel.send(sayMsg);

        }


    },

};