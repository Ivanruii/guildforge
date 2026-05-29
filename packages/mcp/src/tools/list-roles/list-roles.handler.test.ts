import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { listRolesHandler } from './list-roles.handler';

describe('listRolesHandler', () => {
	it('should return list of roles', async () => {
		const mockRoles = [
			{ id: '1', name: '@everyone' },
			{ id: '2', name: 'Admin' },
		];
		const mockGuild = {
			roles: {
				cache: {
					map: vi.fn((fn) => mockRoles.map(fn)),
				},
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await listRolesHandler(service);
		expect(result.content[0].text).toBe(JSON.stringify(mockRoles));
	});
});
