import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createDiscordClientService } from './commons/discord-client.service';
import { parseConfig } from './config';
import { ping } from './tools/ping';

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
