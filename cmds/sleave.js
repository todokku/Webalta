const Discord = module.require("discord.js");
const fs = require("fs");
const settings = require('../settings.json');

module.exports.run = async (bot,message,args) => {
    const developer = [
        settings.developer,
        settings.developerone,
    ]; 
    if (!developer.some(dev => dev == message.author.id)) return message.delete();
    if (args.length  < 1) return message.channel.send("**Используйте** \`/sleave GuildID!\`");
    bot.guilds.get(args.join(" ")).leave()
    .then(g => message.channel.send(`**Бот вышел с сервера** \`${g}\`!`)) .catch(console.error);
};
module.exports.help = {
    name: "sleave"
};
