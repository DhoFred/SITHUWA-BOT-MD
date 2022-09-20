const { setCmd, bot, getCmd, delCmd } = require('../lib/index')

bot(
	{
		pattern: 'setcmd ?(.*)',
		fromMe: true,
		desc: 'to set cmd',
		type: 'misc',
	},
	async (message, match) => {
		if (!message.reply_message || !message.reply_message.sticker)
			return await message.send('*ස්ටිකරයකට පිළිතුරු දෙන්න.*')
		if (!match) return await message.send('*උදාහරණය : setcmd ping*')
		const res = await setCmd(match, message.reply_message)
		return await message.send(res < 1 ? '_Failed_' : '_Success_')
	}
)

bot(
	{
		pattern: 'getcmd ?(.*)',
		fromMe: true,
		desc: 'to get cmd',
		type: 'misc',
	},
	async (message, match) => {
		const res = await getCmd()
		if (!res.length) return await message.send('*Not set any cmds*')
		return await message.send('```' + res.join('\n') + '```')
	}
)

bot(
	{
		pattern: 'delcmd ?(.*)',
		fromMe: true,
		desc: 'to del cmd',
		type: 'misc',
	},
	async (message, match) => {
		if (!match && (!message.reply_message || !message.reply_message.sticker))
			return await message.send('*උදාහරණය :*\ndelcmd cmdName\nස්ටිකරයකට පිළිතුරු දෙන්න.')
		const res = await delCmd(match || message.reply_message)
		return await message.send(res < 1 ? '_Failed_' : '_Success_')
	}
)
