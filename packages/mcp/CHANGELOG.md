# @guildforge/mcp

## 1.1.0

### Minor Changes

- 86fa9f4: Enrich tool responses with metadata and suggestions. `create_text_channel` now returns type, parentId, url and a suggestion for next steps. `assign_role` now returns action, memberDisplayName, roleName and a human-readable summary. `list_roles` now includes color and position for each role.
- 6461728: Add system instructions prompt to the MCP server initialization, providing AI assistants with general rules for managing Discord servers through GuildForge.
- b71f74d: Add `update_channel` and `update_role` tools to allow editing existing channels and roles without deleting and recreating them.
- 292c77c: Add `create_forum_channel` tool to allow AI assistants to create Discord forum channels.
- fe8db4f: Add `list_permission_flags` tool to allow AI assistants to see all valid Discord permission flag names before setting permissions on channels or categories.
- ce93899: Add `get_guild_info` tool to return server metadata (name, member count, icon, owner, boost tier, locale). Remove `ping` tool.

## 1.0.1

### Patch Changes

- d474488: Update README.md getting started instructions.
