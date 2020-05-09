const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

        if (message.content.startsWith(`s/kiss`)) {
        const args = message.content.slice(`s/kiss`).split(/ +/)
        if (!args[1]) return message.reply(`**воздух целовать? 😕**`).then(message => message.delete(10000));
        let usr = message.guild.member(message.mentions.users.first());
        if (!usr) return message.reply(`**ошибка, я не нашёл такого человека 😟**`).then(message => message.delete(10000));
        message.channel.send(new Discord.RichEmbed()
      .setDescription(`**${message.author} 👄 чмокнул 👄 ${usr}**`)
      .setImage(`https://cdn.discordapp.com/attachments/540540568011538478/702238177875984464/image_860212161500558057658.gif`)
      .setColor("#4682B4")).then(msg => msg.delete(600000));
      return message.delete()
      }
    };

      module.exports.help = {
        name: "kiss"
    };