module.exports = {
    name: 'setcredits',
    description: 'Sets the credits of the given user to the given amount',
    execute(suspect, newCount, message, firebase) {
        let noAccess = new Discord.MessageEmbed()
            .setDescription(":no_entry: You do not have access to use this command. Setting the new credits count to a string can only be done by bot developers")
            .setColor('#C10000');

        if (toLowerCase(newCount).Includes("a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m" || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z")) {
            if (message.author.id !== config.id && message.author.id !== config.id2) return message.channel.send(noAccess);
        }

        const nbx = require('noblox.js');
        const Discord = require('discord.js');
        async function exec() {
            const BanError = new Discord.MessageEmbed()
                .addFields(
                    { name: '**Error**', value: 'HTTP 400: Invalid  or Bad Request' }
                )
            const userId = await nbx.getIdFromUsername(suspect).catch(e => "User not found");
            const playerName = await nbx.getUsernameFromId(userId)
            if (userId !== "User not found") {
                var Reference = firebase.database().ref("api/Credits/" + userId + "/")
                Reference.once("value").then(function (snapshot) {
                    let oldCredits = snapshot.val()
                    Reference.set(newCount)
                    Reference.once("value").then(function (snapshot) {
                        let newCredits = snapshot.val()



                        const BanSuccess = new Discord.MessageEmbed()
                            .setColor('#07C902')
                            .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&Username=" + playerName + "")
                            .setDescription("**Return New Credits Information for: **" + message.member.user.tag + "")
                            .addFields(
                                { name: 'Username', value: playerName },
                                { name: 'UserID', value: userId },
                                { name: 'Old Credits:', value: oldCredits },
                                { name: 'New Credits', value: newCredits },
                            )
                        return message.channel.send(`<@!${message.member.user.id}>`, BanSuccess)
                    })
                })
            } else {
                return message.channel.send(`<@!${message.member.user.id}>`, BanError)
            }
        }
        exec()
    },
}
