/*
 * A simple bot that replies with emoji versions of mahjong hands
 */

const Discord = require("discord.js");

const bot = new Discord.Client();

const token = "Mjk2OTY2MjEyMTYyNjgyODgw.C7563A.FmPZ5WNjIDVF44sx_8RcKOtFyhw";
const prefix = "!";

const emoji_codes = {
  "0p": "296959055849586688",
  "0m": "296959055614967809",
  "0s": "296959055841460224",
  "1p": "296810242858287108",
  "1m": "296810242954756097",
  "1s": "296810243088711680",
  "2p": "296810242753167362",
  "2m": "296810243227254784",
  "2s": "296810243101294603",
  "3p": "296810243244163072",
  "3m": "296810242740584450",
  "3s": "296810242946367499",
  "4p": "296810242979921921",
  "4m": "296810243265003520",
  "4s": "296810243231580161",
  "5p": "296810243260809216",
  "5m": "296810243114008577",
  "5s": "296810243189374987",
  "6p": "296810243252420609",
  "6m": "296810242988179459",
  "6s": "296810243256483840",
  "7p": "296810243181117451",
  "7m": "296810243005087745",
  "7s": "296810243084779525",
  "8p": "296810243298557952",
  "8m": "296810243143499787",
  "8s": "296810243382575104",
  "9p": "296810243843817483",
  "9m": "296810243319660544",
  "9s": "296810243252420610",
  "1z": "296810242807824398",
  "2z": "296810242841247745",
  "3z": "296810243101294604",
  "4z": "296810243084648450",
  "5z": "296810243437101067",
  "6z": "296810243168665612",
  "7z": "296810243294363648"
}

var hand_regex = /([0-9]+[psm]|[1-7]+z)+/g;
var part_regex = /([0-9]+)([psm])|([1-7]+)z/g;
var tile_regex = /[0-9][pms]|[1-7]z/;

function hand_to_emoji(hand) {
  var res = "";
  var match;

  while ((match = part_regex.exec(hand)) !== null) {
    var tiles = match[1] || match[3];
    var suit = match[2] || 'z';

    for (var t of tiles) {
      var code = t + suit;
      res += "<:" + code + ":" + emoji_codes[code] + ">";
    }
  }
  return res;
}

function process_command(content) {
  if (content.startsWith("dora")) {
    var msg = "";
    // dora tile
    var dora_tile = hand_regex.exec(content)[0];
    msg += "ドラ" + (hand_to_emoji(dora_tile)) + "        ";
    // this should work...
    msg += process_hand(content.substring(content.indexOf(dora_tile)+1));
    return msg;
  } else if (content.startsWith("hand") {
    return process_hand(content);
  } else {
    // if no command, assume we want to process hand
    return process_hand(content);
  }
}

function process_hand(content) {
  var msg = "";
  var match;

  while ((match = hand_regex.exec(content)) !== null) {
    var hand = match[0];
    msg += hand_to_emoji(hand) + "    ";
  }

  return msg;
}

bot.on('message', message => {
  var content = message.content;
  if (content.startsWith(prefix)) {
    // remove the prefix
    content = content.replace(prefix, '');
    var msg = process_command(content);
    message.channel.sendMessage(msg);
  } else if (content.includes(prefix)) {
    var rest = content.substring(content.indexOf(prefix)+1);
    // test that it was actually a command, and not a random use of $prefix
    if (new RegExp("^" + part_regex.source()).match(rest)) {
      var msg = process_hand(content);
      message.channel.sendMessage(msg);
    }
  }
});

bot.login(token);
