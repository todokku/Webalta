const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require("../profile.json");
module.exports.run = async (bot,message,args) => {
    try{
    function send (msg){
        message.channel.send(msg);
    }

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('`[Ошибка] Не пытайся! Твои права слишком малы!`')
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get());

    if(!args[0]) return bot.send('`[Ошибка] Ты забыл указать пользователя`')
    if(!rUser) return bot.send('`[Ошибка] Пользователь не найден`')
        fs.writeFile(`./profile.json`,JSON.stringify(profile),(err)=>{
        if(err) console.log(err);
      });
    
    let embed = new Discord.RichEmbed()
    .setAuthor('❌ Внимание! Пользователя заблокировали ❌', 'https://images-ext-2.discordapp.net/external/TAZTzELHkJEA8BUsl0qQ4QvnQbEcUS74ocRR2Hrk_As/%3Fwidth%3D321%26height%3D321/https/media.discordapp.net/attachments/283213366980509697/621277158811369472/Untitled2.gif')
    .setColor(`#4682B4`)
    .addField("**Модератор:**", message.author.username)
    .addField('**Забанил пользователя:**', rUser.user.username)
    .addField(`**Причина:**`, `None`)
    .setThumbnail(message.guild.avatarURL)
    .setFooter(`System © Oliver Stealer`)
    .setTimestamp()
    message.guild.member(rUser).ban("Забанен! Его забанил тот, у кого есть право Банить Участников")

    message.channel.send(embed);
    }catch(err){

           console.log(`1.${err.name}\n2.${err.stack}\n3.${err.message}`)
    }}
module.exports.help = {
    name: "ban"
}