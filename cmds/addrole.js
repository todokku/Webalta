const Discord = require('discord.js');
module.exports.run = async (bot,message,args) => {
var role = message.mentions.roles.first();
var member = message.mentions.members.first();
var arg = new Array()
arg[0] = member
arg[1] = role
if (!message.member.roles.some(r => r.name == "[🥇] Security", "[📞] Discord Master") && !member.hasPermission("ADMINISTRATOR")) return message.delete();
if(!arg[0]) return message.channel.send('`Укажите участника` <:err:715285004657229896>')
if(!arg[1])return message.channel.send('`Укажите роль` <:err:715285004657229896>')
member.addRole(role)
message.channel.send(`Пользователь: ${member.user.username}\nПолучил роль: ${role.name}`)
}

module.exports.help = {
    name: 'addrole'
}
