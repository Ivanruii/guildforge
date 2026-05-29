# GuildForge

A Model Context Protocol (MCP) server that lets AI assistants manage Discord channels, categories, roles, and permissions via stdio.

## Install

```bash
npx -y @guildforge/mcp
```

Then set your environment variables:

```bash
DISCORD_TOKEN=your_bot_token
GUILD_ID=your_guild_id
```

That's it. No clone, no build, no pnpm.

## Configure your AI client

### opencode

```jsonc
{
    "$schema": "https://opencode.ai/config.json",
    "mcp": {
        "guildforge": {
            "type": "local",
            "command": ["npx", "-y", "@guildforge/mcp"],
            "environment": {
                "DISCORD_TOKEN": "your_bot_token",
                "GUILD_ID": "your_guild_id"
            }
        }
    }
}
```

### Cursor

```json
{
    "mcpServers": {
        "guildforge": {
            "command": "npx",
            "args": ["-y", "@guildforge/mcp"],
            "env": { "DISCORD_TOKEN": "...", "GUILD_ID": "..." }
        }
    }
}
```

### Claude Desktop

```json
{
    "mcpServers": {
        "guildforge": {
            "command": "npx",
            "args": ["-y", "@guildforge/mcp"],
            "env": { "DISCORD_TOKEN": "...", "GUILD_ID": "..." }
        }
    }
}
```

See the [full documentation](/docs/getting-started) for more clients (Copilot, Zed).

## Features

| Category | Tools |
|----------|-------|
| **Channels** | `list_channels`, `create_text_channel`, `create_voice_channel`, `delete_channel` |
| **Categories** | `create_category`, `delete_category` |
| **Roles** | `list_roles`, `create_role`, `delete_role`, `assign_role` |
| **Permissions** | `set_channel_permissions`, `set_category_permissions` |
| **Utility** | `ping` |

Destructive actions (`delete_*`) require `confirm: true`.

## Bot requirements

- `ManageChannels` permission
- `ManageRoles` permission
- `Guilds` and `GuildMembers` intents

## Resources

- [Documentation](https://guildforge.ivan-ruiz.es/) — full setup guide
- [npm package](https://www.npmjs.com/package/@guildforge/mcp)
- [GitHub](https://github.com/Ivanruii/guildforge)