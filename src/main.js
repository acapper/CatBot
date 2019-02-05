const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands');
const config = require('../config');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	const args = msg.content.split(' ');
	if (!commands.prescan(msg, client, args)) return false;
	commands.all(msg, args);
});

client.login(config.discord.botkey);
