import { ChannelType } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function createTextChannelHandler(
	args: { name: string; categoryId?: string },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const channel = await guild.channels.create({
			name: args.name,
			type: ChannelType.GuildText,
			parent: args.categoryId ?? undefined,
		});
		const response = {
			id: channel.id,
			name: channel.name,
			type: String(channel.type),
			parentId: channel.parentId ?? null,
			url: `https://discord.com/channels/${guild.id}/${channel.id}`,
			suggestion: `Channel created successfully. You can now set permissions with set_channel_permissions using channelId: "${channel.id}".`,
		};
		return toolText(JSON.stringify(response));
	} catch (err) {
		return toolError(`Error creating text channel: ${String(err)}`);
	}
}
