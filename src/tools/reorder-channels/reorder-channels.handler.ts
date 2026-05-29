import type { GuildChannel } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function reorderChannelsHandler(
	args: {
		orders: Array<{
			channelId: string;
			position: number;
			categoryId?: string;
		}>;
	},
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const results: Array<{
			channelId: string;
			name: string;
			success: boolean;
		}> = [];

		for (const order of args.orders) {
			const channel = guild.channels.cache.get(order.channelId) as
				| GuildChannel
				| undefined;
			if (!channel) {
				results.push({
					channelId: order.channelId,
					name: 'unknown',
					success: false,
				});
				continue;
			}

			if (order.categoryId !== undefined) {
				await channel.setParent(order.categoryId, {
					lockPermissions: false,
				});
			}

			await channel.setPosition(order.position);

			results.push({
				channelId: order.channelId,
				name: channel.name,
				success: true,
			});
		}

		return toolText(JSON.stringify(results));
	} catch (err) {
		return toolError(`Error reordering channels: ${String(err)}`);
	}
}
