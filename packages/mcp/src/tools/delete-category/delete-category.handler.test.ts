import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { deleteCategoryHandler } from './delete-category.handler';

describe('deleteCategoryHandler', () => {
	it('should delete a category', async () => {
		const mockCategory = {
			id: 'cat-123',
			name: 'Test Category',
			type: 4,
			delete: vi.fn().mockResolvedValue(undefined),
		};
		const mockGuild = {
			channels: {
				cache: { get: vi.fn().mockReturnValue(mockCategory) },
			},
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await deleteCategoryHandler(
			{ id: 'cat-123', confirm: true },
			service,
		);
		expect(mockCategory.delete).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'cat-123', name: 'Test Category' }),
		);
	});

	it('should return error if not a category', async () => {
		const mockChannel = {
			id: 'ch-123',
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

		const result = await deleteCategoryHandler(
			{ id: 'ch-123', confirm: true },
			service,
		);
		expect(result).toHaveProperty('isError', true);
	});
});
