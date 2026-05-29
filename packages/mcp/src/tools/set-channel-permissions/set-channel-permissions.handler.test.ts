import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { setChannelPermissionsHandler } from './set-channel-permissions.handler';

describe('setChannelPermissionsHandler', () => {
	it('should set permissions on a channel', async () => {
		const editMock = vi.fn().mockResolvedValue(undefined);
		const mockChannel = {
			id: 'ch-1',
			name: 'general',
			permissionOverwrites: { edit: editMock },
		};
		const mockRole = { id: 'role-1' };
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockChannel) },
			},
			roles: {
				cache: { get: vi.fn().mockReturnValue(mockRole) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await setChannelPermissionsHandler(
			{
				channelId: 'ch-1',
				roleId: 'role-1',
				allow: ['SendMessages'],
				deny: ['MentionEveryone'],
			},
			service,
		);
		expect(editMock).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ channelId: 'ch-1', roleId: 'role-1' }),
		);
	});

	it('should return error if channel does not support overwrites', async () => {
		const mockChannel = {
			id: 'ch-1',
			name: 'general',
		};
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockChannel) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await setChannelPermissionsHandler(
			{
				channelId: 'ch-1',
				roleId: 'role-1',
			},
			service,
		);
		expect(result).toHaveProperty('isError', true);
	});
});
