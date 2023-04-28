var firebase = require('firebase');

const dotconfig = require('dotenv').config();

const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

const botToken = process.env.TOKEN

client.commands = new discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const http = require('http');
http.createServer((_, res) => res.end('Online')).listen(8080);

const nbx = require('noblox.js');
const Discord = require('discord.js');
const InvalidArguments = new Discord.MessageEmbed()
  .setColor('#992d22')
  .addFields({ name: '**Error**', value: 'Missing or incorrect arguments!' });
const InvalidPermissions = new Discord.MessageEmbed()
  .setColor('#992d22')
  .addFields({ name: '**Error**', value: 'Insufficent Permissions' });

//--------------Edit here--------------//

const banRole = process.env.BanRole;
const unbanRole = process.env.UnbanRole;
const prefix = process.env.BotPrefix;
const botStatus = process.env.botStatus;

//-------------------------------------//

client.on('ready', () => {
  console.log('Bot online');
  client.user.setActivity(botStatus, {
    type: "PLAYING",
  });
});

var config = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: ie-group-datastore,
  storageBucket: 'bucket.appspot.com'
};

firebase.initializeApp(config);
var database = firebase.database();

client.on('message', message => {
  if (message.author.bot) return;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  const errorNoCMD = new Discord.MessageEmbed()
    .addFields({
      name: '**Error**', value: "" + command + " Is not a valid command"
    })
    .setColor('#C10000');

  if (!client.commands.has(command)) return message.reply(errorNoCMD);

  if (command == 'get') {
    const suspect = args[0];
    if (!message.member.roles.cache.some(role => role.name === banRole)) {
      return message.channel.send(InvalidPermissions);
    }
    if (!suspect) {
      return message.channel.send(
        `<@!${message.member.user.id}>`,
        InvalidArguments
      );
    }
    client.commands.get('get').execute(suspect, message, firebase);
  }

  if (command == 'ping') {
    client.commands.get('ping').execute(message, args);
  }
  if (command == 'help') {
    client.commands.get('help').execute(message, args);
  }

  if (command == 'eval') {
    client.commands.get('eval').execute(message, args,client);
  }

  if (command == 'say') {
    client.commands.get('say').execute(message, args);
  }
    if (command == 'status') {
    client.commands.get('status').execute(message, args);
  }
  
  if (command == 'credits') {
    const suspect = args[0];
    if (!suspect) {
      return message.channel.send(
        `<@!${message.member.user.id}>`,
        InvalidArguments
      );
    }
    client.commands.get('credits').execute(suspect, message, firebase);
  }
  if (command == 'setcredits') {
    const suspect = args[0];
    const newCount = args.slice(1).join(' ');
    if (!message.member.roles.cache.some(role => role.name === banRole)) {
      return message.channel.send(InvalidPermissions);
    }
    if (!suspect) {
      return message.channel.send(
        `<@!${message.member.user.id}>`,
        InvalidArguments
      );
    }
    client.commands.get('setcredits').execute(suspect, newCount, message, firebase);
  }
  if (command === 'restrict') {
    const suspect = args[0];
    const reason = args.slice(1).join(' ');

    if (!message.member.roles.cache.some(role => role.name === banRole)) {
      return message.channel.send(InvalidPermissions);
    }

    if (!suspect) {
      return message.channel.send(
        `<@!${message.member.user.id}>`,
        InvalidArguments
      );
    }

    if (!reason) {
      return message.channel.send(
        `<@!${message.member.user.id}>`,
        InvalidArguments
      );
    }
    client.commands.get('restrict').execute(suspect, reason, message, database);
  }
  //Unban
  if (command === 'unrestrict') {
    const suspect = args[0];

    if (!message.member.roles.cache.some(role => role.name === unbanRole)) {
      return message.channel.send(InvalidPermissions);
    }

    if (!suspect) {
      return message.channel.send(
        `<@!${message.member.user.id}>`,
        InvalidArguments
      );
    }
    client.commands.get('unrestrict').execute(suspect, message, firebase);
  }
});

client.login(botToken);
