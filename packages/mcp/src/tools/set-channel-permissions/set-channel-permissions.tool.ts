import { setChannelPermissionsHandler } from './set-channel-permissions.handler';
import { setChannelPermissionsSchema } from './set-channel-permissions.schema';

export const setChannelPermissions = {
	name: 'set_channel_permissions' as const,
	description: `Sets permission overwrites for a role on a specific channel or category. Accepts arrays of permission names to allow or deny. Works on both regular channels and category channels. If you are unsure about the exact permission names, call list_permission_flags first to get the full list of valid values.`,
	schema: setChannelPermissionsSchema,
	execute: setChannelPermissionsHandler,
};
