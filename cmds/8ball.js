const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    if (message.content === "p/8ball") {
    let answers = ["✅ **Да** ✅", "❌ **Нет** ❌"];
    let rand = Math.floor(Math.random()*answers.length);
    message.channel.send(answers[rand]).then(msg => msg.delete(600000));
    return message.delete()
    }
}; 

            module.exports.help = {
                name: "8ball"
            };
