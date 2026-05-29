import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { assignRoleHandler } from './assign-role.handler';

describe('assignRoleHandler', () => {
	it('should add a role to a user', async () => {
		const rolesAdd = vi.fn().mockResolvedValue(undefined);
		const rolesRemove = vi.fn().mockResolvedValue(undefined);
		const mockMember = {
			roles: { add: rolesAdd, remove: rolesRemove },
		};
		const mockRole = { id: 'role-123' };
		const mockGuild = {
			members: { fetch: vi.fn().mockResolvedValue(mockMember) },
			roles: { cache: { get: vi.fn().mockReturnValue(mockRole) } },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await assignRoleHandler(
			{ userId: 'user-456', roleId: 'role-123', action: 'add' },
			service,
		);
		expect(rolesAdd).toHaveBeenCalledWith(mockRole);
		expect(result.content[0].text).toBe(
			JSON.stringify({ userId: 'user-456', roleId: 'role-123' }),
		);
	});

	it('should remove a role from a user', async () => {
		const rolesAdd = vi.fn().mockResolvedValue(undefined);
		const rolesRemove = vi.fn().mockResolvedValue(undefined);
		const mockMember = {
			roles: { add: rolesAdd, remove: rolesRemove },
		};
		const mockRole = { id: 'role-123' };
		const mockGuild = {
			members: { fetch: vi.fn().mockResolvedValue(mockMember) },
			roles: { cache: { get: vi.fn().mockReturnValue(mockRole) } },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await assignRoleHandler(
			{ userId: 'user-456', roleId: 'role-123', action: 'remove' },
			service,
		);
		expect(rolesRemove).toHaveBeenCalledWith(mockRole);
		expect(result.content[0].text).toBe(
			JSON.stringify({ userId: 'user-456', roleId: 'role-123' }),
		);
	});

	it('should return error if role not found', async () => {
		const mockGuild = {
			members: { fetch: vi.fn().mockResolvedValue({}) },
			roles: { cache: { get: vi.fn().mockReturnValue(undefined) } },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await assignRoleHandler(
			{ userId: 'user-456', roleId: 'role-123', action: 'add' },
			service,
		);
		expect(result).toHaveProperty('isError', true);
	});
});
