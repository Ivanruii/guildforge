import { ChannelType } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolText } from '#/commons/tool-response.helpers';

function getChannelTypeName(type: ChannelType): string {
	const entry = Object.entries(ChannelType).find(([, value]) => value === type);
	return entry?.[0] ?? 'Unknown';
}

export async function listChannelsHandler(service: DiscordClientService) {
	const guild = service.getGuild();
	const channels = guild.channels.cache.map((channel) => ({
		id: channel.id,
		name: channel.name,
		type: getChannelTypeName(channel.type),
	}));
	return toolText(JSON.stringify(channels));
}
