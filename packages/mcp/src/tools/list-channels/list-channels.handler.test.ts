import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { listChannelsHandler } from './list-channels.handler';

describe('listChannelsHandler', () => {
	it('should return list of channels with string type names', async () => {
		const mockChannels = [
			{ id: '1', name: 'general', type: 0 },
			{ id: '2', name: 'voice', type: 2 },
		];
		const mockGuild = {
			channels: {
				cache: {
					map: vi.fn((fn) => mockChannels.map(fn)),
				},
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await listChannelsHandler(service);
		const expected = [
			{ id: '1', name: 'general', type: 'GuildText' },
			{ id: '2', name: 'voice', type: 'GuildVoice' },
		];
		expect(result.content[0].text).toBe(JSON.stringify(expected));
	});
});
