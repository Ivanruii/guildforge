import { describe, expect, it } from 'vitest';
import { pingHandler } from './ping.handler';

describe('pingHandler', () => {
	it('should return pong', async () => {
		const result = await pingHandler();
		expect(result.content).toHaveLength(1);
		expect(result.content[0]).toEqual({ type: 'text', text: 'pong' });
	});
});
