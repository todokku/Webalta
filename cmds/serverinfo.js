const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
    let embed = new Discord.RichEmbed()
    .setDescription("Информация о сервере")
    .setColor('#00ffb9')
    .addField("_Название:_", message.guild.name)
    .addField("_Дата создания:_", message.guild.createdAt)
    .addField("_Дата **ВАШЕГО** вступления:_", message.guild.joinedAt)
    .addField("_Участников:_", message.guild.memberCount)
    .addField("_Регион сервера:", message.guild.region)
    .setThumbnail(message.guild.iconURL)

    bot.send(embed).then(msg => msg.delete(600000));

};
module.exports.help = {
    name: "serverinfo"
};