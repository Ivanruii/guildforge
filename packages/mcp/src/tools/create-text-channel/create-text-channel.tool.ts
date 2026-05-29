import { createTextChannelHandler } from './create-text-channel.handler';
import { createTextChannelSchema } from './create-text-channel.schema';

export const createTextChannel = {
	name: 'create_text_channel' as const,
	description: 'Creates a new text channel in the Discord server.',
	schema: createTextChannelSchema,
	execute: createTextChannelHandler,
};
