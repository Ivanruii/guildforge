import { z } from 'zod';

export const createCategorySchema = {
	name: z.string().min(1).max(100).describe('Name of the category to create'),
};
