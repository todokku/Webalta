const Discord = require("discord.js");
const fs = require('fs');

    module.exports.run = async (bot, message, args) => {
    if (!message.author.id === '492256216374837249') return message.reply("`[BOT] У Вас нет прав использовать эту команду`").then(msg => msg.delete(10000));
     //message.delete();
     let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
     let user = args[0];
     const amount = parseInt(user);
 
     if (isNaN(amount)) {
         return message.reply('`[BOT] Пожалуйста, введите действительный ID пользователя`').then(msg => msg.delete(10000));
     }
     if (!user) return message.reply('`[BOT] Вам нужно для ввода ID пользователя`');
     if (args[0] === '492256216374837249') return message.reply("`[BOT] Ты не можешь сам себя добавить в ЧС!`").then(msg => msg.delete(10000));
 
     if (!blacklist[user]) {
         blacklist[user] = {
           id: user,
           state: true
         }
         message.reply(`**[BOT] <@${user}> теперь в чёрном списке!**`).then(msg => msg.delete(10000));
         fs.writeFile("./blacklist.json", JSON.stringify(blacklist), err => {
             if(err) throw err;
           });
         
         bot.guilds.forEach((guild) => {
         if(guild.ownerID === user) {
           message.guild.leave(guild.id)
         }
     })
     return;
     }
     if (blacklist[user].state === true) {
         message.reply("`[BOT] Этот пользователь уже в чёрном списке!`").then(msg => msg.delete(10000));
     return;
     }
 
     module.exports.conf = {
        enabled: true,
        guildOnly: false,
        aliases: [],
        permLevel: 5
      };
    }

    module.exports.help = {
        name: 'blacklist',
        description: 'blacklist a user.',
        usage: 'blacklist [userid]'
      };
