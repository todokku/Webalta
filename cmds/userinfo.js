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
