const fetch = require('node-fetch');
const moment = require('moment');
const { RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let currencies = await fetch("https://www.cbr-xml-daily.ru/daily_json.js").then(res=>res.json());
  let curs = ['USD', 'EUR', 'KZT', 'BYN'];
  let embed = new RichEmbed()
  .setTitle(`**Обменный курс для ${moment(currencies.Date).format('L')}**`);

  let valute =  currencies.Valute;

  curs.forEach(c => {
    let cur = valute[c];
    let delta = (cur.Value - cur.Previous).toFixed(4);
    embed.addField(`${c} - ${cur.Name}`, `${cur.Previous} => ${cur.Value}\nDelta: ${delta >= 0 ? '+' + delta : delta}`)
  })
  message.channel.send(embed);
};

module.exports.help = {
    name: "currate",
  module: "Other",
  description: "Represents information about the current exchange rate",
  use: "currate",
  aliases: ['cr']
}
