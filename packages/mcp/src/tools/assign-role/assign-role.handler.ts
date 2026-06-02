import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

export async function assignRoleHandler(
	args: { userId: string; roleId: string; action: 'add' | 'remove' },
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const member = await guild.members.fetch(args.userId);
		if (!member) {
			return toolError(
				`User with ID "${args.userId}" not found in the server.`,
			);
		}

		const role = guild.roles.cache.get(args.roleId);
		if (!role) {
			return toolError(`Role with ID "${args.roleId}" not found.`);
		}

		if (args.action === 'add') {
			await member.roles.add(role);
		} else {
			await member.roles.remove(role);
		}

		const response = {
			userId: args.userId,
			roleId: args.roleId,
			action: args.action,
			memberDisplayName:
				member.displayName ?? member.user?.username ?? args.userId,
			roleName: role.name,
			suggestion: `Role '${role.name}' ${args.action === 'add' ? 'assigned to' : 'removed from'} '${member.displayName ?? member.user?.username ?? args.userId}'.`,
		};
		return toolText(JSON.stringify(response));
	} catch (err) {
		return toolError(`Error assigning role: ${String(err)}`);
	}
}
