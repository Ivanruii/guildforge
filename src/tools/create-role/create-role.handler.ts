import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function createRoleHandler(
	args: { name: string; color?: string },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const colorValue = args.color
			? Number.parseInt(args.color.replace('#', ''), 16)
			: undefined;
		const role = await guild.roles.create({
			name: args.name,
			color: colorValue,
		});
		return toolText(JSON.stringify({ id: role.id, name: role.name }));
	} catch (err) {
		return toolError(`Error creating role: ${String(err)}`);
	}
}
