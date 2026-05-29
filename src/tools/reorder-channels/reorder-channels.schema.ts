import { z } from 'zod';

export const reorderChannelsSchema = {
	orders: z
		.array(
			z.object({
				channelId: z.string().describe('ID of the channel to move/reorder'),
				position: z
					.number()
					.int()
					.min(0)
					.describe('New position for the channel (0 = top)'),
				categoryId: z
					.string()
					.optional()
					.describe(
						'Optional category ID to move the channel under. Omit to keep current parent.',
					),
			}),
		)
		.describe('Array of channel reorder operations'),
};
