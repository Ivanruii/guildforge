import { listRolesHandler } from './list-roles.handler';

export const listRoles = {
	name: 'list_roles' as const,
	description:
		'Lists all roles in the configured Discord server. Returns an array of objects with id and name.',
	execute: listRolesHandler,
};
