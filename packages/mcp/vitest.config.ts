import { baseVitestConfig } from '@guildforge/vitest-config/base';
import { mergeConfig } from 'vitest/config';

export default mergeConfig(baseVitestConfig, {
	test: {},
});
