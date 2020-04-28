var exports = (module.exports = {});

exports.timer = function(msg, args) {
	switch (args[1]) {
		case 'start':
			startTimer(msg, args);
			break;
		default:
			msg.reply('Here is a list of my commands.```md' + '```');
	}
};

function startTimer(msg, args) {
	if (!args[2]) {
		msg.reply(
			'Please specify a timer length like so: `!timer start LENGTH_IN_SECONDS`'
		);
		return;
	}
	const maxtime = args[2];
	let count = maxtime;
	msg.channel
		.send(timerMessage(count))
		.then(sent => {
			count = countdown(sent, count);
		})
		.catch(console.error);
}

function countdown(msg, timeRemaing) {
	timeRemaing--;
	if (timeRemaing < 0) {
		msg.edit('Timer finished!');
		return;
	}
	setTimeout(() => {
		msg.edit(timerMessage(timeRemaing)).then(sent => {
			if (timeRemaing >= 0) countdown(sent, timeRemaing);
		});
	}, 1000);
}

function timerMessage(timeRemaing) {
	return `${timeRemaing} seconds remaing`;
}
