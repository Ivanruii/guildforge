import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolText } from '#/commons/tool-response.helpers';

export async function listRolesHandler(service: DiscordClientService) {
	const guild = service.getGuild();
	const roles = guild.roles.cache.map((role) => ({
		id: role.id,
		name: role.name,
		color: role.hexColor,
		position: role.position,
	}));
	return toolText(JSON.stringify(roles));
}
