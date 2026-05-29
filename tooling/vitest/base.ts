import { defineConfig } from 'vitest/config';

export const baseVitestConfig = defineConfig({
	test: {
		globals: true,
		clearMocks: true,
		restoreMocks: true,
		passWithNoTests: true,
		coverage: {
			provider: 'v8',
			reporter: ['text', 'html', 'lcov'],
			exclude: [
				'**/*.spec.{ts,tsx}',
				'**/*.test.ts',
				'**/test/**',
				'**/*.d.ts',
				'**/vitest.*.ts',
				'**/index.ts',
				'**/types.ts',
				'**/*.model.ts',
				'**/*.validation.ts',
				'**/*.constant.ts',
				'**/*.config.ts',
			],
		},
	},
});
