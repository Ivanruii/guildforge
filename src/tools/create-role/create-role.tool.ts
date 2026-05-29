import { createRoleHandler } from './create-role.handler';
import { createRoleSchema } from './create-role.schema';

export const createRole = {
	name: 'create_role' as const,
	description: 'Creates a new role in the Discord server.',
	schema: createRoleSchema,
	execute: createRoleHandler,
};
