import { deleteChannelHandler } from './delete-channel.handler';
import { deleteChannelSchema } from './delete-channel.schema';

export const deleteChannel = {
	name: 'delete_channel' as const,
	description:
		'Deletes a channel from the Discord server. Requires explicit confirmation.',
	schema: deleteChannelSchema,
	execute: deleteChannelHandler,
};
