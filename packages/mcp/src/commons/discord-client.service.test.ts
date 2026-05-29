import { describe, expect, it, vi } from 'vitest';
import { createDiscordClientService } from './discord-client.service';

vi.mock('discord.js', async () => {
	const actual =
		await vi.importActual<typeof import('discord.js')>('discord.js');
	return {
		...actual,
		Client: vi.fn(),
	};
});

describe('createDiscordClientService', () => {
	it('should create a service instance', () => {
		const service = createDiscordClientService('token', 'guild-id');
		expect(service).toBeDefined();
		expect(service.isConnected()).toBe(false);
	});

	it('should throw when getting guild before connection', () => {
		const service = createDiscordClientService('token', 'guild-id');
		expect(() => service.getGuild()).toThrow('not connected');
	});
});
