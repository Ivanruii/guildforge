import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { createCategoryHandler } from './create-category.handler';

describe('createCategoryHandler', () => {
	it('should create a category', async () => {
		const mockCategory = { id: 'cat-123', name: 'Test Category' };
		const createMock = vi.fn().mockResolvedValue(mockCategory);
		const mockGuild = {
			channels: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createCategoryHandler(
			{ name: 'Test Category' },
			service,
		);
		expect(createMock).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'cat-123', name: 'Test Category' }),
		);
	});
});
