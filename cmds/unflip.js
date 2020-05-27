const Discord = require("discord.js");
const { letterTrans } = require('custom-translate');

module.exports.run = async(bot, message, args) => {

var dictionary = {

"ɐ": "a",

"q": "b",

"ɔ": "c",

"p": "d",

"ǝ": "e",

"ɟ": "f",

"ƃ": "g",

"ɥ": "h",

"ᴉ": "i",

"ɾ": "j",

"ʞ": "k",

"ш": "m",

"u": "n",

"d": "p",

"b": "q",

"ɹ": "r",

"ʇ": "t",

"n": "u",

"ʌ": "v",

"w": "ʍ",

"ʎ": "y",

"∀": "A",

"Ɔ": "С",

"Ǝ": "E",

"Ⅎ": "F",

"פ": "G",

"ſ": "J",

"˥": "L",

"W": "M",

"Ԁ": "P",

"┴": "T",

"n": "u",

"Λ": "V",

"W": "M",

"⅄": "Y",

"Ɩ": "1",

"ᄅ": "2",

"Ɛ": "3",

"ㄣ": "4",

"ϛ": "5",

"9": "6",

"ㄥ": "7",

"6": "9",

"'": ",",

"˙": ".",

",": "'",

"/": "\"",

"‾": "",

"⅋": "&",

"¡": "!",

"¿": "?",

",": "`"

}

const text = args.join(' ');

const converted = letterTrans(text, dictionary);

message.channel.send(converted);

}

module.exports.help = {

name: "unflip"

}
