import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { deleteRoleHandler } from './delete-role.handler';

describe('deleteRoleHandler', () => {
	it('should delete a role', async () => {
		const mockRole = {
			id: 'role-123',
			name: 'Admin',
			delete: vi.fn().mockResolvedValue(undefined),
		};
		const mockGuild = {
			roles: {
				cache: { get: vi.fn().mockReturnValue(mockRole) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await deleteRoleHandler(
			{ id: 'role-123', confirm: true },
			service,
		);
		expect(mockRole.delete).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'role-123', name: 'Admin' }),
		);
	});

	it('should return error if role not found', async () => {
		const mockGuild = {
			roles: {
				cache: { get: vi.fn().mockReturnValue(undefined) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await deleteRoleHandler(
			{ id: 'role-999', confirm: true },
			service,
		);
		expect(result).toHaveProperty('isError', true);
	});
});
