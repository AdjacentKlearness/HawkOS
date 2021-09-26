module.exports = {
    name: 'setcredits',
    description: 'Sets the credits of the given user to the given amount',
    execute(suspect, newCount, message, firebase) {

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
