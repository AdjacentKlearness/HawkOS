module.exports = {
    name: 'setcredits',
    description: 'Ban command',
    execute(suspect, NewCount, message, database) {
        const userId = await nbx.getIdFromUsername(suspect).catch(e => "User not found");
        const playerName = await nbx.getUsernameFromId(UserId)
  
      const nbx = require('noblox.js');
      const Discord = require('discord.js');
      async function exec() {
        if (userId !== "User not found") {
          var ref = database.ref("api/Credits/"+userId+"/");
          var oldCredits = 0
          var Reference = firebase.database().ref("api/Credits/"+UserId+"/")
              Reference.once("value").then(function (snapshot) {
                  oldCredits = snapshot.val()
              })
          ref.set(NewCount);
          var newCredits = 0
          var Reference = firebase.database().ref("api/Credits/"+UserId+"/")
              Reference.once("value").then(function (snapshot) {
                  newCredits = snapshot.val()
              })
  
  
  
          const BanSuccess = new Discord.MessageEmbed()
            .setColor('#07C902')
            .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&Username=" + playerName + "")
            .setDescription("**Return Ban Information for: **" + message.member.user.tag + "")
            .addFields(
              { name: 'Username', value: playerName },
              { name: 'UserID', value: userId },
              { name: 'Old Credits:', value: oldCredits },
              { name: 'New Credits', value: newCredits },
            )
  
          const BanError = new Discord.MessageEmbed()
            .addFields(
              { name: '**Error**', value: 'HTTP 400: Invalid  or Bad Request' }
            )
          return message.channel.send(`<@!${message.member.user.id}>`, BanSuccess)
        } else {
          return message.channel.send(`<@!${message.member.user.id}>`, BanError)
        }
      }
      exec()
    },
  };
