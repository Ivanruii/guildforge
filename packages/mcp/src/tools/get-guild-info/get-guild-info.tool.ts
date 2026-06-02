import { getGuildInfoHandler } from './get-guild-info.handler';

export const getGuildInfo = {
	name: 'get_guild_info' as const,
	description:
		'Returns basic information about the configured Discord server (name, member count, icon URL, owner ID, boost level, preferred locale). Use this at the beginning of a conversation to confirm which server is being managed.',
	execute: getGuildInfoHandler,
};
