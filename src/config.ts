import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
	DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
	GUILD_ID: z.string().min(1, 'GUILD_ID is required'),
});

export type Config = z.infer<typeof envSchema>;

export function parseConfig(env: Record<string, string | undefined>): Config {
	const parsed = envSchema.safeParse(env);

	if (!parsed.success) {
		const messages = parsed.error.issues.map(
			(issue) => `${issue.path.join('.')}: ${issue.message}`,
		);
		throw new Error(`Invalid environment variables: ${messages.join(', ')}`);
	}

	return parsed.data;
}
