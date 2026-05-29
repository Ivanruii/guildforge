import { describe, expect, it } from 'vitest';
import { parseConfig } from './config';

describe('parseConfig', () => {
	it('should parse valid environment variables', () => {
		const env = {
			DISCORD_TOKEN: 'test_token',
			GUILD_ID: 'test_guild_id',
		};
		const result = parseConfig(env);
		expect(result.DISCORD_TOKEN).toBe('test_token');
		expect(result.GUILD_ID).toBe('test_guild_id');
	});

	it('should throw when DISCORD_TOKEN is missing', () => {
		const env = { GUILD_ID: 'test_guild_id' };
		expect(() => parseConfig(env)).toThrow('DISCORD_TOKEN');
	});

	it('should throw when GUILD_ID is missing', () => {
		const env = { DISCORD_TOKEN: 'test_token' };
		expect(() => parseConfig(env)).toThrow('GUILD_ID');
	});
});
