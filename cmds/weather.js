const Discord = require("discord.js");
const config = require('../config.json');
const weather = require("weather-js")
exports.run = async (bot, message, args) => {
 weather.find({search: encodeURIComponent(args.join(" ")), degreeType: "C"}, function(err, result) {
    if(!result) return message.channel.send("Город не найден").then(console.error(err));
 if(!args[0]) return message.channel.send(`\`\`\`ERR no args\`\`\``)
    if(!current) return;
   ////if(!location) return;

      var current = result[0].current;
      var location = result[0].location;

    if(err) return message.channel.send(err).then(console.error(err)); 
 
        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Weather of ${current.observationpoint}`)
            .setThumbnail(`${current.imageURL}`)
            .setColor("RANDOM")
            .addField("Часовой пояс", `UTC${current.observationpoint}`, true)
            .addField("Тип",location.degreetype, true)
            .addField("Температура", `${current.temperature} Degrees`, true)
            .addField("Ощущается как", `${current.feelslike} degress`, true)
            .addField("Ветер",current.winddisplay, true)
            .addField("Влажность", `${current.humidity}`, true) 

            message.channel.send(embed);

 });
};

exports.conf = {
  aliases: ['w']
};

module.exports.help = {
  name: "weather"
};
