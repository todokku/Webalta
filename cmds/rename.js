const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports.run = (bot, message, args) => {
  let newname = args.slice(1).join(' ');
  let user;
  let mention = message.mentions.users.first();
  if (!mention){
    user = message.guilds.members.get(args[0])
    if (!user) return message.reply('`Я не нашёл юзера, укажи валидный ID` <:err:715285004657229896>').catch(console.error);
  }else{
    user = message.guild.member(mention)
  }
  if (user.id === "492256216374837249" && message.author.id !== "492256216374837249") return message.reply('`Запрещаю тебе переименновывать разработчика` <:err:715285004657229896>');
  user.setNickname(newname).catch(e => {
    if(e) return message.channel.send(`Ошибка: \`\`\`${e}\`\`\``)
  });
  message.channel.send('`Выполнил`');
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

module.exports.help = {
  name: 'rename',
  description: 'Rename the mentioned user.',
  usage: 'rename @user|userID newname'
};
