import { ChannelType } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function createCategoryHandler(
	args: { name: string },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const category = await guild.channels.create({
			name: args.name,
			type: ChannelType.GuildCategory,
		});
		return toolText(JSON.stringify({ id: category.id, name: category.name }));
	} catch (err) {
		return toolError(`Error creating category: ${String(err)}`);
	}
}
