# Salt API MCP Server

MCP (Model Context Protocol) server for Salt Security's Cloud Assets API. Enables AI assistants to securely access and analyze cloud asset information.

## Claude Code Integration (Recommended)

### Super Simple Installation with Claude CLI

1. **Install globally from this directory**:
   ```bash
   npm install -g .
   ```

2. **Add to Claude Code with one command**:
   ```bash
   claude mcp add salt-api-mcp --env SALT_BEARER_TOKEN=your_actual_salt_security_bearer_token_here -- salt-api-mcp
   ```

3. **Replace the token** with your real Salt Security Bearer token

That's it! 🎉 You can now ask Claude about your Salt Security cloud assets.

### Alternative: Manual Configuration

If you prefer manual configuration, edit your Claude Code config file and restart Claude Code.

See [INSTALLATION.md](INSTALLATION.md) for detailed manual setup instructions.

## Development Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure authentication**:
   ```bash
   cp .env.example .env
   # Edit .env and set SALT_BEARER_TOKEN=your_token_here
   ```

3. **Build and run**:
   ```bash
   npm run build
   npm start
   ```

## Features

- **List Cloud Assets**: Paginated retrieval with configurable limits (1-1000)
- **Get Asset Details**: Fetch specific cloud asset information by ID
- **Secure Authentication**: Bearer token configuration via environment variables
- **Type Safety**: Full TypeScript implementation with Zod validation
- **Error Handling**: Comprehensive error mapping and user-friendly messages

## MCP Tools

### `list_cloud_assets`
- **Parameters**: `limit` (1-1000, default: 100), `offset` (default: 0)
- **Returns**: Paginated list of company cloud assets

### `get_cloud_asset`  
- **Parameters**: `id` (required asset identifier)
- **Returns**: Detailed cloud asset information

## Configuration

### Required Environment Variables
- `SALT_BEARER_TOKEN`: Bearer token for Salt Security API authentication

### Example `.env`
```bash
SALT_BEARER_TOKEN=your_bearer_token_here
```

## Development

```bash
# Development server with hot reload
npm run dev

# Run tests
npm test

# Test MCP server functionality with CLI arguments
npm run test-mode -- <tool> [options]

# Examples:
npm run test-mode -- list_tools
npm run test-mode -- list_cloud_assets --limit 5 --offset 10
npm run test-mode -- get_cloud_asset --id your-asset-id

# Build for production
npm run build
```

## Documentation

- [Architecture](ai-docs/ARCHITECTURE.md) - System design and components
- [API Reference](ai-docs/API.md) - External APIs and tool interfaces  
- [Development Guide](ai-docs/DEVELOPMENT.md) - Code standards and workflows
- [Testing](ai-docs/TESTING.md) - Test strategy and examples

## Security

- Bearer tokens stored securely in environment variables
- HTTPS-only communication with Salt Security API
- No authentication credentials logged or exposed in errors
- Input validation and sanitization for all requests