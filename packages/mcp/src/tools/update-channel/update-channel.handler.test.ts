import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { updateChannelHandler } from './update-channel.handler';

describe('updateChannelHandler', () => {
	it('should update channel name', async () => {
		const editMock = vi.fn().mockResolvedValue({
			id: 'ch-1',
			name: 'new-name',
			type: 0,
		});
		const mockChannel = {
			isTextBased: () => true,
			isVoiceBased: () => false,
			edit: editMock,
		};
		const fetchMock = vi.fn().mockResolvedValue(mockChannel);
		const mockGuild = {
			channels: { fetch: fetchMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await updateChannelHandler(
			{ channelId: 'ch-1', name: 'new-name' },
			service,
		);
		expect(fetchMock).toHaveBeenCalledWith('ch-1');
		expect(editMock).toHaveBeenCalledWith({ name: 'new-name' });
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'ch-1', name: 'new-name', type: '0' }),
		);
	});

	it('should update multiple fields', async () => {
		const editMock = vi.fn().mockResolvedValue({
			id: 'ch-2',
			name: 'voice-updated',
			type: 2,
		});
		const mockChannel = {
			isTextBased: () => false,
			isVoiceBased: () => true,
			edit: editMock,
		};
		const fetchMock = vi.fn().mockResolvedValue(mockChannel);
		const mockGuild = {
			channels: { fetch: fetchMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await updateChannelHandler(
			{
				channelId: 'ch-2',
				name: 'voice-updated',
				bitrate: 64000,
				userLimit: 10,
				position: 3,
			},
			service,
		);
		expect(editMock).toHaveBeenCalledWith({
			name: 'voice-updated',
			bitrate: 64000,
			userLimit: 10,
			position: 3,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'ch-2', name: 'voice-updated', type: '2' }),
		);
	});

	it('should return error if channel not found', async () => {
		const fetchMock = vi.fn().mockResolvedValue(null);
		const mockGuild = {
			channels: { fetch: fetchMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await updateChannelHandler(
			{ channelId: 'missing', name: 'x' },
			service,
		);
		expect(result).toHaveProperty('isError', true);
		expect(result.content[0].text).toContain('not found');
	});
});
