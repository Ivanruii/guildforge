import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function updateChannelHandler(
	args: {
		channelId: string;
		name?: string;
		topic?: string;
		bitrate?: number;
		userLimit?: number;
		categoryId?: string;
		position?: number;
	},
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const channel = await guild.channels.fetch(args.channelId);

		if (!channel) {
			return toolError(`Channel with ID "${args.channelId}" not found.`);
		}

		if (!channel.isTextBased() && !channel.isVoiceBased()) {
			return toolError(
				`Channel "${args.channelId}" does not support edits through this tool.`,
			);
		}

		const editData: Record<string, unknown> = {};

		if (args.name !== undefined) editData.name = args.name;
		if (args.topic !== undefined) editData.topic = args.topic;
		if (args.bitrate !== undefined) editData.bitrate = args.bitrate;
		if (args.userLimit !== undefined) editData.userLimit = args.userLimit;
		if (args.categoryId !== undefined) editData.parent = args.categoryId;
		if (args.position !== undefined) editData.position = args.position;

		const updated = await channel.edit(editData);

		return toolText(
			JSON.stringify({
				id: updated.id,
				name: updated.name,
				type: String(updated.type),
			}),
		);
	} catch (err) {
		return toolError(`Error updating channel: ${String(err)}`);
	}
}
