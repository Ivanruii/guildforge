import { setCategoryPermissionsHandler } from './set-category-permissions.handler';
import { setCategoryPermissionsSchema } from './set-category-permissions.schema';

export const setCategoryPermissions = {
	name: 'set_category_permissions' as const,
	description: `Sets permission overwrites for a role on a specific category. Accepts arrays of permission names to allow or deny. If you are unsure about the exact permission names, call list_permission_flags first to get the full list of valid values.`,
	schema: setCategoryPermissionsSchema,
	execute: setCategoryPermissionsHandler,
};
