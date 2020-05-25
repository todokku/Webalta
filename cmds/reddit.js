const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
module.exports.run = async (bot, message, args) => {
    try {
        if(!args[1]) return message.channel.send("__Введите название поста!__")

        const topic = args[1];
        const { body } = await snekfetch
            .get(`https://www.reddit.com/r/${topic}.json?sort=top&t=week`)
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('Кажется, но такого поста не существеует');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.RichEmbed()
        .setColor(0x00A2E8)
        .setTitle(allowed[randomnumber].data.title)
        .setDescription("Сделал пост: " + allowed[randomnumber].data.author)
        .setImage(allowed[randomnumber].data.url)
        .addField("Остальная информация:", "Поддержка: " + allowed[randomnumber].data.ups + " / Комментарии: " + allowed[randomnumber].data.num_comments)
        .setFooter(`Пост ${topic}`)
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
}
module.exports.help = {
    name: "reddit"
}
