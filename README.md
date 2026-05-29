# Discord Manager MCP

A Model Context Protocol (MCP) server that allows AI assistants to manage Discord servers through a standard interface.

## Features

- Manage channels (text, voice) and categories
- Manage roles and permissions
- Single-guild scoped per instance
- 100% TypeScript with full type safety

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

## Available Tools

| Tool | Description |
|------|-------------|
| `ping` | Verifies the server is running |

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

## License

MIT
