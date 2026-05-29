import { setChannelPermissionsHandler } from './set-channel-permissions.handler';
import { setChannelPermissionsSchema } from './set-channel-permissions.schema';

export const setChannelPermissions = {
	name: 'set_channel_permissions' as const,
	description:
		'Sets permission overwrites for a role on a specific channel or category. Accepts arrays of permission names to allow or deny. Works on both regular channels and category channels.',
	schema: setChannelPermissionsSchema,
	execute: setChannelPermissionsHandler,
};
