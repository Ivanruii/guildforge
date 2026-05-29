import { z } from 'zod';

export const deleteChannelSchema = {
	id: z.string().describe('ID of the channel to delete'),
	confirm: z
		.literal(true)
		.describe('Explicit confirmation required. Must be set to true.'),
};
