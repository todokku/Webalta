/*
const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let a = message.author
    let embed = new Discord.RichEmbed()
  //  .setDescription("Информация о пользователи")
    .setColor('#4682B4')
   // .addField("Имя Пользователя",a.username)
   .addField('**Аватар:**', '**Находится чуть правее**')
    .addField("**Тэг:**",a.tag)
    //.addField("Дискриминатор",a.discriminator)
    .addField("**Дата создания аккаунта:**",a.createdAt)
    .addField("**ID:**",a.id)
    .setThumbnail(a.avatarURL)
    message.delete(1000)
    bot.send(embed).then(msg => msg.delete(600000));
};
module.exports.help = {
    name: "userinfo"
};
*/

const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    if (message.mentions.users.size < 1) return message.channel.send('`Ты забыл упомянуть пользователя` <:err:715285004657229896>');
    let user;
    if (message.mentions.users.first()) {
        user = message.mentions.users.first();
    } else {
        user = message.enter.here.author;
    }
    const member = message.guild.member(user);
    const embed = new Discord.RichEmbed()
    .setColor("#4682B4")
    .setThumbnail(message.author.avatarURL)
    .addField(`${user.tag}`, `${user}`, true)
    .addField("**ID:**", `${user.id}`, true)
    .addField("**Никнейм:**", `${member.nickname !== null ? `${member.nickname}` : `Нет`}`, true)
    .addField("**Статус:**", `${user.presence.status}`, true)
    .addField("**Сервер:**", message.guild.name, true)
    .addField("**Игра:**", `${user.presence.game ? user.presence.game.name : `Нет`}`, true)
    .addField("**Бот:**", `${user.bot}`, true)
    .addField("**Зашёл на сервер:**", (member.joinedAt), true)
    .addField("**Создал аккаунт:**", (user.createdAt), true) 
    .addField("**Список ролей**", member.roles.map(roles => `${roles}`).join(`, `), true)
message.channel.send({embed});
};

module.exports.help = {
  name: "userinfo"
};
