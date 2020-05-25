const Discord = require('discord.js');
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("У тебя нет нужных прав!");
 
   let prefixis = JSON.parse(fs.readFileSync("./guild.json", "utf8"));
  
  prefixis[message.guild.id] = {
     prefix: args[0]
   };
  
   fs.writeFile("./guild.json", JSON.stringify(prefixis), (err) => {
     if (err) console.log(err)
   });

  let embed = new Discord.RichEmbed()
   .setColor("#4682B4")
   .setTitle("Префикс установлен!")
   .setDescription(`Установил префикс: ${args[0]}`);
  
  message.channel.send(embed);
 }
  
 module.exports.help = {
   name: "prefix"
 }
