import { createVoiceChannelHandler } from './create-voice-channel.handler';
import { createVoiceChannelSchema } from './create-voice-channel.schema';

export const createVoiceChannel = {
	name: 'create_voice_channel' as const,
	description: 'Creates a new voice channel in the Discord server.',
	schema: createVoiceChannelSchema,
	execute: createVoiceChannelHandler,
};
