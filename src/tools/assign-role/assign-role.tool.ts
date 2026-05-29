import { assignRoleHandler } from './assign-role.handler';
import { assignRoleSchema } from './assign-role.schema';

export const assignRole = {
	name: 'assign_role' as const,
	description: 'Assigns or removes a role from a user in the Discord server.',
	schema: assignRoleSchema,
	execute: assignRoleHandler,
};
