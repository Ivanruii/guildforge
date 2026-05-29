import type { Guild } from 'discord.js';
import { Client, GatewayIntentBits, PermissionsBitField } from 'discord.js';

export interface DiscordClientService {
	connect(): Promise<void>;
	disconnect(): Promise<void>;
	getGuild(): Guild;
	isConnected(): boolean;
}

export function createDiscordClientService(
	token: string,
	guildId: string,
): DiscordClientService {
	const client = new Client({
		intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
	});

	let connected = false;

	async function connect(): Promise<void> {
		if (connected) {
			return;
		}

		await new Promise<void>((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject(new Error('Discord client connection timed out after 30s'));
			}, 30000);

			client.once('ready', () => {
				clearTimeout(timeout);
				connected = true;
				resolve();
			});

			client.login(token).catch((err) => {
				clearTimeout(timeout);
				reject(err);
			});
		});

		const guild = client.guilds.cache.get(guildId);
		if (!guild) {
			throw new Error(
				`Guild with ID "${guildId}" not found or bot is not a member. Ensure the bot has been invited to this server.`,
			);
		}

		const botMember = await guild.members.fetchMe();
		const requiredPermissions = [
			PermissionsBitField.Flags.ManageChannels,
			PermissionsBitField.Flags.ManageRoles,
		];

		const missing = requiredPermissions.filter(
			(perm) => !botMember.permissions.has(perm),
		);

		if (missing.length > 0) {
			const missingNames = missing.map((perm) => {
				const found = Object.entries(PermissionsBitField.Flags).find(
					([, value]) => value === perm,
				);
				return found?.[0] ?? String(perm);
			});
			throw new Error(
				`Bot is missing required permissions: ${missingNames.join(', ')}. Please grant Manage Channels and Manage Roles to the bot.`,
			);
		}
	}

	async function disconnect(): Promise<void> {
		if (!connected) {
			return;
		}
		await client.destroy();
		connected = false;
	}

	function getGuild(): Guild {
		if (!connected) {
			throw new Error('Discord client is not connected. Call connect() first.');
		}
		const guild = client.guilds.cache.get(guildId);
		if (!guild) {
			throw new Error(`Guild with ID "${guildId}" is no longer available.`);
		}
		return guild;
	}

	function isConnected(): boolean {
		return connected;
	}

	return {
		connect,
		disconnect,
		getGuild,
		isConnected,
	};
}
