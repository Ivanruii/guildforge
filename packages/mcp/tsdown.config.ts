import { baseTsdownConfig } from '@guildforge/tsdown-config/base';

export default {
	...baseTsdownConfig,
	entry: ['src/index.ts'],
	outputOptions: {
		banner: '#!/usr/bin/env node',
	},
};
