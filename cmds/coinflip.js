const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    if (message.content === "s/coinflip") {
    let answers = ["**🦅 Выпал орёл 🦅**", "**💰 Решка 💰**", "**🎩 Ребро 🎩**"]; // Варианты ответов, которые будут выведены
    let rand = Math.floor(Math.random()*answers.length); // Получаем рандомный ответ из предоставленных
    message.channel.send(answers[rand]).then(msg => msg.delete(600000)); // Отправляем сообщение в чат
    }
};
module.exports.help = {
    name: "coinflip"
};