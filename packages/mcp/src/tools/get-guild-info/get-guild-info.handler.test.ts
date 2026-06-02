import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { getGuildInfoHandler } from './get-guild-info.handler';

describe('getGuildInfoHandler', () => {
	it('should return guild info as JSON', async () => {
		const mockGuild = {
			id: 'guild-123',
			name: 'Test Server',
			memberCount: 42,
			iconURL: vi.fn(
				() => 'https://cdn.discordapp.com/icons/guild-123/icon.png',
			),
			ownerId: 'owner-456',
			premiumTier: 2,
			preferredLocale: 'en-US',
		};

		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await getGuildInfoHandler(service);
		expect(result.content).toHaveLength(1);
		expect(result.content[0].type).toBe('text');

		const parsed = JSON.parse(result.content[0].text);
		expect(parsed.id).toBe('guild-123');
		expect(parsed.name).toBe('Test Server');
		expect(parsed.memberCount).toBe(42);
		expect(parsed.iconUrl).toBe(
			'https://cdn.discordapp.com/icons/guild-123/icon.png',
		);
		expect(parsed.ownerId).toBe('owner-456');
		expect(parsed.premiumTier).toBe(2);
		expect(parsed.preferredLocale).toBe('en-US');
	});

	it('should handle null iconUrl', async () => {
		const mockGuild = {
			id: 'guild-789',
			name: 'No Icon Server',
			memberCount: 1,
			iconURL: vi.fn(() => null),
			ownerId: 'owner-000',
			premiumTier: 0,
			preferredLocale: 'es-ES',
		};

		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await getGuildInfoHandler(service);
		const parsed = JSON.parse(result.content[0].text);
		expect(parsed.iconUrl).toBeNull();
		expect(parsed.name).toBe('No Icon Server');
	});
});
