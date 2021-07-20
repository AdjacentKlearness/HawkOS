module.exports = {
    name: 'get',
    description: 'Getban command',

    execute(suspect, message, firebase) {
        const nbx = require('noblox.js');
        const Discord = require('discord.js');
        async function exec() {
            const UserId = await nbx.getIdFromUsername(suspect).catch(e => "User not found");
            const playerName = await nbx.getUsernameFromId(UserId)

            const NotInDBEmbed = new Discord.MessageEmbed()
                .setColor('#992d22')
                .addFields({
                    name: '**Error**',
                    value: "(ccBB) User does not exist in the database"
                })

            const InvalidUserEmbed = new Discord.MessageEmbed()
                .setColor('#992d22')
                .addFields({
                    name: '**Erorr**',
                    value: '(ccBB) Invalid User, The user does not exist.'
                })
            if (UserId == "User not found") {
                message.channel.send(`<@!${message.member.user.id}>`, InvalidUserEmbed)
            } else {
                var Reference = firebase.database().ref("Bans/")
                Reference.once("value").then(function (snapshot) {
                    var IsBanned = snapshot.child(UserId).hasChildren()

                    if (IsBanned == false) {
                        return message.channel.send(`<@!${message.member.user.id}>`, NotInDBEmbed)
                    } else if (IsBanned == true) {
                        var PlayerReference = firebase.database().ref("Bans/" + UserId + "/")
                        PlayerReference.once("value", function (snapshot) {
                            const Moderator = snapshot.val().Moderator
                            const Reason = snapshot.val().Reason
                            const UserName = snapshot.val().Username
                            const discordID = snapshot.val().DiscordID
                            const dbId = snapshot.val().DatabaseID
                            const GetEmbed = new Discord.MessageEmbed()
                                .setColor('#07C902')
                                .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&format=png&username=${playerName}`)
                                .setDescription("**Return Database lookup for: **" + message.member.user.tag + "")
                                .addFields(
                                    { name: 'Username', value: playerName },
                                    { name: 'RobloxID', value: UserId },
                                    { name: 'DiscordID', value: discordID },
                                    { name: 'DatabaseID', value: dbId },
                                    { name: 'Reason', value: Reason },
                                    { name: 'System Banned', value: 'True' },
                                    { name: 'Agent', value: 'Database' }

                                )
                            return message.channel.send(`<@!${message.member.user.id}>`, GetEmbed)

                        })

                    }

                })

            }

        }

        exec()
    }
};
