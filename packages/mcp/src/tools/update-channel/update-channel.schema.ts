import { z } from 'zod';

export const updateChannelSchema = {
	channelId: z.string().describe('ID of the channel to update'),
	name: z
		.string()
		.min(1)
		.max(100)
		.optional()
		.describe('New name for the channel'),
	topic: z
		.string()
		.max(1024)
		.optional()
		.describe('New topic/description for the channel (text/forum only)'),
	bitrate: z
		.number()
		.min(8000)
		.max(384000)
		.optional()
		.describe('New bitrate in bits per second (voice channels only)'),
	userLimit: z
		.number()
		.min(0)
		.max(99)
		.optional()
		.describe('New user limit (0 = unlimited; voice channels only)'),
	categoryId: z
		.string()
		.optional()
		.describe('New parent category ID to move the channel under'),
	position: z
		.number()
		.optional()
		.describe('New position in the channel list (0 = top)'),
};
