module.exports = {
  name: 'credits',
  description: 'credits command',

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
                  name: '**Eorr**',
                  value: '(ccBB) Invalid User, The user does not exist.'
              })
          if (UserId == "User not found") {
              message.channel.send(`<@!${message.member.user.id}>`, InvalidUserEmbed)
          } else {
              var Reference = firebase.database().ref("api/Credits/"+UserId+"/")
              Reference.once("value").then(function (snapshot) {
                  const Credits = snapshot.val()

                  const GetEmbed = new Discord.MessageEmbed()
                      .setColor('#07C902')
                      .setThumbnail(`http://www.roblox.com/Thumbs/Avatar.ashx?x=250&y=250&format=png&username=${playerName}`)
                      .setDescription("**Return Database lookup for: **" + message.member.user.tag + "")
                      .addFields(
                          { name: 'Username', value: playerName },
                          { name: 'UserId', value: UserId },
                          { name: 'Credits', value: Credits },
                      
                      )
                  return message.channel.send(`<@!${message.member.user.id}>`, GetEmbed)

              })

          }

      }

      exec()
  }
};
