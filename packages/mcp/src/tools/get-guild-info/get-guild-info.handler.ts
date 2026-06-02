import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolText } from '#/commons/tool-response.helpers';

export async function getGuildInfoHandler(service: DiscordClientService) {
	const guild = service.getGuild();

	const info = {
		id: guild.id,
		name: guild.name,
		memberCount: guild.memberCount,
		iconUrl: guild.iconURL(),
		ownerId: guild.ownerId,
		premiumTier: guild.premiumTier,
		preferredLocale: guild.preferredLocale,
	};

	return toolText(JSON.stringify(info, null, 2));
}
