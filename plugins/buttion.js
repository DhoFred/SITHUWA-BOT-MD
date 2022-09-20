const { bot, buttonMessage } = require('../lib')

bot(
	{
		pattern: 'button ?(.*)',
		fromMe: true,
		desc: 'button msg',
		type: 'whatsapp',
	},
	async (message, match) => {
		match = match.split(',')
		if (match.length < 3)
			return await message.send(
				'උදාහරණය head,foot,button1,button2,...\nපොටෝ,වීඩියෝ සහ ඩොකියුමන්ට් වලට පිළිතුරු දෙන්න.'
			)
		await message.send(await buttonMessage(match, message), {}, 'button')
	}
)
