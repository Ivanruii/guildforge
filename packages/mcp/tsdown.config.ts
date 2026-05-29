import { baseTsdownConfig } from '@discord-manager/tsdown-config/base';

export default {
	...baseTsdownConfig,
	entry: ['src/index.ts'],
	outputOptions: {
		banner: '#!/usr/bin/env node',
	},
};
