import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { setCategoryPermissionsHandler } from './set-category-permissions.handler';

describe('setCategoryPermissionsHandler', () => {
	it('should set permissions on a category', async () => {
		const editMock = vi.fn().mockResolvedValue(undefined);
		const mockCategory = {
			id: 'cat-1',
			name: 'Text Channels',
			type: 4,
			permissionOverwrites: { edit: editMock },
		};
		const mockRole = { id: 'role-1' };
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockCategory) },
			},
			roles: {
				cache: { get: vi.fn().mockReturnValue(mockRole) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await setCategoryPermissionsHandler(
			{
				categoryId: 'cat-1',
				roleId: 'role-1',
				allow: ['SendMessages'],
			},
			service,
		);
		expect(editMock).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ categoryId: 'cat-1', roleId: 'role-1' }),
		);
	});

	it('should return error if not a category', async () => {
		const mockChannel = {
			id: 'ch-1',
			name: 'general',
			type: 0,
		};
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockChannel) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await setCategoryPermissionsHandler(
			{
				categoryId: 'ch-1',
				roleId: 'role-1',
			},
			service,
		);
		expect(result).toHaveProperty('isError', true);
	});
});
