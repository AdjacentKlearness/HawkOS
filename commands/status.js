const Discord = require('discord.js');

module.exports = {
    name: 'status',
    description: 'Manages Status',
    async execute(message, args) {
        let pw = new Discord.MessageEmbed()
            .setDescription(`:diamond_shape_with_a_dot_inside: Pinging...`);
        message.channel.send(pw).then(msg => {
            let p = new Discord.MessageEmbed()
                .setDescription(`:ping_pong: Ping was successful. Latency is ${msg.createdTimestamp - message.createdTimestamp}ms.`)
                .setColor('#07C902');
            msg.edit(p)
        })

    },
};
