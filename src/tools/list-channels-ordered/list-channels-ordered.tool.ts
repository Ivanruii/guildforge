import { listChannelsOrderedHandler } from './list-channels-ordered.handler';

export const listChannelsOrdered = {
	name: 'list_channels_ordered' as const,
	description:
		'Lists all channels and categories in the order they appear in the Discord client (top to bottom). Categories include their nested channels.',
	execute: listChannelsOrderedHandler,
};
