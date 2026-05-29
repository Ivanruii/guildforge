import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { createTextChannelHandler } from './create-text-channel.handler';

vi.mock('discord.js', async () => {
	const actual =
		await vi.importActual<typeof import('discord.js')>('discord.js');
	return {
		...actual,
		ChannelType: { GuildText: 0 },
	};
});

describe('createTextChannelHandler', () => {
	it('should create a text channel', async () => {
		const mockChannel = { id: '123', name: 'test-channel' };
		const createMock = vi.fn().mockResolvedValue(mockChannel);
		const mockGuild = {
			channels: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createTextChannelHandler(
			{ name: 'test-channel' },
			service,
		);
		expect(createMock).toHaveBeenCalledWith({
			name: 'test-channel',
			type: 0,
			parent: undefined,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: '123', name: 'test-channel' }),
		);
	});
});
