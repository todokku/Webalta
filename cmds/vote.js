const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {

    if (message.channel.id == '566345849412648971' || message.channel.id == '694811994217381958') {
    if (message.author.bot) return
    if (message.channel.type == "dm") return
    if ((message.content.toLowerCase().includes('s/vote')) && message.channel.name == '🔰┃опросы') {
    await message.react(`✅`);
    await message.react(`❌`);
    }
    }
};

module.exports.help = {
    name: "vote"
};