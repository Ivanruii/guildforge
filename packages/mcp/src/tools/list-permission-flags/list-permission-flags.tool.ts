import { listPermissionFlagsHandler } from './list-permission-flags.handler';

export const listPermissionFlags = {
	name: 'list_permission_flags' as const,
	description:
		'Returns all valid Discord permission flag names that can be used in set_channel_permissions and set_category_permissions. Use this when you need to know the exact names of permissions to allow or deny.',
	execute: listPermissionFlagsHandler,
};
