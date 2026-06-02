import { ChannelType } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function createForumChannelHandler(
	args: { name: string; categoryId?: string },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const channel = await guild.channels.create({
			name: args.name,
			type: ChannelType.GuildForum,
			parent: args.categoryId ?? undefined,
		});
		return toolText(JSON.stringify({ id: channel.id, name: channel.name }));
	} catch (err) {
		return toolError(`Error creating forum channel: ${String(err)}`);
	}
}
