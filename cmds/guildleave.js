module.exports.run = async (bot, message, args) => {
let config = require('./bot/config.json'); // Подключаем конфиг. 
let owners = config.owners; // Определяем овнеров.
const Discord = module.require("discord.js");
module.exports = { // Создаём экспорты.

 help: { // Сожраняем в хелп.
    name: 'guildleave', // Имя команды
    aliases: [""], // Аллиасы
    description: "Бот покинет сервер указанного id (Для разработчиков).", // Описание
    usage: "guildleave <id сервера>", // Использование
    category: "owners", // Владельцы
    enabled: true, // Команда включена или нет.
    guildOnly: true, // Только для серверов?
    cooldown: 0 // Кулдавн
},

 run: async (bot, message, args) => {
    if(!owners.includes(message.author.id)) return; // Проверка на овнера.
    let guild = bot.guilds.get(args[0]); // Бот ищет сервер с указанным айди
    if (!guild) return bot.send("Ошибка. Описание: Бот не находится на сервере с указанным ID"); // Ошибка
    guild.leave() // Бот покидает сервер
    let embed = new Discord.RichEmbed() // Создаём эмбед сообщение.
    .setColor(`#4682B4`) // Цвет.
    .setDescription(`Я покинул сервер с именем **${guild}**.`) // Описание
    .setFooter(`${bot.user.username} | Успешно!`)
    bot.send(embed); // Отправляем готовый эмбед.
    }
}

    "owners" 
    [
    "492256216374837249"
    ]
};

module.exports.help = {
    name: "guildleave"
};
