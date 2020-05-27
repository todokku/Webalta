/*
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
*/

const Discord = module.require("discord.js");
let profile = require("../profile.json");
exports.run = (bot, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) return message.channel.send('`Ты забыл упомянуть юзера` <:err:715285004657229896>').catch(console.error);
  if (message.mentions.users.first().id === message.author.id) return message.channel.send('`Я не могу сделать этого` <:err:715285004657229896>');
  if (user.id === bot.user.id) return message.channel.send('`Нельзя забанить самого себя` <:err:715285004657229896>');
  if (message.mentions.users.first().id === "492256216374837249") return message.channel.send('`Я не могу сделать этого` <:err:715285004657229896>');
  if (reason.length < 1) reason = 'Без объяснения причины';
  let botRolePossition = message.guild.member(bot.user).roles.highest.position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.channel.send('`Нельзя забанить участника, потому что у него есть роли выше или равные твоим` <:err:715285004657229896>')
  if (botRolePossition <= rolePosition) return message.channel.send('`Я не могу забанить участника, потому что у него есть роли выше или равные моим` <:err:715285004657229896>')
  if (!message.guild.member(user).bannable) {
    message.channel.send('`Я не могу забанить этого участника. Возможно, моя роль недостаточно высока` <:err:715285004657229896>');
    return
  }else{
    const embed = new Discord.MessageEmbed()
    .setColor(`#4682B4`)
    .setTimestamp()
    .addField('**Действие:**', '**Блокировка**')
    .addField('**Пользователь:**', `**${user.username}#${user.discriminator} (${user.id})**`)
    .addField('**Модератор:**', `**${message.author.username}#${message.author.discriminator}**`)
    .addField('**Причина:**', reason);
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return
    });
    message.guild.members.ban(user.id, {days:7, reason: reason})
    let logchannel = message.guild.channels.find('name', '💙┃log-channel');
    if  (!logchannel){
    message.channel.send({embed})
    }else{
      bot.channels.get(logchannel.id).send({embed});
      message.channel.send({embed})
    } 
    if(user.bot) return;
    message.mentions.users.first().send({embed}).catch(e =>{
      if(e) return 
    });
  }
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["bigyeet"],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
