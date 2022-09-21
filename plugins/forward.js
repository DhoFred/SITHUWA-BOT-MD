const { forwardOrBroadCast, bot, parsedJid } = require('../lib/')

bot(
	{
		pattern: 'forward ?(.*)',
		fromMe: true,
		desc: 'forward replied msg',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send('*පනිවිඩයට පිළිතුරු දෙන්න*')
		for (const jid of parsedJid(match)) await forwardOrBroadCast(jid, message)
	}
)

bot(
	{
		pattern: 'save ?(.*)',
		fromMe: true,
		desc: 'forward replied msg to u',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message)
			return await message.send('*පනිවිඩයට පිළිතුරු දෙන්න*')
		await forwardOrBroadCast(message.participant, message)
	}
)
