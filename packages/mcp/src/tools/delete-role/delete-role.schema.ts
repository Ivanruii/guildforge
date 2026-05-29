import { z } from 'zod';

export const deleteRoleSchema = {
	id: z.string().describe('ID of the role to delete'),
	confirm: z
		.literal(true)
		.describe('Explicit confirmation required. Must be set to true.'),
};
