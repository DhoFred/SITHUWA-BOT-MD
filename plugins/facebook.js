const { facebook, bot, genButtonMessage, isUrl } = require('../lib/')

bot(
	{
		pattern: 'fb ?(.*)',
		fromMe: true,
		desc: 'Download facebook video',
		type: 'download',
	},
	async (message, match) => {
		match = isUrl(match || message.reply_message.text)
		if (!match) return await message.send('*උදාහරණය : fb url*')
		const result = await facebook(match)
		if (!result.length)
			return await message.send('*☹️ සොයාගත නොහැකි විය.', {
				quoted: message.quoted,
			})
		return await message.send(
			await genButtonMessage(
				result.map((e) => ({
					id: `upload ${e.url}`,
					text: e.quality,
				})),
				'Choose Video Quality'
			),
			{},
			'button'
		)
	}
)
