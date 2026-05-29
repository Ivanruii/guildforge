import { createCategoryHandler } from './create-category.handler';
import { createCategorySchema } from './create-category.schema';

export const createCategory = {
	name: 'create_category' as const,
	description: 'Creates a new category in the Discord server.',
	schema: createCategorySchema,
	execute: createCategoryHandler,
};
