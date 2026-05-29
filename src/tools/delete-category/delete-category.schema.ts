import { z } from 'zod';

export const deleteCategorySchema = {
	id: z.string().describe('ID of the category to delete'),
	confirm: z
		.literal(true)
		.describe('Explicit confirmation required. Must be set to true.'),
};
