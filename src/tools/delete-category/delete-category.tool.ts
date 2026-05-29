import { deleteCategoryHandler } from './delete-category.handler';
import { deleteCategorySchema } from './delete-category.schema';

export const deleteCategory = {
	name: 'delete_category' as const,
	description:
		'Deletes a category from the Discord server. Requires explicit confirmation.',
	schema: deleteCategorySchema,
	execute: deleteCategoryHandler,
};
