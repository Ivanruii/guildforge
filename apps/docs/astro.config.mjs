// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'GuildForge',

			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/guildforge/guildforge',
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Getting Started', slug: 'docs/getting-started' },
						{ label: 'Environment Setup', slug: 'docs/environment' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Available Tools', slug: 'docs/tools' },
						{ label: 'Permissions', slug: 'docs/permissions' },
					],
				},
				{
					label: 'Development',
					items: [{ label: 'Contributing', slug: 'docs/development' }],
				},
			],
		}),
	],
});
