const Discord = require('discord.js');
const client = new Discord.Client();
const commands = require('./commands');
const config = require('../config');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	console.log(`Connect to ${client.guilds.array().length} guild(s)`);
	updateStatus();
});

client.on('message', msg => {
	const args = msg.content.split(' ');
	if (!commands.prescan(msg, client, args)) return false;
	commands.all(msg, args);
});

client.on('guildCreate', guild => {
	updateStatus();
	console.log(`Joined a new guild: ${guild.name}`);
});

client.on('guildDelete', guild => {
	updateStatus();
	console.log(`Left a guild: ${guild.name}`);
});

client.on('rateLimit', limit => {
	console.log(JSON.stringify(limit));
});

function updateStatus() {
	client.user.setPresence({
		afk: true,
		game: {
			name: `with ${client.guilds.array().length} guild(s)`,
			type: 'PLAYING'
		}
	});
}

client.login(config.discord.botkey);

// https://discordapp.com/oauth2/authorize?&client_id=281182988388007938&scope=bot&permissions=0
