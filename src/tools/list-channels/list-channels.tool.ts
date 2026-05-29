import { listChannelsHandler } from './list-channels.handler';

export const listChannels = {
	name: 'list_channels' as const,
	description:
		'Lists all channels and categories in the configured Discord server. Returns an array of objects with id, name, and type.',
	execute: listChannelsHandler,
};
