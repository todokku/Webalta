const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('I am ready!');
});
bot.on('message', message => {
    if (message.content === 's/ping') {
        var pingembed = new Discord.RichEmbed()
        .setColor("#4682B4")
        .setTitle(`Ping ${bot.ping}ms pong :ping_pong:`)
         message.channel.send(pingembed).then(msg => msg.delete(600000));
      }
});
bot.login(process.env.BOT_TOKEN);
