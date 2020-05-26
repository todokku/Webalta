const Discord = module.require("discord.js");
const fs = require("fs");

module.exports.run = async (bot,message,args) => {
    if(message.author.id != "492256216374837249") return message.channel.send("Ты не мой хозяин((")

    try {
        await message.channel.send("Я спать")
        process.exit()
    } catch(e) {
        message.channel.send(`ERROR: ${e.message}`)
    }
    
    }

module.exports.help = {
    name: "shutdown"
};
