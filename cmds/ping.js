const Discord = module.require("discord.js");
const fs = require("fs");
module.exports.run = async (bot,message,args) => {
  //  message.channel.send(`pong!`);
  if (message.content === "s/ping") {
    var pingembed = new Discord.RichEmbed()
    .setColor("#4682B4")
    .setTitle(`Ping ${bot.ping}ms pong :ping_pong:`)
     message.channel.send(pingembed).then(msg => msg.delete(600000));
  }
};
module.exports.help = {
    name: "ping"
};