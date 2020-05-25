const Discord = require('discord.js')

exports.run = (bot, message, args, tools) => {

    var images = ["https://i.gifer.com/Ls.gif","https://media.tenor.com/images/bc493788b867de6f4d64d5742d319ce8/tenor.gif","https://media1.tenor.com/images/e9c914be61acb8f2033f2327605c5562/tenor.gif?itemid=8118409","https://media1.tenor.com/images/23bbd39e04e1e931cd3aa3d66b7b7319/tenor.gif?itemid=9945876"];
    var rand = Math.floor(Math.random() * images.length);
    var randomImage = images[rand];

    const patEmb = new Discord.RichEmbed()
        .setColor(0xA901DB)
        .setImage(randomImage);
        const sadEmb = new Discord.RichEmbed()
        .setDescription(`<@${message.author.id}> **выстрелил(а) в by Ынот#8109** <@${message.author.id}>.. **Ой, подожди! Вы не можете выстрелить в себя! by Ынот#8109**`)
        .setColor(0xA901DB)
        .setImage(images);
        if (!args[0]) {
            message.channel.send( {
                embed: sadEmb
            });
            return;
        }

    if (!message.mentions.users.first()) return message.channel.send(`Пожалуйста, укажите в кого вы хотите выстрелить!!! by Ынот#8109`).then(msg => {
        msg.delete(3000)
    });
    message.channel.send(`<@${message.author.id}> **выстрелил(а) в** ${args[0]}`, {
        embed: patEmb
    });


}

module.exports.help = {
    name: "shoot"
}
