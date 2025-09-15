# Salt API MCP Server - Simple Installation Guide

## Quick Installation for Claude Code

### Install with npx (Recommended)

1. **Add to Claude Code Configuration**

   Edit your Claude Code configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. **Add this configuration:**

   ```json
   {
     "mcpServers": {
       "salt-api-mcp": {
         "command": "npx",
         "args": ["-y", "salt-api-mcp"],
         "env": {
           "SALT_BEARER_TOKEN": "your_actual_salt_security_bearer_token_here"
         }
       }
     }
   }
   ```

3. **Complete Example Configuration:**

   ```json
   {
     "mcpServers": {
       "salt-api-mcp": {
         "command": "npx",
         "args": ["-y", "salt-api-mcp"],
         "env": {
           "SALT_BEARER_TOKEN": "QTH...qZQ"
         }
       }
     },
     "globalShortcut": "Cmd+Shift+Space"
   }
   ```

4. **Replace the Token**: Replace `your_actual_salt_security_bearer_token_here` with your real Salt Security Bearer token

5. **Restart Claude Code**: Completely quit (⌘+Q) and restart Claude Code

That's it! 🎉

## Alternative: Local Installation

If you prefer to install globally first:

```bash
# Install globally
npm install -g salt-api-mcp

# Then use in Claude Code config:
{
  "mcpServers": {
    "salt-api-mcp": {
      "command": "salt-api-mcp",
      "args": [],
      "env": {
        "SALT_BEARER_TOKEN": "your_actual_salt_security_bearer_token_here"
      }
    }
  }
}
```

## Test the Integration

Once Claude Code is restarted, try these prompts:

- "List the first 5 cloud assets from Salt Security"
- "Show me details for cloud asset ID 68c1a0e899395ba7d4b8fbba"
- "What MCP tools are available?"

## Available Tools

1. **`list_cloud_assets`**: Get paginated list of cloud assets
   - `limit` (optional): 1-1000, default 100
   - `offset` (optional): pagination offset, default 0

2. **`get_cloud_asset`**: Get detailed asset information  
   - `id` (required): asset identifier

## Troubleshooting

### MCP Server Not Loading
- Check Claude Code logs: `~/Library/Logs/Claude/claude.log` (macOS)
- Ensure Node.js is installed: `node --version`
- Test manually: `npx -y salt-api-mcp`

### Token Issues  
- Verify your token works: 
  ```bash
  curl -H "Authorization: Bearer YOUR_TOKEN" \
       -H "Accept: application/json" \
       "https://api.secured-api.com/v1/cloud-connect/cloud-assets?limit=1"
  ```

### Invalid JSON Configuration
- Validate your JSON: Use a JSON validator online
- Ensure proper comma placement and quotes

## Security
- Your token is only stored in Claude Code's configuration
- Communication uses HTTPS with Salt Security's API
- No data is stored locally by the MCP server