// @ts-check
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Discord Manager MCP',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/discord-manager/discord-manager-mcp',
				},
			],
			sidebar: [
				{
					label: 'Start here',
					items: [
						{ label: 'Getting Started', slug: 'getting-started' },
						{ label: 'Environment Setup', slug: 'environment' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Available Tools', slug: 'tools' },
						{ label: 'Permissions', slug: 'permissions' },
					],
				},
				{
					label: 'Development',
					items: [{ label: 'Contributing', slug: 'development' }],
				},
			],
		}),
	],
});
