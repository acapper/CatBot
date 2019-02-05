const catapi = require('./cat-api');
const { RichEmbed } = require('discord.js');

const colour = 0xff0000;

var exports = (module.exports = {});

exports.cat = function(msg, args) {
	switch (args[1]) {
		case 'png':
		case 'jpg':
			msg.reply('Looking for cat image');
			static(msg, args);
			break;
		case 'gif':
			msg.reply('Looking for cat gif');
			gif(msg, args);
			break;
		case 'help':
		default:
			msg.reply(
				'Here is a list of my commands.```' +
					'\npng: @Cat Bot#1855 cat png' +
					'\njpg: @Cat Bot#1855 cat jpg' +
					'\ngif: @Cat Bot#1855 cat gif' +
					'```'
			);
	}
};

function static(msg, args) {
	catapi.getImage(msg.author.username, 'png jpg', true).then(
		result => {
			var url = result[0].url;
			var breed = result[0].breeds[0];

			const embed = new RichEmbed()
				.setColor(colour)
				.setTitle(breed.name)
				.setDescription(breed.description + '\n' + breed.wikipedia_url)
				.setImage(url);

			msg.reply(embed);
		},
		reason => {
			error(reason);
		}
	);
}

function gif(msg, args) {
	catapi.getImage(msg.author.username, 'gif', false).then(
		result => {
			var url = result[0].url;
			const embed = new RichEmbed().setColor(colour).setImage(url);
			msg.reply(embed);
		},
		reason => {
			error(reason);
		}
	);
}

function error(msg, reason) {
	console.log(reason);
	msg.reply("Looks like I couldn't find one :(");
}