module.exports = {
  name: 'restrict',
  description: 'Ban command',
  execute(suspect, reason, message, database) {

    const nbx = require('noblox.js');
    const Discord = require('discord.js');
    async function exec() {
      const userId = await nbx.getIdFromUsername(suspect).catch(e => "User not found");
      if (userId !== "User not found") {
        const playerName = await nbx.getUsernameFromId(userId)
        var ref = database.ref("api/RobloxBanned/");
        var usersRef = ref.child(userId);
        var dbID = Math.floor((Math.random() * 9999999999999999) * 1);
        usersRef.set({
          Moderator: message.member.user.tag,
          Reason: reason,
          DatabaseID: dbID,
          RobloxID: userId,
          DiscordID: message.member.user.id,
          Agent: 'Database',
          SystemBanned: 'true'
        });



        const BanSuccess = new Discord.MessageEmbed()
          .setColor('#07C902')
          .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&Format=Png&Username=" + playerName + "")
          .setDescription("**Return Ban Information for: **" + message.member.user.tag + "")
          .addFields(
            { name: 'Username', value: playerName },
            { name: 'RobloxID', value: userId },
            { name: 'DiscordID:', value: message.member.user.id },
            { name: 'DatabaseID', value: dbID },
            { name: 'Reason:', value: reason },
            { name: 'Agent', value: 'Database' },
            { name: 'System Banned', value: 'True' }


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
