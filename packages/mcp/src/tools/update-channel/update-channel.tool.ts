import { updateChannelHandler } from './update-channel.handler';
import { updateChannelSchema } from './update-channel.schema';

export const updateChannel = {
	name: 'update_channel' as const,
	description:
		'Updates properties of an existing channel (name, topic, bitrate, userLimit, categoryId, position). Use this when the user wants to rename a channel or change its settings without deleting it.',
	schema: updateChannelSchema,
	execute: updateChannelHandler,
};
