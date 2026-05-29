import { z } from 'zod';

export const assignRoleSchema = {
	userId: z.string().describe('ID of the user to assign/remove the role from'),
	roleId: z.string().describe('ID of the role to assign or remove'),
	action: z
		.enum(['add', 'remove'])
		.describe('Whether to add or remove the role from the user'),
};
