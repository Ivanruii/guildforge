# Discord Manager MCP

A Model Context Protocol (MCP) server that allows AI assistants to manage Discord servers through a standard interface.

## Features

- **Channel Management**: List, create, and delete text/voice channels
- **Category Management**: Create and delete channel categories
- **Role Management**: List, create, delete roles, and assign them to users
- **Permission Management**: Set permission overwrites for roles on channels and categories
- **Single-Guild Scoped**: Each instance manages one Discord server
- **100% TypeScript**: Full type safety throughout the codebase
- **Open Source**: Distributed under the MIT license

## Prerequisites

- Node.js >= 24
- A Discord Bot Token with appropriate permissions
- The Guild ID you want to manage

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and fill in your values:

```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_guild_id_here
```

### Discord Bot Setup

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application and add a Bot
3. Enable the following privileged intents:
   - **Guild Members Intent** (required for role assignment)
4. Invite the bot to your server with these OAuth2 scopes:
   - `bot`
   - `applications.commands`
5. Grant the bot these permissions in your server:
   - **Manage Channels**
   - **Manage Roles**

## Usage

### Build

```bash
npm run build
```

### Start

```bash
npm start
```

### Development

```bash
npm run dev
```

### MCP Inspector (for debugging)

```bash
# Windows PowerShell
$env:DISCORD_TOKEN="your_token"
$env:GUILD_ID="your_guild_id"
npm run inspect

# macOS/Linux
export DISCORD_TOKEN="your_token"
export GUILD_ID="your_guild_id"
npm run inspect
```

### Claude Desktop Configuration

Add this to your Claude Desktop config (`%APPDATA%\Claude\claude_desktop_config.json` on Windows, `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "discord-manager": {
      "command": "node",
      "args": ["path/to/discord-manager-mcp/dist/index.mjs"],
      "env": {
        "DISCORD_TOKEN": "your_bot_token",
        "GUILD_ID": "your_guild_id"
      }
    }
  }
}
```

## Available Tools

### Channels

| Tool | Description | Input |
|------|-------------|-------|
| `list_channels` | Lists all channels and categories | — |
| `create_text_channel` | Creates a text channel | `{ name: string, categoryId?: string }` |
| `create_voice_channel` | Creates a voice channel | `{ name: string, categoryId?: string }` |
| `delete_channel` | Deletes a channel | `{ id: string, confirm: true }` |

### Categories

| Tool | Description | Input |
|------|-------------|-------|
| `create_category` | Creates a category | `{ name: string }` |
| `delete_category` | Deletes a category | `{ id: string, confirm: true }` |

### Roles

| Tool | Description | Input |
|------|-------------|-------|
| `list_roles` | Lists all roles | — |
| `create_role` | Creates a role | `{ name: string, color?: string }` |
| `delete_role` | Deletes a role | `{ id: string, confirm: true }` |
| `assign_role` | Assigns/removes a role from a user | `{ userId: string, roleId: string, action: "add" \| "remove" }` |

### Permissions

| Tool | Description | Input |
|------|-------------|-------|
| `set_channel_permissions` | Sets permissions for a role on a channel | `{ channelId: string, roleId: string, allow?: string[], deny?: string[] }` |
| `set_category_permissions` | Sets permissions for a role on a category | `{ categoryId: string, roleId: string, allow?: string[], deny?: string[] }` |

### Utility

| Tool | Description |
|------|-------------|
| `ping` | Verifies the server is running |

### Permission Names

Use these strings when setting permissions:

- `ViewChannel`, `ManageChannels`, `ManageRoles`
- `SendMessages`, `SendMessagesInThreads`, `CreatePublicThreads`, `CreatePrivateThreads`
- `EmbedLinks`, `AttachFiles`, `AddReactions`, `UseExternalEmojis`, `UseExternalStickers`
- `MentionEveryone`, `ManageMessages`, `ManageThreads`, `ReadMessageHistory`
- `Connect`, `Speak`, `Stream`, `UseVAD`, `PrioritySpeaker`, `MuteMembers`, `DeafenMembers`, `MoveMembers`
- `Administrator`, `KickMembers`, `BanMembers`, `ViewAuditLog`
- And more (any key from `PermissionsBitField.Flags`)

## Development

### Linting

```bash
npm run lint
```

### Formatting

```bash
npm run format
```

### Testing

```bash
npm test
npm run test:watch
```

### Type Checking

```bash
npm run typecheck
```

## Architecture

```
LLM (Claude, Cursor, etc.)
    |
    v
MCP Protocol (stdio)
    |
    v
discord-manager-mcp (this server)
    |
    v
discord.js Client
    |
    v
Discord API
```

Each tool follows the Lemoncode/quickmock pattern:
- `index.ts` — Barrel export
- `<tool>.tool.ts` — Metadata (name, description, schema, execute)
- `<tool>.handler.ts` — Business logic
- `<tool>.schema.ts` — Zod validation schema (when input required)
- `<tool>.handler.test.ts` — Colocated unit tests

## Security

- **Single-guild scoped**: Each instance manages exactly one Discord server
- **Explicit confirmation**: Destructive actions (delete) require `confirm: true`
- **Permission validation**: Bot validates it has required permissions on startup
- **Type-safe inputs**: All tool inputs validated with Zod schemas

## Contributing

Contributions are welcome! Please ensure:
- All tests pass (`npm test`)
- Code is formatted (`npm run format`)
- Linting passes (`npm run lint`)
- TypeScript compiles (`npm run typecheck`)

## License

[MIT](LICENSE)
