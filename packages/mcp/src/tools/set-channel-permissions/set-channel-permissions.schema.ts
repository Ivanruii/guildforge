import { z } from 'zod';

export const setChannelPermissionsSchema = {
	channelId: z.string().describe('ID of the channel to modify permissions for'),
	roleId: z.string().describe('ID of the role to set permissions for'),
	allow: z
		.array(z.string())
		.optional()
		.describe(
			`Optional array of permission names to allow (e.g., SendMessages, ViewChannel). Use list_permission_flags to get the full list of valid permission names.`,
		),
	deny: z
		.array(z.string())
		.optional()
		.describe(
			`Optional array of permission names to deny (e.g., SendMessages, ViewChannel). Use list_permission_flags to get the full list of valid permission names.`,
		),
};
