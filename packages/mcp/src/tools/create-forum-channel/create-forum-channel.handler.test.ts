import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { createForumChannelHandler } from './create-forum-channel.handler';

vi.mock('discord.js', async () => {
	const actual =
		await vi.importActual<typeof import('discord.js')>('discord.js');
	return {
		...actual,
		ChannelType: { GuildForum: 15 },
	};
});

describe('createForumChannelHandler', () => {
	it('should create a forum channel', async () => {
		const mockChannel = { id: 'forum-123', name: 'test-forum' };
		const createMock = vi.fn().mockResolvedValue(mockChannel);
		const mockGuild = {
			channels: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createForumChannelHandler(
			{ name: 'test-forum' },
			service,
		);
		expect(createMock).toHaveBeenCalledWith({
			name: 'test-forum',
			type: 15,
			parent: undefined,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'forum-123', name: 'test-forum' }),
		);
	});

	it('should create a forum channel under a category', async () => {
		const mockChannel = { id: 'forum-456', name: 'Discussions' };
		const createMock = vi.fn().mockResolvedValue(mockChannel);
		const mockGuild = {
			channels: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createForumChannelHandler(
			{ name: 'Discussions', categoryId: 'cat-789' },
			service,
		);
		expect(createMock).toHaveBeenCalledWith({
			name: 'Discussions',
			type: 15,
			parent: 'cat-789',
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'forum-456', name: 'Discussions' }),
		);
	});

	it('should return an error if forum channel creation fails', async () => {
		const createMock = vi
			.fn()
			.mockRejectedValue(new Error('Missing permissions'));
		const mockGuild = {
			channels: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createForumChannelHandler(
			{ name: 'Secret Forum' },
			service,
		);
		expect(createMock).toHaveBeenCalledWith({
			name: 'Secret Forum',
			type: 15,
			parent: undefined,
		});
		expect(result.content[0].text).toBe(
			'Error creating forum channel: Error: Missing permissions',
		);
		expect(result).toHaveProperty('isError', true);
	});
});
