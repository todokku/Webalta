const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

   /* if (message.content === "s/8ball") {
    let answers = ["✅ **Да** ✅", "❌ **Нет** ❌"];
    let rand = Math.floor(Math.random()*answers.length);
    message.channel.send(answers[rand]).then(msg => msg.delete(600000));
    return message.delete()
    }
}; */

let = message.content.trim().split(/ +/g)
            if (args[0].toLowerCase() === "p/8ball") {
                message.delete('p/8ball')
                if (!args[1]) return message.channel.send(":x: `[Ошибка] Ты забыл задать вопрос!` :x:").then(msg => msg.delete(10000));
                let answers = ["✅ **Да** ✅", "❌ **Нет** ❌", "👻 **Может быть** 👻"]
                let question = args.slice(1).join(" ")
                let embed = new Discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setColor("#4682B4")
                    .addField("**Вопрос:**", question)
                    .addField("**Ответ:**", answers[Math.floor(Math.random() * answers.length)])
                message.channel.send(embed).then(msg => msg.delete(600000));
            };

        };
            module.exports.help = {
                name: "8ball"
            };
