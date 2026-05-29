import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function deleteChannelHandler(
	args: { id: string; confirm: true },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const channel = guild.channels.cache.get(args.id);
		if (!channel) {
			return toolError(`Channel with ID "${args.id}" not found.`);
		}
		await channel.delete();
		return toolText(JSON.stringify({ id: channel.id, name: channel.name }));
	} catch (err) {
		return toolError(`Error deleting channel: ${String(err)}`);
	}
}
