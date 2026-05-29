import { z } from 'zod';

export const createRoleSchema = {
	name: z.string().min(1).max(100).describe('Name of the role to create'),
	color: z
		.string()
		.regex(/^#?[0-9A-Fa-f]{6}$/)
		.optional()
		.describe('Optional hex color for the role (e.g., #FF0000)'),
};
