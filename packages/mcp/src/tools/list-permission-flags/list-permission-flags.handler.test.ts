import { describe, expect, it } from 'vitest';
import { listPermissionFlagsHandler } from './list-permission-flags.handler';

describe('listPermissionFlagsHandler', () => {
	it('should return a JSON array of permission flag names', async () => {
		const result = await listPermissionFlagsHandler();
		expect(result.content).toHaveLength(1);
		expect(result.content[0].type).toBe('text');
		const flags = JSON.parse(result.content[0].text);
		expect(Array.isArray(flags)).toBe(true);
		expect(flags.length).toBeGreaterThan(0);
		expect(flags.every((f: unknown) => typeof f === 'string')).toBe(true);
		expect(flags).toContain('SendMessages');
		expect(flags).toContain('ViewChannel');
	});
});
