import { createForumChannelHandler } from './create-forum-channel.handler';
import { createForumChannelSchema } from './create-forum-channel.schema';

export const createForumChannel = {
	name: 'create_forum_channel' as const,
	description: 'Creates a new forum channel in the Discord server.',
	schema: createForumChannelSchema,
	execute: createForumChannelHandler,
};
