module.exports = {
  name: 'unrestrict',
  description: 'Unban command',
  execute(suspect, message, firebase) {
    const nbx = require('noblox.js');
    const Discord = require('discord.js');
    async function exec() {
      const userId = await nbx.getIdFromUsername(suspect).catch(e => "User not found");
      if (userId !== "User not found") {
        const playerName = await nbx.getUsernameFromId(userId)
        var ref = firebase.database().ref("api/RobloxBanned");
        ref.once("value")
          .then(function (snapshot) {
            var isBanned = snapshot.child(userId).hasChildren()

            const SuccessEmbed = new Discord.MessageEmbed()
              .setColor('#07C902')
              .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&Username=" + playerName + "")
              .setDescription("**Return Unban Information for: **" + message.member.user.tag + "")
              .addFields(
                { name: 'Username', value: playerName },
                { name: 'System Banned', value: 'True' },
                { name: 'Agent', value: 'Database' }
              )

            const ErrorEmbed = new Discord.MessageEmbed()
              .setColor('#992d22')
              .addFields(
                { name: 'Error', value: "(ccBB) " + playerName + "Is not banned" }
              )




            if (isBanned !== false) {
              var ref2 = firebase.database().ref("api/RobloxBanned/" + userId);
              ref2.remove()
              return message.channel.send(SuccessEmbed)
            } else {
              return message.channel.send(ErrorEmbed)
            }
          })
      }
    }
    exec()
  },
};
