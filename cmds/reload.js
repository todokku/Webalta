const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {

    if(message.author.id != "492256216374837249") return message.channel.send('`[Ошибка] Ты не хозяин бота` 🤨')

    if(!args[0]) return message.channel.send('`[Ошибка] Ты не указал команду для перезагрузки`')

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`./${commandName}.js`)] 
        bot.commands.delete(commandName)
        const pull = require(`./${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`**[Ошибка] Команда: \`${args[0].toUpperCase()}\` не найдена!**`)
    }

    message.channel.send(`**[ACCEPT] Команда \`${args[0].toUpperCase()}\` была перезагружена!**`)

    }

exports.help = {
    name: "reload"
};
