import { reorderChannelsHandler } from './reorder-channels.handler';
import { reorderChannelsSchema } from './reorder-channels.schema';

export const reorderChannels = {
	name: 'reorder_channels' as const,
	description:
		'Moves and/or reorders channels and categories. Accepts an array of operations, each specifying a channel ID, new position, and optionally a category ID to move under.',
	schema: reorderChannelsSchema,
	execute: reorderChannelsHandler,
};
