import type { GuildChannel } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolText } from '#/commons/tool-response.helpers';

interface OrderedChannel {
	id: string;
	name: string;
	type: string;
	position: number;
	children?: OrderedChannel[];
}

export async function listChannelsOrderedHandler(
	service: DiscordClientService,
) {
	const guild = service.getGuild();
	const allChannels = [...guild.channels.cache.values()] as GuildChannel[];

	const categories = allChannels
		.filter((ch) => ch.type === 4)
		.sort((a, b) => a.position - b.position);

	const uncategorized = allChannels
		.filter((ch) => ch.type !== 4 && !ch.parentId)
		.sort((a, b) => a.position - b.position);

	const result: OrderedChannel[] = [];

	for (const cat of categories) {
		const children = allChannels
			.filter((ch) => ch.parentId === cat.id)
			.sort((a, b) => a.position - b.position)
			.map((ch) => ({
				id: ch.id,
				name: ch.name,
				type: String(ch.type),
				position: ch.position,
			}));

		result.push({
			id: cat.id,
			name: cat.name,
			type: 'GuildCategory',
			position: cat.position,
			children,
		});
	}

	for (const ch of uncategorized) {
		result.push({
			id: ch.id,
			name: ch.name,
			type: String(ch.type),
			position: ch.position,
		});
	}

	return toolText(JSON.stringify(result, null, 2));
}
