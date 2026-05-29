import { describe, expect, it } from 'vitest';
import { toolError, toolImage, toolText } from './tool-response.helpers';

describe('tool-response.helpers', () => {
	describe('toolText', () => {
		it('should return a text content object', () => {
			const result = toolText('hello');
			expect(result.content).toEqual([{ type: 'text', text: 'hello' }]);
		});
	});

	describe('toolError', () => {
		it('should return an error content object', () => {
			const result = toolError('something went wrong');
			expect(result.content).toEqual([
				{ type: 'text', text: 'something went wrong' },
			]);
			expect(result.isError).toBe(true);
		});
	});

	describe('toolImage', () => {
		it('should return an image content object', () => {
			const result = toolImage('base64data', 'image/png');
			expect(result.content).toEqual([
				{ type: 'image', data: 'base64data', mimeType: 'image/png' },
			]);
		});
	});
});
