import { z } from 'zod';

export const updateRoleSchema = {
	roleId: z.string().describe('ID of the role to update'),
	name: z.string().min(1).max(100).optional().describe('New name for the role'),
	color: z
		.string()
		.regex(/^#?[0-9A-Fa-f]{6}$/)
		.optional()
		.describe('New hex color for the role (e.g., #FF0000)'),
	hoist: z
		.boolean()
		.optional()
		.describe(
			'Whether to display this role separately in the online members list',
		),
	mentionable: z
		.boolean()
		.optional()
		.describe('Whether anyone can @mention this role'),
};
