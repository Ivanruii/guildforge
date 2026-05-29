import { ChannelType } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function deleteCategoryHandler(
	args: { id: string; confirm: true },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const category = guild.channels.cache.get(args.id);
		if (!category) {
			return toolError(`Category with ID "${args.id}" not found.`);
		}
		if (category.type !== ChannelType.GuildCategory) {
			return toolError(`Channel with ID "${args.id}" is not a category.`);
		}
		await category.delete();
		return toolText(JSON.stringify({ id: category.id, name: category.name }));
	} catch (err) {
		return toolError(`Error deleting category: ${String(err)}`);
	}
}
