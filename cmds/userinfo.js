const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let a = message.author
    let embed = new Discord.RichEmbed()
  //  .setDescription("Информация о пользователи")
    .setColor('RANDOM')
   // .addField("Имя Пользователя",a.username)
    .addField("**Тэг:**",a.tag)
    //.addField("Дискриминатор",a.discriminator)
    .addField("**Дата создания аккаунта:**",a.createdAt)
    .addField("**ID:**",a.id)
    .setThumbnail(a.avatarURL)

    bot.send(embed).then(msg => msg.delete(600000));

};
module.exports.help = {
    name: "userinfo"
};