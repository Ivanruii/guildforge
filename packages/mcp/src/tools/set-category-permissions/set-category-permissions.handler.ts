import { ChannelType, PermissionsBitField } from 'discord.js';
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

export async function setCategoryPermissionsHandler(
	args: {
		categoryId: string;
		roleId: string;
		allow?: string[];
		deny?: string[];
	},
	service: DiscordClientService,
) {
	try {
		const guild = service.getGuild();
		const category = guild.channels.cache.get(args.categoryId);
		if (!category) {
			return toolError(`Category with ID "${args.categoryId}" not found.`);
		}

		if (category.type !== ChannelType.GuildCategory) {
			return toolError(
				`Channel with ID "${args.categoryId}" is not a category.`,
			);
		}

		const role = guild.roles.cache.get(args.roleId);
		if (!role) {
			return toolError(`Role with ID "${args.roleId}" not found.`);
		}

		const options = buildPermissionOptions(args.allow, args.deny);

		await category.permissionOverwrites.edit(role.id, options);

		return toolText(
			JSON.stringify({ categoryId: args.categoryId, roleId: args.roleId }),
		);
	} catch (err) {
		return toolError(`Error setting category permissions: ${String(err)}`);
	}
}
