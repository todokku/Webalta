const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

  if (message.content.toLowerCase().startsWith(`s/bug`)) {
    const args = message.content.slice('s/bug').split(/ +/);
    if (!args[1]) {
        message.reply(`\`привет! Для отправки отчета об ошибках используй: s/bug [текст]\``).then(message => message.delete(15000));
        return message.delete()
    }
    let bugreport = args.slice(1).join(" ");
    if (bugreport.length < 5 || bugreport.length > 1300) {
        message.reply(`\`нельзя отправить запрос с длинной меньше 5 или больше 1300 символов!\``).then(message => message.delete(15000));
        return message.delete()
    }
    let author_bot = message.guild.channels.find(c => c.name == "💫┃moder-chat");
    if (!author_bot) {
        message.reply(`\`я не смог отправить сообщение.. Канал модераторов не был найден.\``).then(message => message.delete(15000));
        return message.delete()
    }
    author_bot.send(`**Привет, <@492256216374837249>!\nПользователь: <@${message.author.id}> \`[(${message.author.id})]\` отправил запрос с канала <#${message.channel.id}> \`[(${message.guild.id})]\`.**\n` +
        `**Суть обращения:** \`${bugreport}\``);
    message.reply(`\`хэй! Я отправил твое сообщение на рассмотрение дискорд мастеру!\``).then(message => message.delete(15000));
    return message.delete();
  }
};

  module.exports.help = {
    name: "bug"
};
