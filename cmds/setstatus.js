module.exports.run = async(bot, message, args) => {

    if (message.content === "s/setstatus") {
    const status = args.join(' ');
    if(!status) return message.channel.send('Укажи новый статус!');
    bot.user.setActivity(status, {type: 'LISTENING'}); // можно поставить любой тип статуса из PLAYING, WATCHING, LISTENING и STREAMING (в случае с типом STREAMING к объекту надо дописать свойство - url: 'https://twitch.tv/twitch'), иначе же будет показываться тип статуса по умолчаию - PLAYING. 
    message.channel.send(`Статус успешно изменён на **${status}**!`);
    };
};
    module.exports.help = {
    name: 'setstatus'
    };
