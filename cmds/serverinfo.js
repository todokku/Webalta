/*
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
*/

const Discord = module.require('discord.js');

module.exports.run = (bot, message, args) => {
    const verifilv = ['Отсутствует', 'Низкая', 'Средняя', 'Высокая', 'Очень высокая']
    const embed = new Discord.RichEmbed()
        .addField('**Разработчик**', message.guild.owner, true)
        .addField('**ID сервера**', message.guild.id, true)
        .addField('**Защита**', verifilv[message.guild.verificationLevel], true)
        .addField('**Регион**', message.guild.region, true)
        .addField('**Участников**', `**[${message.guild.presences.size}] активных\n[${message.guild.members.filter(mem => mem.user.bot === true).size}] ботов\n[${message.guild.memberCount}] общее количество**`, true)
        .addField('**Каналов**', `[${message.guild.channels.filter(c => c.type == 'text').size}] текстовых\n[${message.guild.channels.filter(c => c.type == 'voice').size}] голосовых`, true)
        .addField('**Ролей**', message.guild.roles.size, true)
        .addField('**Эмоций**', message.guild.emojis.size, true)
        .addField('**Канал AFK**', message.guild.afkChannel.id, true)
        .addField("**Время AFK**", message.guild.afkTimeout / 60 + ' minutes', true)
        .setTimestamp(new Date(message.guild.createdTimestamp))
        .setFooter('Сервер создан')
        .setColor('#4682B4')
    message.delete(1000)
    message.channel.send({ embed }).then(m => m.delete(120000));
    };

module.exports.help = {
    name: 'serverinfo'
};
