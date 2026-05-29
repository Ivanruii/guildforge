import { z } from 'zod';

export const createVoiceChannelSchema = {
	name: z
		.string()
		.min(1)
		.max(100)
		.describe('Name of the voice channel to create'),
	categoryId: z
		.string()
		.optional()
		.describe('Optional ID of the category to place the channel under'),
};
