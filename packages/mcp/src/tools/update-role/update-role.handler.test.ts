import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { updateRoleHandler } from './update-role.handler';

describe('updateRoleHandler', () => {
	it('should update role name and color', async () => {
		const editMock = vi.fn().mockResolvedValue({
			id: 'role-1',
			name: 'Updated Role',
		});
		const mockRole = { edit: editMock };
		const fetchMock = vi.fn().mockResolvedValue(mockRole);
		const mockGuild = {
			roles: { fetch: fetchMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await updateRoleHandler(
			{ roleId: 'role-1', name: 'Updated Role', color: '#00FF00' },
			service,
		);
		expect(fetchMock).toHaveBeenCalledWith('role-1');
		expect(editMock).toHaveBeenCalledWith({
			name: 'Updated Role',
			color: 0x00ff00,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'role-1', name: 'Updated Role' }),
		);
	});

	it('should update hoist and mentionable', async () => {
		const editMock = vi.fn().mockResolvedValue({
			id: 'role-2',
			name: 'Moderator',
		});
		const mockRole = { edit: editMock };
		const fetchMock = vi.fn().mockResolvedValue(mockRole);
		const mockGuild = {
			roles: { fetch: fetchMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await updateRoleHandler(
			{ roleId: 'role-2', hoist: true, mentionable: true },
			service,
		);
		expect(editMock).toHaveBeenCalledWith({
			hoist: true,
			mentionable: true,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'role-2', name: 'Moderator' }),
		);
	});

	it('should return error if role not found', async () => {
		const fetchMock = vi.fn().mockResolvedValue(null);
		const mockGuild = {
			roles: { fetch: fetchMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await updateRoleHandler(
			{ roleId: 'missing', name: 'x' },
			service,
		);
		expect(result).toHaveProperty('isError', true);
		expect(result.content[0].text).toContain('not found');
	});
});
