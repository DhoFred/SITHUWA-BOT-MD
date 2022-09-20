const {
	bot,
	getFake,
	antiList,
	enableAntiFake,
	genButtonMessage,
} = require('../lib/')

bot(
	{
		pattern: 'antifake ?(.*)',
		fromMe: true,
		desc: 'set antifake',
		type: 'group',
		onlyGroup: true,
	},
	async (message, match) => {
		if (!match) {
			const fake = await getFake(message.jid)
			const onOrOff = fake && fake.enabled ? 'off' : 'on'
			const button = await genButtonMessage(
				[
					{ id: 'antifake list', text: 'LIST' },
					{ id: `antifake ${onOrOff}`, text: onOrOff.toUpperCase() },
				],
				'උදාහරණය\nhttps://github.com/Sithuwa/SITHUWA-BOT-MD',
				'Antifake'
			)
			return await message.send(button, {}, 'button')
			// return await message.send(
			// 	await genHydratedButtons(
			// 		[
			// 			{
			// 				urlButton: {
			// 					text: 'උදාහරණය',
			// 					url: 'https://github.com/Sithuwa/SITHUWA-BOT-MD',
			// 				},
			// 			},
			// 			{ button: { id: 'antifake list', text: 'LIST' } },
			// 			{ button: { id: 'antifake on', text: 'ON' } },
			// 			{ button: { id: 'antifake off', text: 'OFF' } },
			// 		],
			// 		'Antifake'
			// 	),
			// 	{},
			// 	'template'
			// )
		}
		if (match == 'list') {
			let list = ''
			let codes = await antiList(message.jid, 'fake')
			await message.send(codes.join(','))
			codes.forEach((code, i) => {
				list += `${i + 1}. ${code}\n`
			})
			return await message.send('```' + list + '```')
		}
		if (match == 'on' || match == 'off') {
			await enableAntiFake(message.jid, match)
			return await message.send(
				`_Antifake ${match == 'on' ? 'Activated' : 'Deactivated'}_`
			)
		}
		await enableAntiFake(message.jid, match)
		return await message.send('*Antifake සාර්තකයි*')
	}
)
