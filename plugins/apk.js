const { bot, apkMirror, genListMessage, genButtonMessage } = require('../lib')
bot(
	{
		pattern: 'apk ?(.*)',
		fromMe: true,
		desc: 'Download apk from link',
		type: 'download',
	},
	async (message, match) => {
		if (!match) return await message.send('*උදාහරණය : apk link*')
		const { result, status } = await apkMirror(match)
		if (status > 400) {
			if (!result.length)
				return await message.send(
					'_No results found matching your query_'
				)
			const list = []
			for (const { title, url } of result)
				list.push({ id: `apk ${status};;${url}`, text: title })
			return await message.send(
				genListMessage(list, 'Matching apps', 'DOWNLOAD'),
				{},
				'list'
			)
		}
		if (status > 200) {
			const button = []
			for (const apk in result)
				button.push({
					id: `apk ${status};;${result[apk].url}`,
					text: result[apk].title,
				})
			return await message.send(
				await genButtonMessage(button, 'Available apks'),
				{},
				'button'
			)
		}
		return await message.sendFromUrl(result)
	}
)
