import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function updateRoleHandler(
	args: {
		roleId: string;
		name?: string;
		color?: string;
		hoist?: boolean;
		mentionable?: boolean;
	},
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const role = await guild.roles.fetch(args.roleId);

		if (!role) {
			return toolError(`Role with ID "${args.roleId}" not found.`);
		}

		const editData: Record<string, unknown> = {};

		if (args.name !== undefined) editData.name = args.name;
		if (args.color !== undefined) {
			editData.color = Number.parseInt(args.color.replace('#', ''), 16);
		}
		if (args.hoist !== undefined) editData.hoist = args.hoist;
		if (args.mentionable !== undefined) editData.mentionable = args.mentionable;

		const updated = await role.edit(editData);

		return toolText(
			JSON.stringify({
				id: updated.id,
				name: updated.name,
			}),
		);
	} catch (err) {
		return toolError(`Error updating role: ${String(err)}`);
	}
}
