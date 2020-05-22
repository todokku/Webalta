const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    if (message.content === "s/coinflip") {
    message.delete('s/coinflip')
    let answers = ["`Тебе выпал:`\n**🦅 Орёл 🦅**", "`Тебе выпала:`\n**💰 Решка 💰**", "`Тебе выпало:`\n**🎩 Ребро 🎩**"]; // Варианты ответов, которые будут выведены
    let rand = Math.floor(Math.random()*answers.length); // Получаем рандомный ответ из предоставленных
    message.reply(answers[rand]).then(msg => msg.delete(600000)); // Отправляем сообщение в чат
    }
};
module.exports.help = {
    name: "coinflip"
};
