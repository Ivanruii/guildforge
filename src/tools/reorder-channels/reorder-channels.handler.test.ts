import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { reorderChannelsHandler } from './reorder-channels.handler';

describe('reorderChannelsHandler', () => {
	it('should reorder channels', async () => {
		const setParent = vi.fn().mockResolvedValue(undefined);
		const setPosition = vi.fn().mockResolvedValue(undefined);
		const mockChannel = {
			id: 'ch-1',
			name: 'general',
			setParent,
			setPosition,
		};
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockChannel) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await reorderChannelsHandler(
			{
				orders: [{ channelId: 'ch-1', position: 2, categoryId: 'cat-1' }],
			},
			service,
		);
		expect(setParent).toHaveBeenCalledWith('cat-1', { lockPermissions: false });
		expect(setPosition).toHaveBeenCalledWith(2);
		const parsed = JSON.parse(result.content[0].text);
		expect(parsed[0].success).toBe(true);
	});

	it('should return error if channel not found', async () => {
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(undefined) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await reorderChannelsHandler(
			{
				orders: [{ channelId: 'ch-999', position: 0 }],
			},
			service,
		);
		const parsed = JSON.parse(result.content[0].text);
		expect(parsed[0].success).toBe(false);
	});
});
