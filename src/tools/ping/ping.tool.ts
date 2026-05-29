import { pingHandler } from './ping.handler';

export const ping = {
	name: 'ping' as const,
	description:
		'Responds with pong. Useful for verifying the server is running.',
	execute: pingHandler,
};
