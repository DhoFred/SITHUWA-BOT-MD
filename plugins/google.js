const { bot, getUrl, googleImageSearch } = require('../lib/')

bot(
	{
		pattern: 'google ?(.*)',
		fromMe: true,
		desc: 'Google Image Search',
		type: 'search',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.image)
			return await message.send('*පින්තූරයකට පිළිතුරු දෙන්න.*')
		const result = await googleImageSearch(
			await getUrl(
				await message.reply_message.downloadAndSaveMediaMessage('google')
			),
			'ris'
		)
		if (!result.length) return await message.send('*☹️ හමු නොවීය.*')
		return await message.send(result.join('\n'), {
			quoted: message.data,
		})
	}
)
