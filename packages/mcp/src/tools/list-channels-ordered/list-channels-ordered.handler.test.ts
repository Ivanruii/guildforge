import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { listChannelsOrderedHandler } from './list-channels-ordered.handler';

describe('listChannelsOrderedHandler', () => {
	it('should return channels ordered with categories and children', async () => {
		const mockChannels = [
			{
				id: 'cat-1',
				name: 'Text Channels',
				type: 4,
				position: 0,
				parentId: null,
			},
			{ id: 'ch-1', name: 'general', type: 0, position: 0, parentId: 'cat-1' },
			{ id: 'ch-2', name: 'random', type: 0, position: 1, parentId: 'cat-1' },
			{
				id: 'cat-2',
				name: 'Voice Channels',
				type: 4,
				position: 1,
				parentId: null,
			},
			{ id: 'ch-3', name: 'Lobby', type: 2, position: 0, parentId: 'cat-2' },
		];
		const mockGuild = {
			channels: {
				cache: {
					values: () => mockChannels,
				},
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await listChannelsOrderedHandler(service);
		const parsed = JSON.parse(result.content[0].text);
		expect(parsed).toHaveLength(2);
		expect(parsed[0].type).toBe('GuildCategory');
		expect(parsed[0].children).toHaveLength(2);
		expect(parsed[1].type).toBe('GuildCategory');
		expect(parsed[1].children).toHaveLength(1);
	});
});
