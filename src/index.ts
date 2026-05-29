import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createDiscordClientService } from './commons/discord-client.service';
import { parseConfig } from './config';
import { assignRole } from './tools/assign-role';
import { createCategory } from './tools/create-category';
import { createRole } from './tools/create-role';
import { createTextChannel } from './tools/create-text-channel';
import { createVoiceChannel } from './tools/create-voice-channel';
import { deleteCategory } from './tools/delete-category';
import { deleteChannel } from './tools/delete-channel';
import { deleteRole } from './tools/delete-role';
import { listChannels } from './tools/list-channels';
import { listRoles } from './tools/list-roles';
import { ping } from './tools/ping';
import { setCategoryPermissions } from './tools/set-category-permissions';
import { setChannelPermissions } from './tools/set-channel-permissions';

const config = parseConfig(process.env);
const discordService = createDiscordClientService(
	config.DISCORD_TOKEN,
	config.GUILD_ID,
);

const server = new McpServer({
	name: 'discord-manager-mcp',
	version: '1.0.0',
});

server.registerTool(ping.name, { description: ping.description }, () =>
	ping.execute(),
);

server.registerTool(
	listChannels.name,
	{ description: listChannels.description },
	() => listChannels.execute(discordService),
);

server.registerTool(
	createTextChannel.name,
	{
		description: createTextChannel.description,
		inputSchema: createTextChannel.schema,
	},
	(args) => createTextChannel.execute(args, discordService),
);

server.registerTool(
	createVoiceChannel.name,
	{
		description: createVoiceChannel.description,
		inputSchema: createVoiceChannel.schema,
	},
	(args) => createVoiceChannel.execute(args, discordService),
);

server.registerTool(
	deleteChannel.name,
	{
		description: deleteChannel.description,
		inputSchema: deleteChannel.schema,
	},
	(args) => deleteChannel.execute(args, discordService),
);

server.registerTool(
	createCategory.name,
	{
		description: createCategory.description,
		inputSchema: createCategory.schema,
	},
	(args) => createCategory.execute(args, discordService),
);

server.registerTool(
	deleteCategory.name,
	{
		description: deleteCategory.description,
		inputSchema: deleteCategory.schema,
	},
	(args) => deleteCategory.execute(args, discordService),
);

server.registerTool(
	listRoles.name,
	{ description: listRoles.description },
	() => listRoles.execute(discordService),
);

server.registerTool(
	createRole.name,
	{
		description: createRole.description,
		inputSchema: createRole.schema,
	},
	(args) => createRole.execute(args, discordService),
);

server.registerTool(
	deleteRole.name,
	{
		description: deleteRole.description,
		inputSchema: deleteRole.schema,
	},
	(args) => deleteRole.execute(args, discordService),
);

server.registerTool(
	assignRole.name,
	{
		description: assignRole.description,
		inputSchema: assignRole.schema,
	},
	(args) => assignRole.execute(args, discordService),
);

server.registerTool(
	setChannelPermissions.name,
	{
		description: setChannelPermissions.description,
		inputSchema: setChannelPermissions.schema,
	},
	(args) => setChannelPermissions.execute(args, discordService),
);

server.registerTool(
	setCategoryPermissions.name,
	{
		description: setCategoryPermissions.description,
		inputSchema: setCategoryPermissions.schema,
	},
	(args) => setCategoryPermissions.execute(args, discordService),
);

async function main() {
	console.error(
		`[startup] Connecting to Discord (GUILD_ID: ${config.GUILD_ID})...`,
	);
	await discordService.connect();
	console.error('[startup] Discord connected and permissions verified.');

	const transport = new StdioServerTransport();
	await server.connect(transport);
}

main().catch((err) => {
	console.error('fatal error:', err);
	process.exit(1);
});
