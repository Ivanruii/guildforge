import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { createRoleHandler } from './create-role.handler';

describe('createRoleHandler', () => {
	it('should create a role with color', async () => {
		const mockRole = { id: 'role-123', name: 'Admin' };
		const createMock = vi.fn().mockResolvedValue(mockRole);
		const mockGuild = {
			roles: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createRoleHandler(
			{ name: 'Admin', color: '#FF0000' },
			service,
		);
		expect(createMock).toHaveBeenCalledWith({
			name: 'Admin',
			color: 0xff0000,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'role-123', name: 'Admin' }),
		);
	});

	it('should create a role without color', async () => {
		const mockRole = { id: 'role-456', name: 'Member' };
		const createMock = vi.fn().mockResolvedValue(mockRole);
		const mockGuild = {
			roles: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createRoleHandler({ name: 'Member' }, service);
		expect(createMock).toHaveBeenCalledWith({
			name: 'Member',
			color: undefined,
		});
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'role-456', name: 'Member' }),
		);
	});
});
