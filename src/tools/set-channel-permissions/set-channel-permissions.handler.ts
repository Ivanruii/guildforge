import { PermissionsBitField } from 'discord.js';
import type { DiscordClientService } from '#/commons/discord-client.service';
import { toolError, toolText } from '#/commons/tool-response.helpers';

type PermissionOverwriteOptions = Partial<
	Record<keyof typeof PermissionsBitField.Flags, boolean | null>
>;

function buildPermissionOptions(
	allow: string[] | undefined,
	deny: string[] | undefined,
): PermissionOverwriteOptions {
	const options: PermissionOverwriteOptions = {};

	for (const perm of allow ?? []) {
		if (
			PermissionsBitField.Flags[
				perm as keyof typeof PermissionsBitField.Flags
			] === undefined
		) {
			throw new Error(`Unknown permission: "${perm}"`);
		}
		options[perm as keyof typeof PermissionsBitField.Flags] = true;
	}

	for (const perm of deny ?? []) {
		if (
			PermissionsBitField.Flags[
				perm as keyof typeof PermissionsBitField.Flags
			] === undefined
		) {
			throw new Error(`Unknown permission: "${perm}"`);
		}
		options[perm as keyof typeof PermissionsBitField.Flags] = false;
	}

	return options;
}

export async function setChannelPermissionsHandler(
	args: {
		channelId: string;
		roleId: string;
		allow?: string[];
		deny?: string[];
	},
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const channel = guild.channels.cache.get(args.channelId);
		if (!channel) {
			return toolError(`Channel with ID "${args.channelId}" not found.`);
		}

		if (!('permissionOverwrites' in channel)) {
			return toolError(
				`Channel with ID "${args.channelId}" does not support permission overwrites.`,
			);
		}

		const role = guild.roles.cache.get(args.roleId);
		if (!role) {
			return toolError(`Role with ID "${args.roleId}" not found.`);
		}

		const options = buildPermissionOptions(args.allow, args.deny);

		await (
			channel as Extract<typeof channel, { permissionOverwrites: unknown }>
		).permissionOverwrites.edit(role.id, options);

		return toolText(
			JSON.stringify({ channelId: args.channelId, roleId: args.roleId }),
		);
	} catch (err) {
		return toolError(`Error setting channel permissions: ${String(err)}`);
	}
}
