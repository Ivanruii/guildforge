import { updateRoleHandler } from './update-role.handler';
import { updateRoleSchema } from './update-role.schema';

export const updateRole = {
	name: 'update_role' as const,
	description:
		"Updates properties of an existing role (name, color, hoist, mentionable). Use this when the user wants to rename a role, change its color, or toggle whether it's displayed separately or mentionable.",
	schema: updateRoleSchema,
	execute: updateRoleHandler,
};
