const cat = require('./cat-commands');

const prefix = '!';

var exports = (module.exports = {});

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
		case 'ping':
		case prefix + 'ping':
			msg.reply('pong');
			break;
		case 'cat':
		case prefix + 'cat':
			cat.cat(msg, args);
			break;
		default:
			msg.reply('Command not found');
	}
};
