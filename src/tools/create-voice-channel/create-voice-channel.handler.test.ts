import { describe, expect, it, vi } from 'vitest';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { createVoiceChannelHandler } from './create-voice-channel.handler';

describe('createVoiceChannelHandler', () => {
	it('should create a voice channel', async () => {
		const mockChannel = { id: 'vc-123', name: 'General Voice' };
		const createMock = vi.fn().mockResolvedValue(mockChannel);
		const mockGuild = {
			channels: { create: createMock },
		};
		const service = {
			getGuild: () => mockGuild,
		} as unknown as DiscordClientService;

		const result = await createVoiceChannelHandler(
			{ name: 'General Voice' },
			service,
		);
		expect(createMock).toHaveBeenCalled();
		expect(result.content[0].text).toBe(
			JSON.stringify({ id: 'vc-123', name: 'General Voice' }),
		);
	});
});
