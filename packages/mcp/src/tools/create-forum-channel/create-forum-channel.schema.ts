import { z } from 'zod';

export const createForumChannelSchema = {
	name: z
		.string()
		.min(1)
		.max(100)
		.describe('Name of the forum channel to create'),
	categoryId: z
		.string()
		.optional()
		.describe('Optional ID of the category to place the channel under'),
};
