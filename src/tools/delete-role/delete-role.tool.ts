import { deleteRoleHandler } from './delete-role.handler';
import { deleteRoleSchema } from './delete-role.schema';

export const deleteRole = {
	name: 'delete_role' as const,
	description:
		'Deletes a role from the Discord server. Requires explicit confirmation.',
	schema: deleteRoleSchema,
	execute: deleteRoleHandler,
};
