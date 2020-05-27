const Discord = require('discord.js');
module.exports.run = async (bot,message,args) => {
    if (!message.guild.member(bot.user).hasPermission("MANAGE_ROLES")) return message.reply('`У тебя не хватает прав` <:err:715285004657229896>');
    if (message.mentions.users.size === 0) return message.reply('`Укажи юзера, которому нужно снять роль` <:err:715285004657229896>');
    let member = message.guild.member(message.mentions.users.first());
    if (!member) return message.reply('`Я не смог найти юзера` <:err:715285004657229896>');
    let rname = message.content.split(" ").splice(2).join(" ");
    let role = message.guild.roles.find(val => val.name === rname);
    if (!role) return message.reply(`${rname} <:err:715285004657229896>`);
    member.roles.remove(role).catch(e => {
        return message.channel.send('`Роль, которую ты хочешь снять, находится выше моей` <:err:715285004657229896>');
    });
    message.channel.send(`**${message.author.username}** снял роль **${role.name}** под названием **${message.mentions.users.first().username}**.`);
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nerf"],
  permLevel: 2
};

module.exports.help = {
  name: 'removerole',
  description: 'Removes a role. It\'s as simple as adding a role.',
  usage: 'removerole'
};
