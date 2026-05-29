import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { deleteChannelHandler } from './delete-channel.handler';

describe('deleteChannelHandler', () => {
	it('should delete a channel', async () => {
		const mockChannel = {
			id: 'ch-123',
			name: 'general',
			delete: vi.fn().mockResolvedValue(undefined),
		};
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockChannel) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await deleteChannelHandler(
			{ id: 'ch-123', confirm: true },
			service,
		);
		expect(mockChannel.delete).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'ch-123', name: 'general' }),
		);
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

		const result = await deleteChannelHandler(
			{ id: 'ch-999', confirm: true },
			service,
		);
		expect(result).toHaveProperty('isError', true);
	});
});
