import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function deleteRoleHandler(
	args: { id: string; confirm: true },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const role = guild.roles.cache.get(args.id);
		if (!role) {
			return toolError(`Role with ID "${args.id}" not found.`);
		}
		await role.delete();
		return toolText(JSON.stringify({ id: role.id, name: role.name }));
	} catch (err) {
		return toolError(`Error deleting role: ${String(err)}`);
	}
}
