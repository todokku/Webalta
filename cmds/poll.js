exports.run = (message, args) => { 
    if(!args[0])return message.reply('задай вопрос')
    message.delete()
    message.channel.send(`
    **${message.author.username} создал опрос**
    ${args.join(" ")}
    `).then(msg =>{
    msg.react(`✅`); 
    msg.react(`⛔`);
    })
    exports.help = {name:"poll"}};
