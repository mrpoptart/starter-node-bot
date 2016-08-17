var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
	// reconnect to Slack RTM when connection goes bad
	retry: Infinity,
	debug: false
})

// Assume single team mode if we have a SLACK_TOKEN
if (token) {
	console.log('Starting in single-team mode')
	controller.spawn({
		token: token
	}).startRTM(function (err, bot, payload) {
		if (err) {
			throw new Error(err)
		}

		console.log('Connected to Slack RTM')
	})
// Otherwise assume multi-team mode - setup beep boop resourcer connection
} else {
	console.log('Starting in Beep Boop multi-team mode')
	require('beepboop-botkit').start(controller, { debug: true })
}

controller.on('bot_channel_join', function (bot, message) {
	bot.reply(message, "It's about to get a lot more fun in here.")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
	bot.reply(message, '( o )( o )')
})

controller.hears(['boob', 'tit', 'hooter'], ['ambient'], function (bot, message) {
	bot.reply(message, '( o )( o )')
})

controller.hears(['dick', 'cock', 'shaft', 'pud', 'shaft', 'wang', 'penis', 'dong', 'pud', 'weiner', 'rod'], ['ambient'], function (bot, message) {
	bot.reply(message, '8' + Array(Math.floor(Math.random() * 10)).join("=") + '>')
})

controller.hears(['vag', 'cunt', 'snatch', 'pussy', 'twat', 'hairy hatchet wound'], ['ambient'], function (bot, message) {
	bot.reply(message, '({|})')
})

controller.hears('.*', ['direct_message'], function (bot, message) {
	bot.reply(message, "I'm more of a group bot.")
})

controller.hears('.*', ['mention'], function (bot, message) {
	bot.reply(message, 'one boob for trying: ( o )')
})

controller.hears('help', ['direct_message'], function (bot, message) {
	var help = 'you need more boobs in your life'
	bot.reply(message, help)
})

controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
	var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
	var attachments = [{
		fallback: text,
		pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
		title: 'Host, deploy and share your bot in seconds.',
		image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
		title_link: 'https://beepboophq.com/',
		text: text,
		color: '#7CD197'
	}]

	bot.reply(message, {
		attachments: attachments
	}, function (err, resp) {
		console.log(err, resp)
	})
})

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
	bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
