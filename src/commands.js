const catcommands = require('./cat-commands');
const timercommands = require('./timer-commands');

const prefix = '!';

var exports = (module.exports = {});

const ping = 'ping';
const cat = 'cat';
const timer = 'timer';

exports.prescan = function(msg, client, args) {
	if (msg.author.bot) return false;
	if (msg.mentions.users.find(val => val.id === client.user.id)) {
		args.splice(0, 1);
		return true;
	}
	if (args[0].charAt(0) == prefix) return true;
	return false;
};

exports.all = function(msg, args) {
	switch (args[0]) {
		case ping:
		case prefix + ping:
			msg.reply('pong');
			break;

		case cat:
		case prefix + cat:
			catcommands.cat(msg, args);
			break;

		case timer:
		case prefix + timer:
			timercommands.timer(msg, args);
			break;
		default:
			msg.reply('Command not found');
	}
};
